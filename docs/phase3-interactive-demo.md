# Phase 3 Interactive Demo Architecture

## Goal

Provide a modern, full-screen interactive demo stage on Home while preserving static-first performance.

## Implemented Boundary

- Demo shell is rendered as static HTML first.
- Interactive behavior is loaded only when demo enters viewport.
- No React introduced in this phase.
- Motion respects `prefers-reduced-motion`.

## Runtime Flow

1. Home page ships a static `demo-shell` with default scenario.
2. A lightweight bootstrap observer waits for `demo-shell` intersection.
3. On intersection, browser dynamically imports `src/scripts/demo-shell.ts`.
4. Module binds scenario tabs and updates scene summary/path/lines/chips.
5. Auto-rotation runs only when reduced-motion is not requested.

## Why This Meets Phase 3 Criteria

- **Interactive code loads only when needed:** dynamic import at intersection.
- **Performance baseline protected:** no framework island hydration overhead.
- **Accessibility control honored:** reduced motion check disables auto-rotation.

## Follow-up (when App UI refresh is ready)

- Replace placeholder line graph with real UI snapshots or motion sequences.
- Optionally introduce React islands only for state-heavy demos.
- Keep the same lazy-loading boundary to avoid regressions.
