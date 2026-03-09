import { createHash } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { Resend } from 'resend';

type WaitlistLanguage = 'en' | 'zh' | 'ja';

const requiredEnvs = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'RESEND_API_KEY',
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  'TURNSTILE_SECRET_KEY',
] as const;

let redis: Redis | null = null;
let ipLimiter: Ratelimit | null = null;
let emailLimiter: Ratelimit | null = null;

function getRedis(): Redis {
  if (!redis) redis = Redis.fromEnv();
  return redis;
}

function getIpLimiter(): Ratelimit {
  if (!ipLimiter) {
    ipLimiter = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(10, '10 m'),
      analytics: true,
      prefix: 'waitlist:ip',
    });
  }
  return ipLimiter;
}

function getEmailLimiter(): Ratelimit {
  if (!emailLimiter) {
    emailLimiter = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(5, '24 h'),
      analytics: true,
      prefix: 'waitlist:email',
    });
  }
  return emailLimiter;
}

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    if (host.endsWith('.vercel.app')) return true;
  } catch {
    return false;
  }

  const allow = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (allow.length === 0) return true;
  return allow.includes(origin);
}

function setCors(res: any, origin?: string): void {
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
}

function sendJson(res: any, status: number, payload: unknown, origin?: string): any {
  setCors(res, origin);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(status).send(JSON.stringify(payload));
}

function getClientIp(req: any): string {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length > 0) return xff.split(',')[0].trim();

  const xrip = req.headers['x-real-ip'];
  if (typeof xrip === 'string' && xrip.length > 0) return xrip.trim();

  return '0.0.0.0';
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function inferLanguage(sourcePath: string): WaitlistLanguage {
  if (sourcePath.startsWith('/zh')) return 'zh';
  if (sourcePath.startsWith('/ja')) return 'ja';
  return 'en';
}

function normalizeLanguage(input: string, sourcePath: string): WaitlistLanguage {
  const lowered = input.trim().toLowerCase();
  if (lowered === 'en' || lowered === 'zh' || lowered === 'ja') return lowered;
  return inferLanguage(sourcePath);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? '';
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex');
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (process.env.BYPASS_TURNSTILE === 'true') return true;

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip,
  });

  const resp = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!resp.ok) return false;
  const data = await resp.json();
  return Boolean(data?.success);
}

function isConflictError(error: any): boolean {
  const status = Number(error?.statusCode ?? error?.status ?? 0);
  if (status === 409) return true;
  const message = String(error?.message ?? '');
  return /already exists|conflict|409/i.test(message);
}

export default async function handler(req: any, res: any): Promise<any> {
  const origin = req.headers.origin as string | undefined;

  if (req.method === 'OPTIONS') {
    if (!isAllowedOrigin(origin)) return res.status(403).end();
    setCors(res, origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { ok: false, error: 'Method not allowed' }, origin);
  }

  if (!isAllowedOrigin(origin)) {
    return sendJson(res, 403, { ok: false, error: 'Origin not allowed' }, origin);
  }

  const missingEnvs = requiredEnvs.filter((key) => !process.env[key]);
  if (missingEnvs.length > 0) {
    return sendJson(res, 500, { ok: false, error: `Missing env: ${missingEnvs.join(', ')}` }, origin);
  }

  let body: any = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body ?? {};
  } catch {
    return sendJson(res, 400, { ok: false, error: 'Invalid JSON body' }, origin);
  }

  const email = normalizeEmail(String(body.email ?? ''));
  const name = String(body.name ?? '').trim();
  const sourcePath = String(body.sourcePath ?? '/');
  const language = normalizeLanguage(String(body.language ?? ''), sourcePath);
  const turnstileToken = String(body.turnstileToken ?? '');
  const honeypot = String(body.website ?? '');
  const ip = getClientIp(req);

  if (honeypot) {
    return sendJson(res, 200, { ok: true, status: 'accepted' }, origin);
  }

  if (!isValidEmail(email)) {
    return sendJson(res, 400, { ok: false, error: 'Invalid email' }, origin);
  }

  const turnstilePass = await verifyTurnstile(turnstileToken, ip);
  if (!turnstilePass) {
    return sendJson(res, 403, { ok: false, error: 'Captcha failed' }, origin);
  }

  const ipResult = await getIpLimiter().limit(ip);
  if (!ipResult.success) {
    const retryAfter = Math.max(1, Math.ceil((ipResult.reset - Date.now()) / 1000));
    res.setHeader('Retry-After', String(retryAfter));
    return sendJson(res, 429, { ok: false, error: 'Rate limit exceeded (ip)' }, origin);
  }

  const emailResult = await getEmailLimiter().limit(email);
  if (!emailResult.success) {
    const retryAfter = Math.max(1, Math.ceil((emailResult.reset - Date.now()) / 1000));
    res.setHeader('Retry-After', String(retryAfter));
    return sendJson(res, 429, { ok: false, error: 'Rate limit exceeded (email)' }, origin);
  }

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const upsertPayload = {
    email,
    email_normalized: email,
    language,
    source_path: sourcePath,
    ip_hash: hashIp(ip),
    resend_sync_status: 'pending',
    last_error: null as string | null,
  };

  const { error: upsertError } = await supabase
    .from('waitlist_signups')
    .upsert(upsertPayload, { onConflict: 'email_normalized' });

  if (upsertError) {
    return sendJson(res, 500, { ok: false, error: 'Database write failed' }, origin);
  }

  const resend = new Resend(process.env.RESEND_API_KEY!);
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  try {
    let contactId: string | null = null;

    try {
      const created: any = await resend.contacts.create({
        email,
        firstName: name || undefined,
        unsubscribed: false,
        audienceId: audienceId || undefined,
        properties: { language },
      } as any);
      contactId = created?.data?.id ?? created?.id ?? null;
    } catch (error: any) {
      if (!isConflictError(error)) throw error;

      const updated: any = await resend.contacts.update({
        email,
        audienceId: audienceId || undefined,
        firstName: name || undefined,
        properties: { language },
      } as any);
      contactId = updated?.data?.id ?? updated?.id ?? null;
    }

    await supabase
      .from('waitlist_signups')
      .update({
        resend_contact_id: contactId,
        resend_sync_status: 'success',
        resend_synced_at: new Date().toISOString(),
        last_error: null,
      })
      .eq('email_normalized', email);

    return sendJson(res, 200, { ok: true, status: 'synced' }, origin);
  } catch (error: any) {
    const message = String(error?.message ?? error ?? 'resend sync failed').slice(0, 1000);

    await supabase
      .from('waitlist_signups')
      .update({
        resend_sync_status: 'error',
        last_error: message,
      })
      .eq('email_normalized', email);

    return sendJson(res, 200, { ok: true, status: 'pending_sync' }, origin);
  }
}
