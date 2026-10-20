export type Gender = "male" | "female" | "unspecified";

export interface UserProfile {
  name: string;
  birthDate: string;
  email: string;
  gender: Gender;
}
