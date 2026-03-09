# FinDIT Studio Website

Official marketing website for **FinDIT** (`findit.studio`).

This repository hosts a static-first, performance-focused, dark-theme product site with bilingual support and a safe content pipeline.

## Product Goals

- Deliver a premium dark visual style aligned with FinDIT app speed and precision.
- Keep the website lightweight and smooth on mobile and desktop.
- Support EN/ZH now, reserve JA for next phase.
- Prepare for future interactive product demo modules without over-engineering phase 0-2.

## Tech Stack

- **Framework:** [Astro](https://astro.build/) (static-first)
- **Content:** Astro Content Collections + MDX (`@astrojs/mdx`)
- **Language:** TypeScript (strict)
- **Styling:** CSS tokens + global stylesheet + local Fontsource subsets
- **Testing:** Vitest
- **SEO:** canonical/hreflang, Open Graph/Twitter metadata, sitemap integration
- **Content Validation:** custom `scripts/content-health.mjs`
- **Performance Budget:** custom `scripts/perf-budget.mjs`
- **Deployment Targets:** Vercel (primary), GitHub Pages (static compatible)
- **CI/CD:** GitHub Actions (`.github/workflows/ci.yml`, `.github/workflows/deploy-pages.yml`)

## i18n and Routing

- Default locale: **English** (no prefix)
  - `/`
  - `/blog`
  - `/resources`
  - `/support`
- Chinese locale: `/zh/*`
- Japanese namespace reserved: `/ja/*` (content to be added later)

## Error and Boundary Handling

- **Missing i18n key fallback:**
  - lookup order: `active locale -> en -> placeholder/null`
  - required key missing in production: `[missing copy]`
  - required key missing in development: `[i18n-missing:<key>]`
  - optional key missing: hide the block (`null`)
- **Invalid content handling:**
  - `content-health` checks frontmatter and writes `src/generated/content-invalid.json`
  - strict mode blocks builds; soft mode records issues and allows preview builds
  - listing pages exclude invalid slugs
  - detail pages catch render errors and show localized fallback panel

## Project Structure

```text
FinDIT-Studio.github.io/
├── emails/                  # Internal email templates
├── public/
├── scripts/
│   └── content-health.mjs   # i18n/content boundary checker
├── src/
│   ├── content/             # blog/resources MDX content
│   ├── generated/           # generated invalid content index
│   ├── i18n/                # dictionaries + runtime + fallback logic
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── tests/
└── docs/
```

## Commands

- `npm install`
- `npm run dev` (runs soft content check first)
- `npm run check:content` (strict mode)
- `npm run check:content:soft` (preview mode)
- `npm test`
- `npm run build` (strict content check + static build)
- `npm run build:preview` (soft content check + static build)
- `npm run check:perf` (asset-size budget validation after build)

## Current Phase

- Phase 0 complete: foundation scaffold, i18n fallback, content health checks, CI baseline.
- Phase 1 complete: premium dark UI, EN/ZH page structure, responsive nav and sections.
- Phase 2 complete: SEO metadata, sitemap/robots, local font optimization, perf budget tooling.
- Phase 3 complete (baseline): lazy-loaded interactive demo shell on Home with reduced-motion compliance.

## Latest UI Update

- `Resources` in top nav now includes a multilingual dropdown mega menu (EN/ZH synced) with reserved external links.
- `Support` now ships a knowledge-base search scaffold (EN/ZH synced) with searchable placeholder cards and result panel for future content expansion.

## Roadmap

1. Replace demo shell placeholder visuals with real app UI assets after design refresh.
2. Introduce optional stateful islands only if demo complexity requires richer interaction.
3. Add JA content pack and run localization QA.
