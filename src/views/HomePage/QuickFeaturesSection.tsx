"use client";

import Bot from "@/shared/asset/svg/Bot";
import FileText from "@/shared/asset/svg/FileText";
import Message from "@/shared/asset/svg/Message";
import PhotoScan from "@/shared/asset/svg/PhotoScan";
import ScanFace from "@/shared/asset/svg/ScanFace";
import Search from "@/shared/asset/svg/Search";
import ShieldTask from "@/shared/asset/svg/ShieldTask";
import { useT } from "@/shared/i18n/I18nProvider";
import QuickActionLink from "@/shared/ui/QuickActionLink";
import ServiceCategory from "@/shared/ui/ServiceCategory";
import { homeMessages } from "./messages";

function TwoLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines[0]}
      <br />
      {lines[1]}
    </>
  );
}

export default function QuickFeaturesSection() {
  const { quick } = useT(homeMessages);

  return (
    <section className="w-full">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-5">
        <h2 className="text-h3 px-1 font-semibold text-black">{quick.title}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-[342fr_342fr_528fr] xl:gap-8">
          <div>
            <ServiceCategory
              icon={ShieldTask}
              label={quick.prevent.label}
              description={<TwoLines lines={quick.prevent.description} />}
              className="h-full w-full xl:h-[323px]"
            >
              <QuickActionLink
                icon={PhotoScan}
                title={quick.analyze.title}
                description={<TwoLines lines={quick.analyze.description} />}
                href="/analyze"
              />
            </ServiceCategory>
          </div>
          <div>
            <ServiceCategory
              icon={Search}
              label={quick.detect.label}
              description={<TwoLines lines={quick.detect.description} />}
              className="h-full w-full xl:h-[323px]"
            >
              <QuickActionLink
                icon={ScanFace}
                title={quick.detectAction.title}
                description={<TwoLines lines={quick.detectAction.description} />}
                href="/detect"
              />
            </ServiceCategory>
          </div>
          <div className="md:col-span-2 xl:col-span-1">
            <ServiceCategory
              icon={Message}
              label={quick.respond.label}
              description={<TwoLines lines={quick.respond.description} />}
              className="h-full w-full xl:h-[323px]"
            >
              <QuickActionLink
                icon={Bot}
                title={quick.chat.title}
                description={<TwoLines lines={quick.chat.description} />}
                href="/chat"
              />
              <QuickActionLink
                icon={FileText}
                title={quick.report.title}
                description={<TwoLines lines={quick.report.description} />}
                href="/report"
              />
            </ServiceCategory>
          </div>
        </div>
      </div>
    </section>
  );
}
