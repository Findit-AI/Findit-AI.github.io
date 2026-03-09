import { describe, expect, it } from 'vitest';
import {
  buildSupportCategoryPath,
  getArticlesByCategory,
  getCategoryCardTargets,
  getSupportCategoryBySlug,
  getLearnResourceTargets,
  getSupportArticleByRoute,
  supportKbCategories,
  supportKbArticles,
} from '../../src/support/kb';

describe('support knowledge base routes', () => {
  it('defines exactly three support categories for the homepage cards', () => {
    const categoryIds = supportKbCategories.map((category) => category.id);
    expect(categoryIds).toEqual(['faq', 'troubleshooting', 'getting-started']);
  });

  it('defines canonical learn entries under getting-started', () => {
    const learnIds = supportKbArticles.filter((entry) => entry.linkedFromLearn).map((entry) => entry.id);

    expect(learnIds).toEqual(['quick-start', 'video-tutorials', 'all-features']);
    expect(
      supportKbArticles
        .filter((entry) => entry.linkedFromLearn)
        .every((entry) => entry.category === 'getting-started'),
    ).toBe(true);
  });

  it('builds localized support paths for learn dropdown links', () => {
    expect(getLearnResourceTargets('en')).toEqual([
      { id: 'quick-start', href: '/support/getting-started/quick-start' },
      { id: 'video-tutorials', href: '/support/getting-started/video-tutorials' },
      { id: 'all-features', href: '/support/getting-started/all-features' },
    ]);

    expect(getLearnResourceTargets('zh')).toEqual([
      { id: 'quick-start', href: '/zh/support/getting-started/quick-start' },
      { id: 'video-tutorials', href: '/zh/support/getting-started/video-tutorials' },
      { id: 'all-features', href: '/zh/support/getting-started/all-features' },
    ]);
  });

  it('builds localized paths for support category cards', () => {
    expect(getCategoryCardTargets('en').map((item) => item.href)).toEqual([
      '/support/faq',
      '/support/troubleshooting',
      '/support/getting-started',
    ]);
    expect(getCategoryCardTargets('zh').map((item) => item.href)).toEqual([
      '/zh/support/faq',
      '/zh/support/troubleshooting',
      '/zh/support/getting-started',
    ]);
  });

  it('resolves article metadata by route pair', () => {
    const entry = getSupportArticleByRoute('getting-started', 'video-tutorials');

    expect(entry?.id).toBe('video-tutorials');
    expect(entry?.titleKey).toBe('nav_resources_video_tutorials');
  });

  it('returns category metadata and category article list for mkdocs-like page', () => {
    const category = getSupportCategoryBySlug('getting-started');
    const articles = getArticlesByCategory('getting-started');

    expect(category?.id).toBe('getting-started');
    expect(articles.map((item) => item.id)).toContain('quick-start');
    expect(articles.map((item) => item.id)).toContain('video-tutorials');
    expect(articles.map((item) => item.id)).toContain('all-features');
  });

  it('builds canonical category path helper', () => {
    expect(buildSupportCategoryPath('faq')).toBe('/support/faq');
  });
});
