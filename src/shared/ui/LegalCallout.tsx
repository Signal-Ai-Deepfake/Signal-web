interface LegalCalloutProps {
  title: string;
  description: string;
  variant?: "primary" | "secondary";
}

const variantClasses = {
  primary: { bg: "bg-primary-50", text: "text-primary-500" },
  secondary: { bg: "bg-secondary-50", text: "text-secondary-500" },
} as const;

export default function LegalCallout({ title, description, variant = "primary" }: LegalCalloutProps) {
  const { bg, text } = variantClasses[variant];

  return (
    <div className={`mt-5 flex w-full flex-col rounded-lg px-5 py-4.5 ${bg}`}>
      <p className={`text-body-2 font-bold ${text}`}>{title}</p>
      <p className="text-caption mt-1 text-gray-700">{description}</p>
    </div>
  );
}
