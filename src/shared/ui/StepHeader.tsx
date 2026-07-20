interface StepHeaderProps {
  title: string;
  description?: string;
}

export default function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div className="flex w-full flex-col items-center gap-2 text-center">
      <h1 className="text-h3 font-bold text-black">{title}</h1>
      {description && <p className="text-body-2 text-gray-800">{description}</p>}
    </div>
  );
}
