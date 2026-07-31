export default function GenderOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button type="button" onClick={onSelect} className="flex cursor-pointer items-center gap-3">
      <span
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
          selected ? "border-secondary-500" : "border-gray-400"
        }`}
      >
        <span
          className={`bg-secondary-500 size-2.5 rounded-full transition-transform duration-200 ${
            selected ? "scale-100" : "scale-0"
          }`}
        />
      </span>
      <span className="text-body-2 text-black">{label}</span>
    </button>
  );
}
