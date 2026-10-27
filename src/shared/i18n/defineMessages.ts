import type { Locale } from "./config";

export type Messages<T> = Record<Locale, T>;

export function defineMessages<T>(
  ko: T,
  translations: Record<Exclude<Locale, "ko">, T>,
): Messages<T> {
  return { ko, ...translations };
}
