# Footer Social Icon Size Design

**Date:** 2026-03-12

## Goal

Make the footer social media icons read larger without changing the surrounding button frame or footer layout.

## Scope

- Increase only the SVG icon size inside `.site-social-link`.
- Keep the button dimensions, border radius, spacing, hover motion, and link targets unchanged.

## Approach

Update [`src/styles/global.css`](/Users/david/Documents/Vibe/FinDIT/FinDIT-Studio.github.io/src/styles/global.css) so `.site-social-link svg` uses a slightly larger size. This preserves the existing footer structure while improving legibility.

## Testing

- Add a CSS regression test that asserts the social icon size rule.
- Run the targeted test, then `npm test`, then `npm run build`.
