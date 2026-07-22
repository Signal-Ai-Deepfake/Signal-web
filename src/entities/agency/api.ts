import { api } from "@/shared/api/axios";

export type SituationType = "DEEPFAKE_IMAGE" | "IMAGE_ABUSE" | "CRISIS";

export interface AgencyResponse {
  agencyId: number;
  name: string;
  phone?: string;
  website?: string;
  availableHours?: string;
  supportedActions?: string[];
}

export async function getAgencies(situationType?: SituationType): Promise<AgencyResponse[]> {
  const { data } = await api.get<{ agencies: AgencyResponse[] }>("/api/v1/agencies", {
    params: situationType ? { situationType } : undefined,
  });
  return data.agencies ?? [];
}
