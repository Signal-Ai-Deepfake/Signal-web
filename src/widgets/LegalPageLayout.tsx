import type { ReactNode } from "react";
import Link from "next/link";
import Arrow from "@/shared/asset/svg/Arrow";
import Footer from "@/widgets/Footer";
import LegalTableOfContents from "@/widgets/LegalTableOfContents";
import SiteHeader from "@/widgets/SiteHeader";

interface LegalPageLayoutProps {
  breadcrumbLabel: string;
  title: string;
  description: string;
  tocItems: { id: string; label: string }[];
  children: ReactNode;
}

export default function LegalPageLayout({
  breadcrumbLabel,
  title,
  description,
  tocItems,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-col items-center bg-white px-5 py-10 pb-[120px]">
        <div className="flex w-full max-w-[1280px] animate-[fade-in-up_0.5s_ease-out] flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link href="/" className="text-body-1 text-gray-700">
                홈
              </Link>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              <span className="text-body-1 text-primary-500">{breadcrumbLabel}</span>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="text-h1 font-bold text-black">{title}</h1>
              <p className="text-body-1 text-gray-700">{description}</p>
            </div>
          </div>

          <div className="flex items-start gap-8">
            <LegalTableOfContents items={tocItems} />
            <article className="flex min-w-0 flex-1 flex-col">{children}</article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
