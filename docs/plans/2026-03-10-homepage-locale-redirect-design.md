# Homepage Locale Redirect Design

**Date:** 2026-03-10

## Goal

Redirect users who first land on `/` to `/zh` only when their first browser language explicitly indicates Simplified Chinese. Keep English as the default for all other cases.

## Scope

- Apply auto-detection only on the English homepage route `/`.
- Do not auto-redirect other English routes such as `/pricing` or `/support`.
- Keep `/zh` routes unchanged.

## Approach

Use a tiny client-side script on [`src/pages/index.astro`](/Users/david/Documents/Vibe/FinDIT/FinDIT-Studio.github.io/src/pages/index.astro) so the site remains fully static and serverless-friendly. The script will read only the first value from `navigator.languages` or `navigator.language`, normalize it, and redirect to `/zh` only when that first choice explicitly indicates Simplified Chinese such as `zh-CN` or `zh-Hans`.

Traditional Chinese locales such as `zh-TW`, `zh-HK`, and `zh-Hant` must remain on English. If English is first and Chinese appears later in the language list, the homepage must also remain English. Extract the normalization and matching logic into a small runtime helper so it can be unit tested without relying on the browser.

## Tradeoffs

- Pros:
  - Minimal code and minimal deployment complexity.
  - Preserves the existing static Astro architecture.
  - Avoids SEO and cache complexity from server-side negotiation.
- Cons:
  - The redirect happens on the client after the English homepage starts loading.
  - Only the homepage auto-switches; deep English links remain English unless the user chooses Chinese.

## Testing

- Add unit tests for the language matcher.
- Add a page-level test that asserts the homepage emits the redirect script and target.
- Run `npm test` and `npm run build`.
