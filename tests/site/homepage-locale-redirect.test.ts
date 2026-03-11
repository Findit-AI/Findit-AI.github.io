import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const pagePath = path.resolve(process.cwd(), 'src/pages/index.astro');
const pageSource = fs.readFileSync(pagePath, 'utf8');

describe('homepage locale redirect', () => {
  it('injects a chinese browser redirect script on the english homepage', () => {
    expect(pageSource).toContain('data-home-locale-redirect');
    expect(pageSource).toContain('/zh');
    expect(pageSource).toContain('navigator.languages');
    expect(pageSource).toContain('firstLanguage');
    expect(pageSource).toContain("normalizedLanguage === 'zh-cn'");
    expect(pageSource).toContain("normalizedLanguage === 'zh-hans'");
    expect(pageSource).toContain('localStorage.getItem');
    expect(pageSource).toContain("preferredLocale === 'en'");
    expect(pageSource).toContain('window.location.replace');
  });
});
