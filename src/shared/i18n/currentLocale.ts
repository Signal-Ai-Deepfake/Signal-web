import { defaultLocale, htmlLang, locales, type Locale } from "./config";
import type { Messages } from "./defineMessages";

export function currentLocale(): Locale {
  if (typeof document === "undefined") return defaultLocale;
  const lang = document.documentElement.lang;
  return locales.find((locale) => htmlLang[locale] === lang) ?? defaultLocale;
}

export function translate<T>(messages: Messages<T>): T {
  return messages[currentLocale()];
}
