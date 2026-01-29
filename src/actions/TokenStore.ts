// actions/TokenStore.ts - Server-side only
"use server";

import { cookies } from "next/headers";

// =====================
// SET ACCESS TOKEN
// =====================
export async function setAccessToken(accessToken: string) {
  const maxAge = 60 * 60 * 24; // 1 ngày
  const cookieStore = await cookies(); // ✅ FIX

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    // secure: true, // bật khi production (https)
    path: "/",
    maxAge,
  });
}

// =====================
// SET REFRESH TOKEN
// =====================
export async function setRefreshToken(refreshToken: string) {
  const maxAge = 60 * 60 * 24 * 30; // 30 ngày
  const cookieStore = await cookies(); // ✅ FIX

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    // secure: true, // bật khi production (https)
    path: "/",
    maxAge,
  });
}

// =====================
// GET TOKEN
// =====================
export async function getToken(
  name: "access_token" | "refresh_token"
): Promise<string | undefined> {
  const cookieStore = await cookies(); // ✅ FIX
  const cookie = cookieStore.get(name);
  return cookie?.value;
}

// =====================
// REMOVE TOKEN
// =====================
export async function removeToken(
  name: "access_token" | "refresh_token"
) {
  const cookieStore = await cookies(); // ✅ FIX
  cookieStore.delete(name);
}
