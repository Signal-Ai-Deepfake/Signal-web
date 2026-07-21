interface ChatQuickRepliesProps {
  items: string[];
  onSelect: (label: string) => void;
  disabled?: boolean;
}

export default function ChatQuickReplies({ items, onSelect, disabled }: ChatQuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 px-[22px] pt-3.5 pb-1">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(item)}
          className="text-small cursor-pointer rounded-full border border-primary-100 bg-white px-3.5 py-2 text-primary-500 transition-colors hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
