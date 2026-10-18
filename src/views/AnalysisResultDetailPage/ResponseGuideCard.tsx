import Lightbulb from "@/shared/asset/svg/Lightbulb";

interface ResponseGuideCardProps {
  items: string[];
}

export default function ResponseGuideCard({ items }: ResponseGuideCardProps) {
  return (
    <section className="border-secondary-400/30 bg-secondary-400/20 flex w-full flex-col gap-4 rounded-3xl border p-6">
      <h3 className="text-body-2 text-primary-500 flex items-center gap-2 font-bold">
        <span className="[&>svg]:h-4 [&>svg]:w-3">
          <Lightbulb />
        </span>
        맞춤형 대응 가이드
      </h3>
      <ol className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li key={`${index}-${item}`} className="flex items-start gap-4">
            <span className="bg-primary-500 text-caption flex size-6 shrink-0 items-center justify-center rounded-full font-bold text-white">
              {index + 1}
            </span>
            <p className="text-small text-primary-500 pt-0.5 font-medium break-keep">{item}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
