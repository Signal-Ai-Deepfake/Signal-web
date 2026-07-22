export type RiskLevel = "안전" | "위험" | "주의";

export interface AnalysisResult {
  id: string;
  riskPercent: number;
  level: RiskLevel;
  analyzedAt: string;
}

export const recentAnalysisResults: AnalysisResult[] = [
  { id: "1", riskPercent: 16, level: "안전", analyzedAt: "2026.07.17 21:09" },
  { id: "2", riskPercent: 50, level: "주의", analyzedAt: "2026.07.17 05:17" },
  { id: "3", riskPercent: 87, level: "위험", analyzedAt: "2026.07.16 22:00" },
];
