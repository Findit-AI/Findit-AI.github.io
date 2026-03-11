export const CHINESE_LOCALE_PREFIX = 'zh';
export const LOCALE_PREFERENCE_STORAGE_KEY = 'findit-preferred-locale';
const SIMPLIFIED_CHINESE_LOCALES = new Set(['zh-cn', 'zh-hans']);

export type LocalePreference = 'en' | 'zh';

export function normalizeLocalePreference(value: string | null | undefined): LocalePreference | null {
  if (value === 'en' || value === 'zh') return value;
  return null;
}

export function shouldRedirectBrowserLocaleToChinese(
  languages: readonly string[] | null | undefined
): boolean {
  if (!Array.isArray(languages) || languages.length === 0) return false;

  const firstLanguage = languages.find((value): value is string => typeof value === 'string');
  if (!firstLanguage) return false;

  const normalized = firstLanguage.trim().toLowerCase();
  if (!normalized.startsWith(CHINESE_LOCALE_PREFIX)) return false;

  return SIMPLIFIED_CHINESE_LOCALES.has(normalized);
}

export function shouldRedirectHomepageToChinese(
  languages: readonly string[] | null | undefined,
  preferredLocale: string | null | undefined
): boolean {
  const normalizedPreference = normalizeLocalePreference(preferredLocale);

  if (normalizedPreference === 'en') return false;
  if (normalizedPreference === 'zh') return true;

  return shouldRedirectBrowserLocaleToChinese(languages);
}
