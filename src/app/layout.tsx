import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import ScrollTopOnReload from "@/shared/lib/ScrollTopOnReload";
import MobileBottomNav from "@/widgets/MobileBottomNav";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Signal",
  description: "AI 기반 딥페이크 피해 예방·탐지·대응 솔루션",
  openGraph: {
    title: "Signal",
    description: "AI 기반 딥페이크 피해 예방·탐지·대응 솔루션",
    url: "https://signal-web-rho.vercel.app",
    siteName: "Signal",
    locale: "ko_KR",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    title: "Signal",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body className="antialiased">
        <ScrollTopOnReload />
        <Providers>{children}</Providers>
        <MobileBottomNav />
        <Analytics />
      </body>
    </html>
  );
}
