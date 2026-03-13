import type { Locale } from '../i18n/runtime';

const categoryLabelsMap: Record<Locale, Record<string, string>> = {
  en: {
    announcement: 'Announcement',
    product: 'Product',
    engineering: 'Engineering',
    workflow: 'Workflow',
    changelog: 'Changelog',
  },
  zh: {
    announcement: '公告',
    product: '产品',
    engineering: '工程',
    workflow: '工作流',
    changelog: '更新日志',
  },
};

const defaultCategory: Record<Locale, string> = {
  en: 'Update',
  zh: '动态',
};

const subtitles: Record<Locale, string> = {
  en: 'Field notes, workflow guides, and release context for teams solving retrieval bottlenecks with FinDIT.',
  zh: '围绕"检索瓶颈"这一核心问题，持续记录 FinDIT 的产品更新、工作流实践与发布背景。',
};

export function getCategoryLabels(locale: Locale): Record<string, string> {
  return categoryLabelsMap[locale] ?? categoryLabelsMap.en;
}

export function getDateFormatter(locale: Locale): Intl.DateTimeFormat {
  if (locale === 'zh') {
    return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
}

export function getCategoryName(locale: Locale, category: string | undefined): string {
  if (!category) return defaultCategory[locale] ?? defaultCategory.en;
  const labels = getCategoryLabels(locale);
  if (labels[category]) return labels[category];
  if (locale === 'en') {
    return category.replace(/[-_]/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  }
  return category;
}

export function getBlogSubtitle(locale: Locale): string {
  return subtitles[locale] ?? subtitles.en;
}
