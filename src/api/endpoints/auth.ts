import { API_HOST } from "@/utils/env";

const AUTH_API = {
  LOGIN: `${API_HOST}/api/v1/auth/login`,
  REGISTER: `${API_HOST}/api/v1/phone-authentication/register`,
  LOGOUT: `${API_HOST}/api/v1/user/logout`,
  REFRESH_TOKEN: `${API_HOST}/api/v1/auth/refresh`,
  GOOGLE_AUTH: `${API_HOST}/api/v1/google-auth`,
  MY_ACCOUNT: `${API_HOST}/api/v1/user/my-account`,
  EMAIL_REGISTER: `${API_HOST}/api/v1/email-auth/register-email`,
  VERIFY_OTP: `${API_HOST}/api/v1/email-auth/verify-otp`,
  RESEND_OTP: `${API_HOST}/api/v1/email-auth/resend-otp`,
  CHANGE_PASSWORD: `${API_HOST}/api/v1/user/change-password`,
} as const;

export default AUTH_API;
