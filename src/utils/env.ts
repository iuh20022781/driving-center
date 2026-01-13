// src/utils/env.ts
// import "server-only";

const isServer = typeof window === "undefined";

/** PUBLIC (client dùng được) */
export const API_HOST = process.env.NEXT_PUBLIC_API_HOST!;
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
export const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;

/** SERVER-ONLY (không bundle qua client) */
export const SERVER_ENV = isServer
  ? {
      // Resend
      RESEND_API_KEY: process.env.RESEND_API_KEY?.trim(),
      RESEND_FROM: process.env.RESEND_FROM?.trim(),
      // SMTP
      SMTP_HOST: process.env.SMTP_HOST?.trim(),
      SMTP_PORT: process.env.SMTP_PORT?.trim(),
      SMTP_USER: process.env.SMTP_USER?.trim(),
      SMTP_PASS: process.env.SMTP_PASS?.trim(),
      SMTP_SECURE: process.env.SMTP_SECURE?.trim(),
      // Common
      CONTACT_TO: (process.env.CONTACT_TO || "itdepartment.ames@gmail.com").trim(),
    }
  : undefined;
