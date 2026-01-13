'use server'

import AUTH_API from "@/api/endpoints/auth";
import { FetchServerPostApiNoToken } from "./FetchServerAction";
import { EmailRegisterRequest } from "@/types/request/auth/email_register_request";

export const EmailRegisterServerAction = async (registerRequest: EmailRegisterRequest) => {
    try {
        // post email register
        const res = await FetchServerPostApiNoToken(AUTH_API.EMAIL_REGISTER, registerRequest);

        console.log('EmailRegisterServerAction response:', res);

        return res;
    } catch (error) {
        console.error('Email register error:', error);
        throw error;
    }
}
