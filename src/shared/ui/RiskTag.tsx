type RiskLevel = "안전" | "위험" | "주의";

const levelStyle: Record<RiskLevel, string> = {
  안전: "bg-green-50 text-green-500",
  위험: "bg-red-50 text-red-500",
  주의: "bg-yellow-50 text-yellow-500",
};

interface RiskTagProps {
  level: RiskLevel;
}

export default function RiskTag({ level }: RiskTagProps) {
  return (
    <div
      className={`text-caption flex h-[25px] w-[45px] items-center justify-center rounded-full font-bold ${levelStyle[level]}`}
    >
      {level}
    </div>
  );
}
