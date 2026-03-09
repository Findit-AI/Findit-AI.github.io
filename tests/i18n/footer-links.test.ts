import { describe, expect, it } from 'vitest';
import { dictionaries, requiredKeys } from '../../src/i18n/dictionaries';

describe('footer link dictionary coverage', () => {
  it('keeps About link copy in required key set', () => {
    expect(requiredKeys).toContain('footer_link_about');
  });

  it('provides localized About link text for en and zh', () => {
    expect(typeof dictionaries.en.footer_link_about).toBe('string');
    expect(dictionaries.en.footer_link_about.length).toBeGreaterThan(0);

    expect(typeof dictionaries.zh.footer_link_about).toBe('string');
    expect(dictionaries.zh.footer_link_about.length).toBeGreaterThan(0);
  });
});
