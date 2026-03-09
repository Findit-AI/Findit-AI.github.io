# Phase 1 Edge-Case QA Checklist

## i18n Fallback

- Remove one non-required key in `zh` dictionary and confirm optional block is hidden.
- Remove one required key in `zh` and confirm EN fallback is rendered.
- Remove one required key in both `en` and `zh` and confirm production placeholder is `[missing copy]`.
- Run local dev mode and confirm missing required key shows `[i18n-missing:<key>]`.

## Content Validation

- Break a frontmatter required field in one blog/resource file.
- Run `npm run check:content` and confirm strict mode fails.
- Run `npm run check:content:soft` and confirm it passes while recording invalid slugs.
- Confirm `src/generated/content-invalid.json` includes broken slug in the right collection.

## Front-End Degrade Paths

- Confirm invalid slugs are excluded from Blog/Resources listing pages.
- Trigger MDX render failure for a detail page and confirm localized fallback panel is shown.
- Visit a non-existent route and verify localized 404 page content and back-home action.

## Responsive and Navigation

- Verify header/nav readability at 1440px, 1024px, 768px, 390px.
- Verify language switch preserves page base path (`/blog` <-> `/zh/blog`).
- Verify active nav pill matches current section across nested detail pages.

## Regression Commands

- `npm run check:content`
- `npm test`
- `npm run build`
