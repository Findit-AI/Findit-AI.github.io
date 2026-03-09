# Performance Budget and Regression Policy

## Test Conditions

Use these constraints when validating performance:

- Device profile: mid-tier mobile equivalent
- Network: 4G throttled
- Browser mode: fresh profile, no cache
- Locale pages checked: `/`, `/zh`, `/blog`, `/resources`

## Budget Targets

- Lighthouse Performance: >= 92
- Lighthouse Accessibility: >= 95
- Lighthouse SEO: >= 95
- Core Web Vitals (P75 target)
  - LCP < 2.0s
  - CLS < 0.05
  - INP < 200ms

## Build-Time Asset Budget (enforced)

After `npm run build`, run `npm run check:perf`.

- Total JS gzip in `dist/_astro`: <= 140KB
- Total CSS gzip in `dist/_astro`: <= 80KB
- Largest generated HTML file: <= 120KB

## Regression Policy

If a budget fails:

1. Identify changed bundles/pages in the current branch.
2. Remove unused dependencies or defer non-critical code.
3. Re-run `npm run build && npm run check:perf`.
4. Only merge when budgets are green or an approved exception is documented.

## Approved Exceptions

- Temporary exception allowed only for planned large features (for example, full interactive demo rollout).
- Exception must include: reason, measured delta, mitigation plan, expiration date.
