import { describe, expect, it } from 'vitest';
import { translate } from '../../src/i18n/translate';

const dictionaries = {
  en: {
    nav_home: 'Home',
    hero_title: 'Welcome to FinDIT',
  },
  zh: {
    nav_home: '首页',
  },
} as const;

describe('translate', () => {
  it('returns active locale text when key exists', () => {
    const result = translate(dictionaries, 'zh', 'nav_home', {
      required: true,
      mode: 'production',
    });

    expect(result).toBe('首页');
  });

  it('falls back to english when active locale key is missing', () => {
    const result = translate(dictionaries, 'zh', 'hero_title', {
      required: true,
      mode: 'production',
    });

    expect(result).toBe('Welcome to FinDIT');
  });

  it('returns production placeholder for required keys missing in all locales', () => {
    const result = translate(dictionaries, 'zh', 'cta_label', {
      required: true,
      mode: 'production',
    });

    expect(result).toBe('[missing copy]');
  });

  it('returns dev placeholder for required keys missing in all locales', () => {
    const result = translate(dictionaries, 'zh', 'cta_label', {
      required: true,
      mode: 'development',
    });

    expect(result).toBe('[i18n-missing:cta_label]');
  });

  it('returns null for optional keys missing in all locales', () => {
    const result = translate(dictionaries, 'zh', 'hero_caption', {
      required: false,
      mode: 'production',
    });

    expect(result).toBeNull();
  });
});
