"use client";

import { useT } from "@/shared/i18n/I18nProvider";
import { legalSummaryMessages } from "./legalSummaryMessages";

export default function LegalSummaryContent({ document }: { document: "terms" | "privacy" }) {
  const articles = useT(legalSummaryMessages)[document];

  return (
    <div className="text-body-2 flex flex-col gap-4 text-gray-700">
      {articles.map((article) => (
        <section key={article.title}>
          <h3 className="mb-1 font-semibold text-black">{article.title}</h3>
          <p>{article.body}</p>
          {article.items && (
            <ul className="list-disc pl-5">
              {article.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
