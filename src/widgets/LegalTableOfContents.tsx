interface LegalTableOfContentsProps {
  items: { id: string; label: string }[];
}

export default function LegalTableOfContents({ items }: LegalTableOfContentsProps) {
  return (
    <nav className="sticky top-24 flex w-60 shrink-0 flex-col gap-2 rounded-2xl border border-gray-200 p-6">
      <p className="text-body-2 font-bold text-black">목차</p>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-small block rounded-lg px-2 py-2.5 text-gray-700 transition-colors duration-200 ease-out hover:bg-primary-50 hover:text-primary-500"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
