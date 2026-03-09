import { localizePath, stripLocalePrefix, type Locale } from './runtime';

export interface SeoLinks {
  canonical: string;
  alternates: Record<'en' | 'zh', string>;
}

function normalizeSite(site: string): string {
  return site.endsWith('/') ? site.slice(0, -1) : site;
}

function normalizePath(pathname: string): string {
  if (!pathname) return '/';
  const withSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (withSlash !== '/' && withSlash.endsWith('/')) return withSlash.slice(0, -1);
  return withSlash;
}

export function buildSeoLinks(site: string, pathname: string, locale: Locale): SeoLinks {
  const siteBase = normalizeSite(site);
  const normalizedPath = normalizePath(pathname);
  const basePath = normalizePath(stripLocalePrefix(normalizedPath));

  const alternates = {
    en: `${siteBase}${localizePath('en', basePath)}`,
    zh: `${siteBase}${localizePath('zh', basePath)}`,
  };

  const canonical = locale === 'zh' ? alternates.zh : alternates.en;

  return {
    canonical,
    alternates,
  };
}
