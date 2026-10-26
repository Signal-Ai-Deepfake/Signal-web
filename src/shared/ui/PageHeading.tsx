import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import Arrow from "@/shared/asset/svg/Arrow";
import BackButton from "@/shared/ui/BackButton";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeadingProps {
  title: string;
  description?: ReactNode;
  breadcrumbs: Breadcrumb[];
  backHref?: string;
}

export default function PageHeading({
  title,
  description,
  breadcrumbs,
  backHref = "/",
}: PageHeadingProps) {
  return (
    <div className="flex flex-col gap-6">
      <BackButton href={backHref} className="md:hidden" />
      <nav aria-label="현재 위치" className="hidden flex-wrap items-center gap-x-4 gap-y-2 md:flex">
        <Link href="/" className="text-body-1 text-gray-700">
          홈
        </Link>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return (
            <Fragment key={crumb.label}>
              <span className="text-gray-700 [&>svg]:h-[18px] [&>svg]:w-[18px]">
                <Arrow />
              </span>
              {crumb.href && !isLast ? (
                <Link href={crumb.href} className="text-body-1 text-primary-500">
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="text-body-1 text-primary-500"
                >
                  {crumb.label}
                </span>
              )}
            </Fragment>
          );
        })}
      </nav>
      <div className="flex flex-col gap-2 md:gap-6">
        <h1 className="text-h3 md:text-h1 font-bold break-keep text-black">{title}</h1>
        {description && (
          <p className="text-small md:text-body-1 break-keep text-gray-700">{description}</p>
        )}
      </div>
    </div>
  );
}
