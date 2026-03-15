# Home Demo Copy Design

**Date:** 2026-03-14

## Goal

Replace the homepage demo section filler sentence with product-specific copy that reflects FinDIT's real retrieval-to-edit workflow.

## Scope

- Update only the `home_demo_body` dictionary entry in English and Chinese.
- Keep the existing section title, heading, layout, and demo UI unchanged.

## Approach

Use the approved workflow-value phrasing so the demo description explains how FinDIT turns a vague request into usable footage and passes the selected clip into the edit timeline. This keeps the message aligned with the site's existing positioning around local-first retrieval, production workflows, and low-friction handoff.

## Testing

- Verify the updated copy exists in `src/i18n/dictionaries.js` for both locales.
- Run targeted tests if any copy or i18n checks cover the home demo section.
- Run `npm test` and `npm run build` if the change proceeds to implementation.
