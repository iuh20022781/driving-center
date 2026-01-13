"use server";

import AUTH_API from "@/api/endpoints/auth";
import { FetchServerPostApiNoToken } from "./FetchServerAction";
import { setAccessToken, setRefreshToken } from "./TokenStore";
import { LoginRequest } from "@/types/request/auth/login_request";
import { AuthenticationResponse } from "@/types/response/auth/auth";

export const LoginServerAction = async (loginRequest: LoginRequest) => {
  try {
    // post login
    const res = await FetchServerPostApiNoToken(AUTH_API.LOGIN, loginRequest);

    // thanh cong
    if (res && res.status === 200) {
      const data: AuthenticationResponse = res.result;

      // Chỉ lưu vào server cookies (httpOnly)
      await setAccessToken(data.token);
      await setRefreshToken(data.refreshToken);

      // Trả về full data cho frontend
      return {
        ...res,
        result: {
          ...data,
          // Frontend sẽ cần token để lưu vào client cookies
          token: data.token,
          refreshToken: data.refreshToken,
        },
      };
    }

    return res;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
