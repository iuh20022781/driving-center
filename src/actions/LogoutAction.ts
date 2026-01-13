// actions/LogoutServerAction.ts
"use server";

import { removeToken, getToken } from "./TokenStore";
import { FetchServerPostApi } from "./FetchServerAction";
import AUTH_API from "@/api/endpoints/auth";
import { LogoutRequest } from "@/types/request/auth/logout_request";


export const LogoutServerAction = async (): Promise<{ status: number; message: string }> => {

    
  try {
    // Lấy refresh token để gửi về server
    const refreshToken = await getToken("refresh_token");

    if (!refreshToken) {
      // Nếu không có refresh_token thì vẫn xoá cookie access_token để đảm bảo logout
      await removeToken("access_token");
      await removeToken("refresh_token");
      return { status: 400, message: "No refresh token found" };
    }

    // Gọi API backend xoá refresh_token
    const req: LogoutRequest = { token: refreshToken };
    const response = await FetchServerPostApi(AUTH_API.LOGOUT, req);

    // Dù thành công hay thất bại, vẫn xoá token trong cookies
    await removeToken("access_token");
    await removeToken("refresh_token");

    if (response && response.status === 200) {
       
      return { status: 200, message: "Logout successful" };
    } else {
      return { status: response?.status || 400, message: response?.message || "Logout failed" };
    }
  } catch (error) {
    console.error("Logout error:", error);
    // Xoá token khi có lỗi bất ngờ
    await removeToken("access_token");
    await removeToken("refresh_token");
    return { status: 500, message: "Logout failed" };
  }
};
