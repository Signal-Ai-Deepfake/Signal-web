import { cookies, headers } from "next/headers";
import { LOCALE_COOKIE, isLocale, matchAcceptLanguage, type Locale } from "./config";

export async function getLocale(): Promise<Locale> {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(cookieLocale)) return cookieLocale;
  return matchAcceptLanguage((await headers()).get("accept-language"));
}
