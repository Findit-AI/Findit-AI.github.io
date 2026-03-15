# Home Demo Copy Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the homepage demo filler sentence with product-specific copy in both English and Chinese.

**Architecture:** Keep the change dictionary-only so the Astro component continues reading the same translation key. Update the single `home_demo_body` key in both locales and verify the site still renders through existing tests and production build.

**Tech Stack:** Astro, JavaScript, Vitest

---

### Task 1: Update bilingual home demo copy

**Files:**
- Modify: `src/i18n/dictionaries.js`

**Step 1: Inspect the current dictionary entry**

Confirm that `home_demo_body` exists once in the English dictionary and once in the Chinese dictionary.

**Step 2: Write the minimal implementation**

Replace the English value with `See how FinDIT turns a rough idea into usable footage, then sends the selected clip straight into the edit timeline.`

Replace the Chinese value with `查看 FinDIT 如何把一个模糊需求转成可用素材，并将选中片段直接送入剪辑时间线。`

**Step 3: Verify the edited strings**

Read `src/i18n/dictionaries.js` and confirm both `home_demo_body` entries match the approved copy exactly.

### Task 2: Verify site integrity

**Files:**
- Modify: `src/i18n/dictionaries.js`
- Test: `tests/i18n/translate.test.ts`

**Step 1: Run the relevant automated tests**

Run: `npm test -- tests/i18n/translate.test.ts`
Expected: PASS

**Step 2: Run the full test suite**

Run: `npm test`
Expected: PASS

**Step 3: Run a production build**

Run: `npm run build`
Expected: PASS
