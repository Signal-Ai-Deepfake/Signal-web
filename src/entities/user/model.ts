export type Gender = "male" | "female" | "unspecified";

export interface UserProfile {
  name: string;
  birthDate: string;
  email: string;
  gender: Gender;
}

export const mockUserProfile: UserProfile = {
  name: "류수연",
  birthDate: "2010/10/28",
  email: "s26070@gsm.hs.kr",
  gender: "female",
};
