"use client";

import { useT } from "@/shared/i18n/I18nProvider";
import LegalBulletList from "@/shared/ui/LegalBulletList";
import LegalCallout from "@/shared/ui/LegalCallout";
import LegalSection from "@/shared/ui/LegalSection";
import LegalPageLayout from "@/widgets/LegalPageLayout";
import { privacyMessages } from "./messages";

const sectionIds = {
  collectedData: "collected-data",
  purpose: "purpose",
  retention: "retention",
  thirdParty: "third-party",
  outsourcing: "outsourcing",
  rights: "rights",
  security: "security",
  consultationData: "consultation-data",
  contact: "contact",
} as const;

export default function PrivacyPolicyPage() {
  const t = useT(privacyMessages);
  const tocItems = (Object.keys(sectionIds) as (keyof typeof sectionIds)[]).map((key) => ({
    id: sectionIds[key],
    label: t.toc[key],
  }));

  return (
    <LegalPageLayout
      breadcrumbLabel={t.title}
      title={t.title}
      description={t.description}
      tocItems={tocItems}
    >
      <LegalSection id={sectionIds.collectedData} title={t.sections.collectedData} first>
        <p className="text-body-2 text-gray-700">{t.collectedIntro}</p>
        <div className="mt-5 overflow-hidden rounded-[10px] border border-gray-300">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary-50">
                <th className="text-small text-primary-500 w-24 px-3 py-3.5 text-left font-bold md:w-40 md:px-4">
                  {t.tableCategory}
                </th>
                <th className="text-small text-primary-500 px-3 py-3.5 text-left font-bold md:px-4">
                  {t.tableItems}
                </th>
              </tr>
            </thead>
            <tbody>
              {t.collectedRows.map((row, index) => (
                <tr
                  key={row.label}
                  className={index === t.collectedRows.length - 1 ? "" : "border-b border-gray-300"}
                >
                  <th className="text-caption w-24 bg-gray-100 px-3 py-3.5 text-left font-bold break-keep text-black md:w-40 md:px-4">
                    {row.label}
                  </th>
                  <td className="text-caption px-3 py-3.5 break-keep text-black md:px-4">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection id={sectionIds.purpose} title={t.sections.purpose}>
        <LegalBulletList items={t.purposeItems} />
      </LegalSection>

      <LegalSection id={sectionIds.retention} title={t.sections.retention}>
        <p className="text-body-2 text-gray-700">{t.retention}</p>
        <LegalCallout title={t.deletedRecords.title} description={t.deletedRecords.description} />
      </LegalSection>

      <LegalSection id={sectionIds.thirdParty} title={t.sections.thirdParty}>
        <p className="text-body-2 text-gray-700">{t.thirdParty}</p>
      </LegalSection>

      <LegalSection id={sectionIds.outsourcing} title={t.sections.outsourcing}>
        <p className="text-body-2 text-gray-700">{t.outsourcing}</p>
      </LegalSection>

      <LegalSection id={sectionIds.rights} title={t.sections.rights}>
        <p className="text-body-2 text-gray-700">{t.rights}</p>
      </LegalSection>

      <LegalSection id={sectionIds.security} title={t.sections.security}>
        <LegalBulletList items={t.securityItems} />
      </LegalSection>

      <LegalSection id={sectionIds.consultationData} title={t.sections.consultationData}>
        {t.consultationItems.map((item, index) => (
          <div
            key={item.heading}
            className={`flex flex-col gap-1 ${index === 0 ? "mt-2" : "mt-6"}`}
          >
            <h3 className="text-body-2 font-bold text-black">{item.heading}</h3>
            <p className="text-body-2 text-gray-700">{item.description}</p>
          </div>
        ))}
      </LegalSection>

      <LegalSection id={sectionIds.contact} title={t.sections.contact} last>
        <p className="text-body-2 text-gray-700">{t.contact}</p>
      </LegalSection>
    </LegalPageLayout>
  );
}
