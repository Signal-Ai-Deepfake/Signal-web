interface ChatQuickRepliesProps {
  items: string[];
  onSelect: (label: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function ChatQuickReplies({
  items,
  onSelect,
  disabled,
  className = "",
}: ChatQuickRepliesProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <button
          key={item}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(item)}
          className="text-small max-md:border-primary-50 border-primary-100 text-primary-500 hover:bg-primary-50 cursor-pointer rounded-full border bg-white px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50 max-md:shadow-sm md:px-3.5"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
