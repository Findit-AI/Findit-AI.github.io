import { dictionaries } from './dictionaries.js';
import { translate } from './translate';

export const SUPPORTED_LOCALES = ['en', 'zh', 'ja'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

function hasPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function resolveLocale(pathname: string): Locale {
  if (hasPrefix(pathname, '/zh')) return 'zh';
  if (hasPrefix(pathname, '/ja')) return 'ja';
  return 'en';
}

export function stripLocalePrefix(pathname: string): string {
  if (hasPrefix(pathname, '/zh')) return pathname.replace(/^\/zh/, '') || '/';
  if (hasPrefix(pathname, '/ja')) return pathname.replace(/^\/ja/, '') || '/';
  return pathname || '/';
}

export function localizePath(locale: Locale, pathname: string): string {
  const clean = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (locale === 'en') return clean;
  if (clean === '/') return `/${locale}`;
  return `/${locale}${clean}`;
}

export function t(locale: Locale, key: string, required = true): string | null {
  return translate(dictionaries, locale, key, {
    required,
    mode: import.meta.env.DEV ? 'development' : 'production',
    onWarn: (message) => console.warn(message),
  });
}
