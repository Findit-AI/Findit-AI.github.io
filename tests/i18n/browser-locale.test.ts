import { describe, expect, it } from 'vitest';
import { shouldRedirectBrowserLocaleToChinese, shouldRedirectHomepageToChinese } from '../../src/i18n/browser-locale';

describe('browser locale redirect matching', () => {
  it('matches simplified chinese locale tags', () => {
    expect(shouldRedirectBrowserLocaleToChinese(['zh-CN'])).toBe(true);
  });

  it('matches script-based simplified chinese locale tags', () => {
    expect(shouldRedirectBrowserLocaleToChinese(['zh-Hans'])).toBe(true);
  });

  it('does not match traditional chinese locale tags', () => {
    expect(shouldRedirectBrowserLocaleToChinese(['zh-TW'])).toBe(false);
  });

  it('does not match english locale tags', () => {
    expect(shouldRedirectBrowserLocaleToChinese(['en-US'])).toBe(false);
  });

  it('does not match when english is first and chinese appears later', () => {
    expect(shouldRedirectBrowserLocaleToChinese(['en-US', 'zh-CN'])).toBe(false);
  });

  it('ignores empty and malformed language values', () => {
    expect(shouldRedirectBrowserLocaleToChinese(['', '  ', 'en'])).toBe(false);
  });

  it('does not redirect when the user explicitly prefers english', () => {
    expect(shouldRedirectHomepageToChinese(['zh-CN'], 'en')).toBe(false);
  });

  it('redirects when the user explicitly prefers chinese', () => {
    expect(shouldRedirectHomepageToChinese(['en-US'], 'zh')).toBe(true);
  });
});
