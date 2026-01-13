"use server"

import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from '@/utils/env';
import { redirect } from 'next/navigation';
import { FetchServerPostApiNoToken } from "./FetchServerAction";
import AUTH_API from '@/api/endpoints/auth';
import { setAccessToken, setRefreshToken } from "./TokenStore";
import { GoogleAuthRequest } from '@/types/request/auth/google_auth_request';
import { GoogleAuthResponse } from '@/types/response/auth/google_auth_response';

// Action chuyển hướng để login Google
export const LoginGoogleAction = async (redirectUrl?: string) => {
    if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) {
        throw new Error('Google OAuth configuration is missing. Please check environment variables.');
    }

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}` +
        `&response_type=code` +
        `&scope=openid email profile` +
        `&access_type=offline` +
        `&prompt=consent` +
        `&state=${encodeURIComponent(redirectUrl || "/")}`;

    redirect(googleAuthUrl);
}

// Action xử lý code từ Google callback
export const LoginWithGoogleCode = async (googleAuthRequest: GoogleAuthRequest) => {
    try {
        console.log("googleAuthRequest >>> ", googleAuthRequest)
        const response = await FetchServerPostApiNoToken(AUTH_API.GOOGLE_AUTH, googleAuthRequest);

        if (response && response.status === 200) {
            const data: GoogleAuthResponse = response.result;
            console.log("success >>> ", data)
            
            // Chỉ lưu vào server cookies (httpOnly)
            await setAccessToken(data.token);
            if (data.refreshToken) {
                await setRefreshToken(data.refreshToken);
            }
            
            // Trả về full data cho frontend
            return {
                ...response,
                result: {
                    ...data,
                    // Frontend sẽ cần token để lưu vào client cookies
                    token: data.token,
                    refreshToken: data.refreshToken || null
                }
            };
        }

        return response;
    } catch (error) {
        console.error('Google auth error:', error);
        throw error;
    }
}