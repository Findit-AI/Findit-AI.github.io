import { describe, expect, it } from 'vitest';
import { getSupportArticleContent } from '../../src/support/article-content';
import { supportKbArticles } from '../../src/support/kb';

describe('support article content', () => {
  it('provides bilingual content for every support article route', () => {
    for (const article of supportKbArticles) {
      const en = getSupportArticleContent(article.id, 'en');
      const zh = getSupportArticleContent(article.id, 'zh');

      expect(en, `missing en content: ${article.id}`).not.toBeNull();
      expect(zh, `missing zh content: ${article.id}`).not.toBeNull();

      expect((en?.sections.length ?? 0) > 0).toBe(true);
      expect((zh?.sections.length ?? 0) > 0).toBe(true);
    }
  });
});
