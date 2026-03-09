import { localizePath, type Locale } from '../i18n/runtime';

export type SupportCategoryId = 'faq' | 'troubleshooting' | 'getting-started';

export interface SupportKbCategory {
  id: SupportCategoryId;
  titleKey: 'support_kb_card_1_title' | 'support_kb_card_2_title' | 'support_kb_card_3_title';
  summaryKey:
    | 'support_kb_card_1_summary'
    | 'support_kb_card_2_summary'
    | 'support_kb_card_3_summary';
}

export interface SupportKbArticle {
  id: string;
  category: SupportCategoryId;
  slug: string;
  titleKey: string;
  summaryKey: string;
  linkedFromLearn: boolean;
}

export const supportKbCategories: readonly SupportKbCategory[] = [
  {
    id: 'faq',
    titleKey: 'support_kb_card_1_title',
    summaryKey: 'support_kb_card_1_summary',
  },
  {
    id: 'troubleshooting',
    titleKey: 'support_kb_card_2_title',
    summaryKey: 'support_kb_card_2_summary',
  },
  {
    id: 'getting-started',
    titleKey: 'support_kb_card_3_title',
    summaryKey: 'support_kb_card_3_summary',
  },
];

export const supportKbArticles: readonly SupportKbArticle[] = [
  {
    id: 'quick-start',
    category: 'getting-started',
    slug: 'quick-start',
    titleKey: 'nav_resources_quick_start',
    summaryKey: 'support_article_summary_quick_start',
    linkedFromLearn: true,
  },
  {
    id: 'video-tutorials',
    category: 'getting-started',
    slug: 'video-tutorials',
    titleKey: 'nav_resources_video_tutorials',
    summaryKey: 'support_article_summary_video_tutorials',
    linkedFromLearn: true,
  },
  {
    id: 'all-features',
    category: 'getting-started',
    slug: 'all-features',
    titleKey: 'nav_resources_all_features',
    summaryKey: 'support_article_summary_all_features',
    linkedFromLearn: true,
  },
  {
    id: 'what-is-findit',
    category: 'faq',
    slug: 'what-is-findit',
    titleKey: 'support_article_title_what_is_findit',
    summaryKey: 'support_article_summary_what_is_findit',
    linkedFromLearn: false,
  },
  {
    id: 'workspace-model',
    category: 'faq',
    slug: 'workspace-model',
    titleKey: 'support_article_title_workspace_model',
    summaryKey: 'support_article_summary_workspace_model',
    linkedFromLearn: false,
  },
  {
    id: 'permissions-and-roles',
    category: 'faq',
    slug: 'permissions-and-roles',
    titleKey: 'support_article_title_permissions_and_roles',
    summaryKey: 'support_article_summary_permissions_and_roles',
    linkedFromLearn: false,
  },
  {
    id: 'plans-and-billing',
    category: 'faq',
    slug: 'plans-and-billing',
    titleKey: 'support_article_title_plans_and_billing',
    summaryKey: 'support_article_summary_plans_and_billing',
    linkedFromLearn: false,
  },
  {
    id: 'privacy-and-data',
    category: 'faq',
    slug: 'privacy-and-data',
    titleKey: 'support_article_title_privacy_and_data',
    summaryKey: 'support_article_summary_privacy_and_data',
    linkedFromLearn: false,
  },
  {
    id: 'supported-formats',
    category: 'faq',
    slug: 'supported-formats',
    titleKey: 'support_article_title_supported_formats',
    summaryKey: 'support_article_summary_supported_formats',
    linkedFromLearn: false,
  },
  {
    id: 'export-to-editors',
    category: 'faq',
    slug: 'export-to-editors',
    titleKey: 'support_article_title_export_to_editors',
    summaryKey: 'support_article_summary_export_to_editors',
    linkedFromLearn: false,
  },
  {
    id: 'search-no-results',
    category: 'troubleshooting',
    slug: 'search-no-results',
    titleKey: 'support_article_title_search_no_results',
    summaryKey: 'support_article_summary_search_no_results',
    linkedFromLearn: false,
  },
  {
    id: 'sync-lag',
    category: 'troubleshooting',
    slug: 'sync-lag',
    titleKey: 'support_article_title_sync_lag',
    summaryKey: 'support_article_summary_sync_lag',
    linkedFromLearn: false,
  },
  {
    id: 'invite-delivery',
    category: 'troubleshooting',
    slug: 'invite-delivery',
    titleKey: 'support_article_title_invite_delivery',
    summaryKey: 'support_article_summary_invite_delivery',
    linkedFromLearn: false,
  },
];

export function buildSupportCategoryPath(category: SupportCategoryId | string): string {
  return `/support/${category}`;
}

export function buildSupportArticlePath(category: SupportCategoryId | string, slug: string): string {
  return `${buildSupportCategoryPath(category)}/${slug}`;
}

export function getSupportCategoryBySlug(slug: string): SupportKbCategory | undefined {
  return supportKbCategories.find((category) => category.id === slug);
}

export function getArticlesByCategory(category: SupportCategoryId | string): SupportKbArticle[] {
  return supportKbArticles.filter((entry) => entry.category === category);
}

export function getCategoryCardTargets(locale: Locale): Array<{ id: SupportCategoryId; href: string }> {
  return supportKbCategories.map((category) => ({
    id: category.id,
    href: localizePath(locale, buildSupportCategoryPath(category.id)),
  }));
}

export function getLearnResourceTargets(locale: Locale): Array<{ id: SupportKbArticle['id']; href: string }> {
  return supportKbArticles
    .filter((entry) => entry.linkedFromLearn)
    .map((entry) => ({
      id: entry.id,
      href: localizePath(locale, buildSupportArticlePath(entry.category, entry.slug)),
    }));
}

export function getSupportArticleByRoute(category: string, slug: string): SupportKbArticle | undefined {
  return supportKbArticles.find((entry) => entry.category === category && entry.slug === slug);
}
