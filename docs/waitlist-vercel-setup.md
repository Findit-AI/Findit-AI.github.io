# Waitlist Pipeline Setup (Astro + Vercel)

This project uses a serverless API route at `api/waitlist.ts` to process waitlist submissions.

Flow:

1. Browser submits form + Turnstile token to `/api/waitlist`
2. API verifies Turnstile
3. API enforces Upstash Redis rate limits
4. API upserts to Supabase (`waitlist_signups`)
5. API creates/updates Resend contact and writes `properties.language`

## 1) Prerequisites

- Vercel project connected to this repo
- Supabase project ready
- Resend API key + audience ready
- Cloudflare Turnstile widget ready
- Upstash Redis database ready

## 2) Supabase SQL (run once)

Run this in Supabase SQL Editor:

```sql
create extension if not exists pgcrypto;

create table if not exists public.waitlist_signups (
  id bigserial primary key,
  email text not null,
  email_normalized text not null unique,
  language text not null check (language in ('en', 'zh', 'ja')),
  source_path text not null default '/',
  ip_hash text,
  resend_contact_id text,
  resend_sync_status text not null default 'pending'
    check (resend_sync_status in ('pending', 'success', 'error')),
  resend_synced_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_waitlist_updated_at on public.waitlist_signups;
create trigger trg_waitlist_updated_at
before update on public.waitlist_signups
for each row
execute function public.set_updated_at();

alter table public.waitlist_signups enable row level security;
```

## 3) Vercel environment variables

Set all values in **Project Settings -> Environment Variables**:

- `PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID` (optional, but recommended if using audience contacts)
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `ALLOWED_ORIGINS` (example: `https://findit.studio,https://www.findit.studio`)
- `IP_HASH_SALT` (random long string)
- `BYPASS_TURNSTILE` (`false` in production)

## 4) Resend property requirements

In Resend Audience -> Properties:

- create `language` (string, fallback `en` is fine)

## 5) Deploy

Deploy latest commit to Vercel. The API route will be available at:

- `https://<your-domain>/api/waitlist`

## 6) Verification checklist

### A. Happy path (EN)

Submit on `/waitlist` (or `/` -> waitlist):

- Supabase row exists with `language = en`
- `resend_sync_status = success`
- Resend contact has `properties.language = en`

### B. Happy path (ZH)

Submit on `/zh/waitlist`:

- Supabase row has `language = zh`
- Resend contact `properties.language = zh`

### C. Upsert behavior

Submit same email twice from different language pages:

- only one row in Supabase (by `email_normalized`)
- latest language is reflected

### D. Captcha enforcement

Submit request without valid Turnstile token:

- API returns HTTP `403`

### E. Rate limit

Rapid repeated requests:

- API returns HTTP `429`

### F. Resend failure handling

Temporarily set invalid `RESEND_API_KEY` and submit:

- API returns `{ ok: true, status: "pending_sync" }`
- Supabase row shows `resend_sync_status = error` and `last_error` populated

## 7) Security notes

- Never expose server keys in frontend code
- Never use `SUPABASE_SERVICE_ROLE_KEY` outside server code
- If any key has been shared in screenshots/chats, rotate it immediately
