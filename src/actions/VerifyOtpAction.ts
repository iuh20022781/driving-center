'use server'

import AUTH_API from "@/api/endpoints/auth";
import { FetchServerPostApiNoToken } from "./FetchServerAction";
import { VerifyOtpRequest } from "@/types/request/auth/verify_otp_request";

export const VerifyOtpServerAction = async (verifyRequest: VerifyOtpRequest) => {
    try {
        // post verify OTP
        const res = await FetchServerPostApiNoToken(AUTH_API.VERIFY_OTP, verifyRequest);

        console.log('VerifyOtpServerAction response:', res);

        return res;
    } catch (error) {
        console.error('Verify OTP error:', error);
        throw error;
    }
}

export const ResendOtpServerAction = async (email: string) => {
    try {
        // post resend OTP
        const res = await FetchServerPostApiNoToken(AUTH_API.RESEND_OTP, email);

        console.log('ResendOtpServerAction response:', res);

        return res;
    } catch (error) {
        console.error('Resend OTP error:', error);
        throw error;
    }
}
