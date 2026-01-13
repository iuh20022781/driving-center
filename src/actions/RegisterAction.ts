'use server'

import AUTH_API from "@/api/endpoints/auth";
import { FetchServerPostApiNoToken } from "./FetchServerAction";
import { setAccessToken, setRefreshToken } from "./TokenStore";
import { RegisterRequest } from "@/types/request/auth/register_request";
import { AuthenticationResponse } from "@/types/response/auth/auth";

export const RegisterServerAction = async (registerRequest: RegisterRequest) => {
    try {
        // post register
        const res = await FetchServerPostApiNoToken(AUTH_API.REGISTER, registerRequest);

        console.log('RegisterServerAction response:', res);

        // thanh cong
        if (res && res.status === 200) {
            const data: AuthenticationResponse = res.result;
            await setAccessToken(data.token);
            await setRefreshToken(data.refreshToken);
        }

        return res;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}
