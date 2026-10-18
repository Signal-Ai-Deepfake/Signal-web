interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export default function Switch({
  checked,
  onChange,
  disabled = false,
  className = "",
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        checked ? "bg-primary-500" : "bg-gray-500"
      } ${className}`}
    >
      <span
        className={`absolute top-[3px] size-[18px] rounded-full bg-white shadow-md transition-[left] ${
          checked ? "left-[23px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}
