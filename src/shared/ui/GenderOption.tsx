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
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-gray-400">
        {selected && <span className="bg-secondary-500 size-2.5 rounded-full" />}
      </span>
      <span className="text-body-2 text-black">{label}</span>
    </button>
  );
}
