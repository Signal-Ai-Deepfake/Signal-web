const MONITORING_ID_KEY = "monitoringId";

export function getStoredMonitoringId(): number | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(MONITORING_ID_KEY);
  return value ? Number(value) : null;
}

export function setStoredMonitoringId(monitoringId: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MONITORING_ID_KEY, String(monitoringId));
}
