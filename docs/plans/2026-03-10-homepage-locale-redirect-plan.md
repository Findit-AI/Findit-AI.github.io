# Homepage Locale Redirect Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redirect visitors from `/` to `/zh` only when the first browser language explicitly indicates Simplified Chinese, while leaving English as the default for all other visitors.

**Architecture:** Keep locale negotiation client-side on the homepage only. Put the language-matching rule in a reusable helper under `src/i18n/`, then inject a small inline script into the English homepage that uses that rule.

**Tech Stack:** Astro, TypeScript, Vitest

---

### Task 1: Add locale-matching tests

**Files:**
- Create: `tests/i18n/browser-locale.test.ts`
- Modify: `tests/site/about-page.test.ts` or add a dedicated homepage page test

**Step 1: Write the failing test**

Add tests for:
- `zh-CN` returning `true`
- `zh-Hans` returning `true`
- `zh-TW` returning `false`
- `en-US` returning `false`
- mixed language arrays with `en-US` first and `zh-CN` second returning `false`
- empty or malformed input returning `false`

Add a homepage-level test that asserts the English homepage source contains the locale redirect marker and `/zh` target.

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/i18n/browser-locale.test.ts`
Expected: FAIL because the helper does not exist yet

**Step 3: Write minimal implementation**

Create a helper under `src/i18n/` that reads only the first browser language and answers whether the homepage should redirect to Chinese.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/i18n/browser-locale.test.ts`
Expected: PASS

### Task 2: Inject homepage redirect script

**Files:**
- Modify: `src/pages/index.astro`
- Test: homepage page-level test file

**Step 1: Write the failing test**

Assert the homepage includes:
- a stable marker for the locale redirect script
- a `/zh` redirect target
- guard logic so it only runs on the homepage client-side

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/site/homepage-locale-redirect.test.ts`
Expected: FAIL because the homepage has no redirect script yet

**Step 3: Write minimal implementation**

Inject a small inline script that:
- reads browser language preferences
- redirects to `/zh` when the helper rule matches
- otherwise does nothing

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/site/homepage-locale-redirect.test.ts`
Expected: PASS

### Task 3: Full verification

**Files:**
- No additional source files expected

**Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS

**Step 2: Run a production build**

Run: `npm run build`
Expected: PASS

**Step 3: Commit**

Stage the code, tests, and any required AI log updates, then commit with a focused message.
