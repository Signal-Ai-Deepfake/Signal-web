import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/shared/config/site";
import { htmlLang, openGraphLocale } from "@/shared/i18n/config";
import { defineMessages } from "@/shared/i18n/defineMessages";
import { I18nProvider } from "@/shared/i18n/I18nProvider";
import { getLocale } from "@/shared/i18n/server";
import ScrollTopOnReload from "@/shared/lib/ScrollTopOnReload";
import MobileBottomNav from "@/widgets/MobileBottomNav";
import Providers from "./providers";
import "./globals.css";

const metaMessages = defineMessages(
  { description: "AI 기반 딥페이크 피해 예방·탐지·대응 솔루션" },
  {
    en: { description: "AI-powered solution to prevent, detect, and respond to deepfake harm" },
    ja: { description: "AIでディープフェイク被害を予防・検出・対応するソリューション" },
    zh: { description: "基于AI的深度伪造伤害预防、检测与应对解决方案" },
  },
);

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { description } = metaMessages[locale];
  return {
    title: "Signal",
    description,
    openGraph: {
      title: "Signal",
      description,
      url: SITE_URL,
      siteName: "Signal",
      locale: openGraphLocale[locale],
      type: "website",
    },
    appleWebApp: {
      capable: true,
      title: "Signal",
      statusBarStyle: "default",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={htmlLang[locale]} data-scroll-behavior="smooth">
      <body className="antialiased">
        <I18nProvider initialLocale={locale}>
          <ScrollTopOnReload />
          <Providers>{children}</Providers>
          <MobileBottomNav />
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
