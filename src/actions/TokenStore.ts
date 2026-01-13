// actions/TokenStore.ts - Server-side only
"use server"

import { cookies } from "next/headers";

// Server-side cookie management
export async function setAccessToken(accessToken: string) {
    const maxAge = 60 * 60 * 24; // 1 ngày
    const cookieStore = cookies();

    cookieStore.set('access_token', accessToken, {
        httpOnly: true,
        // secure: true, // Enable in production
        path: '/',
        maxAge,
    });
}

export async function setRefreshToken(refreshToken: string) {
    const maxAge = 60 * 60 * 24 * 30; // 30 days
    const cookieStore = cookies();

    cookieStore.set('refresh_token', refreshToken, {
        httpOnly: true,
        // secure: true, // Enable in production
        path: '/',
        maxAge,
    });
}

export async function getToken(name: "access_token" | "refresh_token"): Promise<string | undefined> {
    const cookieStore = cookies();
    const cookie = cookieStore.get(name);
    return cookie?.value;
}

export async function removeToken(name: "access_token" | "refresh_token") {
    const cookieStore = cookies();
    cookieStore.delete(name);
}