import { api } from "@/shared/api/axios";

export type AuthGender = "MALE" | "FEMALE" | "NONE";
export type VerificationPurpose = "SIGNUP" | "PASSWORD_RESET";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
}

export interface SignupAgreements {
  termsOfService: boolean;
  privacyPolicy: boolean;
}

export interface SignupRequest {
  email: string;
  password: string;
  verificationToken: string;
  name: string;
  age: number;
  gender: AuthGender;
  agreements: SignupAgreements;
}

export interface SendVerificationRequest {
  email: string;
  purpose: VerificationPurpose;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
  purpose: VerificationPurpose;
}

export interface ResetPasswordRequest {
  email: string;
  verificationToken: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface ProfileImageResponse {
  profileImageUrl: string;
}

export async function login(payload: LoginRequest): Promise<TokenResponse> {
  const { data } = await api.post<TokenResponse>("/api/v1/auth/login", payload);
  return data;
}

export async function signup(payload: SignupRequest): Promise<void> {
  await api.post("/api/v1/auth/signup", payload);
}

export async function sendVerification(payload: SendVerificationRequest): Promise<void> {
  await api.post("/api/v1/auth/verification/send", payload);
}

export async function verifyCode(payload: VerifyCodeRequest): Promise<string> {
  const { data } = await api.post<Record<string, string>>(
    "/api/v1/auth/verification/verify",
    payload
  );
  if (!data.verificationToken) {
    throw new Error("인증 확인에 실패했습니다. 다시 시도해 주세요.");
  }
  return data.verificationToken;
}

export async function resetPassword(payload: ResetPasswordRequest): Promise<void> {
  await api.patch("/api/v1/auth/password", payload);
}

export async function uploadProfileImage(file: File): Promise<ProfileImageResponse> {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await api.post<ProfileImageResponse>(
    "/api/v1/users/me/profile-image",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}
