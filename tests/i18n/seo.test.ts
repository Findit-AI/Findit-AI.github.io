import { describe, expect, it } from 'vitest';
import { buildSeoLinks } from '../../src/i18n/seo';

describe('buildSeoLinks', () => {
  it('builds canonical and alternates for english default route', () => {
    const result = buildSeoLinks('https://findit.studio', '/blog', 'en');

    expect(result.canonical).toBe('https://findit.studio/blog');
    expect(result.alternates.en).toBe('https://findit.studio/blog');
    expect(result.alternates.zh).toBe('https://findit.studio/zh/blog');
  });

  it('builds canonical and alternates for localized chinese route', () => {
    const result = buildSeoLinks('https://findit.studio', '/zh/resources', 'zh');

    expect(result.canonical).toBe('https://findit.studio/zh/resources');
    expect(result.alternates.en).toBe('https://findit.studio/resources');
    expect(result.alternates.zh).toBe('https://findit.studio/zh/resources');
  });

  it('normalizes trailing slash for non-root paths', () => {
    const result = buildSeoLinks('https://findit.studio', '/zh/blog/', 'zh');

    expect(result.canonical).toBe('https://findit.studio/zh/blog');
    expect(result.alternates.en).toBe('https://findit.studio/blog');
  });
});
