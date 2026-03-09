# FinDIT

Local-first video retrieval for real production pipelines.

FinDIT helps creators, assistant editors, and post-production teams find usable footage in seconds instead of scrubbing for hours. The product indexes real media libraries on-device and returns clip-level matches from natural-language intent, transcript lines, and visual references.

## Why This Exists

In most video projects, the slowest step is not editing, it is retrieval.

Large shoots generate hundreds to thousands of clips. Teams still rely on folder memory, manual naming, and repeated previewing to locate one usable moment. As footage volume grows, that manual workflow collapses.

FinDIT is built to close that gap with searchable media content, not just searchable filenames.

## Product Direction

- Search real footage like text.
- Keep core indexing and retrieval local-first.
- Avoid mandatory cloud upload and storage toll for baseline usefulness.
- Support real handoff into editing tools, not synthetic "AI video toy" workflows.
- Build structured retrieval layers that future agent workflows can call reliably.

## Repository Scope

This repository contains the public FinDIT marketing site and waitlist ingestion path.

- Marketing website (EN default + ZH path)
- Blog and support knowledge base
- Pricing and legal pages
- Waitlist form with anti-abuse controls and backend sync pipeline

## Architecture (Website + Waitlist)

### Frontend

- Astro static-first site
- MDX content collections for blog/support content
- Bilingual dictionary-based UI copy (EN/ZH)
- Dark UI system optimized for smooth interactions on desktop/mobile

### Waitlist API Pipeline

User submit -> Vercel API route -> Turnstile verify -> Upstash rate limit -> Supabase upsert -> Resend audience sync

Stored fields include:

- `email` (required)
- `language` (`en`/`zh`, inferred from page locale)

Supabase remains the source of truth. Resend contact properties are synchronized for language-based broadcasts.

## Tech Stack

- Astro + TypeScript
- MDX (`@astrojs/mdx`)
- Vitest
- Vercel Functions
- Supabase
- Resend
- Cloudflare Turnstile
- Upstash Redis

## Security Model

- No service-role secrets in client bundle.
- All privileged operations run server-side in Vercel functions.
- Turnstile challenge required for form submission.
- IP and email based rate limiting at API edge.
- CORS and allowed-origin checks for production domains.

## Local Development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run check:content
npm test
npm run build
```

## Deployment

Primary target: Vercel

- Production domain: `findit.studio`
- Preview deployments: Vercel preview URLs
- Public static output remains compatible with static hosting workflows when API routes are not required.

## Content Standards

- Public copy should reflect real production workflows and measurable value.
- Avoid over-claiming model internals or exposing unnecessary implementation detail.
- Keep EN/ZH messaging aligned in meaning and tone.

## License

All rights reserved by FinDIT.
