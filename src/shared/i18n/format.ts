import { intlLocale, type Locale } from "./config";

export function formatDateLong(value: string, locale: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(intlLocale[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatDateTime(value: string, locale: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(intlLocale[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function formatTime(value: number | string, locale: Locale) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return typeof value === "string" ? value : "";
  return date.toLocaleTimeString(intlLocale[locale], {
    hour: "numeric",
    minute: "2-digit",
  });
}
