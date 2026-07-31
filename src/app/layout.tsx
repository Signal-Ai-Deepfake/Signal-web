import type { Metadata } from "next";
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
