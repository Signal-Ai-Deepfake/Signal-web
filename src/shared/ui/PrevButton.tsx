export default function PrevButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-body-2 flex h-11 cursor-pointer items-center justify-center rounded border border-gray-400 text-gray-600"
    >
      이전
    </button>
  );
}
