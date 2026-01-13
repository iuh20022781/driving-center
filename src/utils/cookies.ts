/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/cookies.ts - Client-side only
"use client";

// WARNING: This file should NEVER be imported in server actions!
// Only use in client components or hooks

const setCookie = (name: string, value: string, days: number = 7) => {
    if (typeof document === 'undefined') {
        console.warn('setCookie called on server-side');
        return;
    }

    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));

    const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    document.cookie = cookieString;
    
    console.log(`Client cookie set: ${name}`);
};

const getCookie = (name: string): string | undefined => {
    if (typeof document === 'undefined') return undefined;

    const nameEQ = name + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return undefined;
};

const deleteCookie = (name: string) => {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Client cookie keys - different from server cookies
export const CLIENT_COOKIE_KEYS = {
    ACCESS_TOKEN: 'client_access_token',
    REFRESH_TOKEN: 'client_refresh_token', 
    USER_DATA: 'user_data',
} as const;

// Client-side token management
export const setAccessToken = (token: string) => {
    setCookie(CLIENT_COOKIE_KEYS.ACCESS_TOKEN, token, 1); // 1 day
};

export const getAccessToken = (): string | undefined => {
    return getCookie(CLIENT_COOKIE_KEYS.ACCESS_TOKEN);
};

export const setRefreshToken = (token: string) => {
    setCookie(CLIENT_COOKIE_KEYS.REFRESH_TOKEN, token, 30); // 30 days
};

export const getRefreshToken = (): string | undefined => {
    return getCookie(CLIENT_COOKIE_KEYS.REFRESH_TOKEN);
};

// User data management
export const setUserData = (userData: any) => {
    setCookie(CLIENT_COOKIE_KEYS.USER_DATA, JSON.stringify(userData), 7);
};

export const getUserData = (): any | null => {
    const userData = getCookie(CLIENT_COOKIE_KEYS.USER_DATA);
    if (userData) {
        try {
            return JSON.parse(userData);
        } catch (error) {
            console.error('Error parsing user data from cookie:', error);
            return null;
        }
    }
    return null;
};

// Clear all client auth cookies
export const clearAuthCookies = () => {
    deleteCookie(CLIENT_COOKIE_KEYS.ACCESS_TOKEN);
    deleteCookie(CLIENT_COOKIE_KEYS.REFRESH_TOKEN);
    deleteCookie(CLIENT_COOKIE_KEYS.USER_DATA);
};

// Check if user is authenticated (client-side only)
export const isAuthenticated = (): boolean => {
    const token = getAccessToken();
    const userData = getUserData();
    
    return !!token && !!userData;
};

// Debug function
// export const debugCookies = () => {
//     if (typeof document === 'undefined') {
//         console.log('Cannot debug cookies on server-side');
//         return;
//     }
    
//     console.log('=== Client Cookie Debug ===');
//     console.log('All cookies:', document.cookie);
//     console.log('Access token:', getAccessToken());
//     console.log('Refresh token:', getRefreshToken());
//     console.log('User data:', getUserData());
//     console.log('Is authenticated:', isAuthenticated());
//     console.log('==========================');
// };