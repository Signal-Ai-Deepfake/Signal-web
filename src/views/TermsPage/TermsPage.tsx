"use client";

import { useT } from "@/shared/i18n/I18nProvider";
import LegalBulletList from "@/shared/ui/LegalBulletList";
import LegalCallout from "@/shared/ui/LegalCallout";
import LegalSection from "@/shared/ui/LegalSection";
import LegalPageLayout from "@/widgets/LegalPageLayout";
import { termsMessages } from "./messages";

const sectionIds = [
  "purpose",
  "effect",
  "account",
  "service",
  "obligation",
  "limitation",
  "records",
  "restriction",
  "liability",
] as const;

export default function TermsPage() {
  const t = useT(termsMessages);
  const tocItems = sectionIds.map((id) => ({ id, label: t.toc[id] }));

  return (
    <LegalPageLayout
      breadcrumbLabel={t.title}
      title={t.title}
      description={t.description}
      tocItems={tocItems}
    >
      <LegalSection id="purpose" title={t.sections.purpose} first>
        <p className="text-body-2 text-gray-700">{t.purpose}</p>
        <LegalBulletList
          items={t.definitions.map(({ term, definition }) => (
            <>
              <span className="font-bold">{term}</span>: {definition}
            </>
          ))}
        />
      </LegalSection>

      <LegalSection id="effect" title={t.sections.effect}>
        <p className="text-body-2 text-gray-700">{t.effect}</p>
      </LegalSection>

      <LegalSection id="account" title={t.sections.account}>
        <p className="text-body-2 text-gray-700">{t.account}</p>
        <LegalCallout title={t.anonymousChat.title} description={t.anonymousChat.description} />
      </LegalSection>

      <LegalSection id="service" title={t.sections.service}>
        <LegalBulletList items={t.serviceItems} />
        <p className="text-body-2 mt-4 text-gray-700">{t.serviceNote}</p>
      </LegalSection>

      <LegalSection id="obligation" title={t.sections.obligation}>
        <p className="text-body-2 text-gray-700">{t.obligation}</p>
        <LegalBulletList items={t.obligationItems} />
      </LegalSection>

      <LegalSection id="limitation" title={t.sections.limitation}>
        <p className="text-body-2 text-gray-700">{t.limitation}</p>
        <LegalCallout
          variant="secondary"
          title={t.important.title}
          description={t.important.description}
        />
      </LegalSection>

      <LegalSection id="records" title={t.sections.records}>
        <p className="text-body-2 text-gray-700">{t.records}</p>
      </LegalSection>

      <LegalSection id="restriction" title={t.sections.restriction}>
        <p className="text-body-2 text-gray-700">{t.restriction}</p>
      </LegalSection>

      <LegalSection id="liability" title={t.sections.liability} last>
        <p className="text-body-2 text-gray-700">{t.liability}</p>
      </LegalSection>
    </LegalPageLayout>
  );
}
