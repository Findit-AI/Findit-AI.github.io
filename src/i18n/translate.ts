export type I18nMode = 'development' | 'production';

export type DictionaryMap = Record<string, Record<string, string>>;

export interface TranslateOptions {
  required: boolean;
  mode: I18nMode;
  onWarn?: (message: string) => void;
}

function readValue(dict: Record<string, string> | undefined, key: string): string | null {
  if (!dict) return null;
  const value = dict[key];
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? value : null;
}

export function translate(
  dictionaries: DictionaryMap,
  locale: string,
  key: string,
  options: TranslateOptions,
): string | null {
  const warn = options.onWarn ?? (() => {});

  const localeValue = readValue(dictionaries[locale], key);
  if (localeValue) return localeValue;

  const fallbackValue = readValue(dictionaries.en, key);
  if (fallbackValue) {
    warn(`[i18n] Missing key "${key}" in locale "${locale}". Falling back to "en".`);
    return fallbackValue;
  }

  if (!options.required) {
    warn(`[i18n] Optional key "${key}" missing in locale "${locale}" and "en". Block hidden.`);
    return null;
  }

  const placeholder =
    options.mode === 'development' ? `[i18n-missing:${key}]` : '[missing copy]';
  warn(`[i18n] Required key "${key}" missing in locale "${locale}" and "en".`);
  return placeholder;
}
