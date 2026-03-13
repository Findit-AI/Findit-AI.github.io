# Footer Social Icon Size Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Slightly enlarge footer social media icons without changing button frame sizing or layout.

**Architecture:** Keep the change CSS-only. Lock the intended icon size with a regression test that reads the footer styles from `src/styles/global.css`.

**Tech Stack:** Astro, CSS, Vitest

---

### Task 1: Add a failing CSS regression test

**Files:**
- Create: `tests/site/footer-social-icon-size.test.ts`
- Test: `tests/site/footer-social-icon-size.test.ts`

**Step 1: Write the failing test**

Assert that `.site-social-link svg` in `src/styles/global.css` uses `width: 20px` and `height: 20px`.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/site/footer-social-icon-size.test.ts`
Expected: FAIL because the current CSS uses `16px`.

**Step 3: Write minimal implementation**

Update the footer social icon SVG size rule in `src/styles/global.css` from `16px` to `20px`.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/site/footer-social-icon-size.test.ts`
Expected: PASS

### Task 2: Full verification

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS

**Step 2: Run a production build**

Run: `npm run build`
Expected: PASS
