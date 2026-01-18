import {
  FetchServerGetApi,
  FetchServerPutApi,
} from "@/actions/FetchServerAction";
import AUTH_API from "@/api/endpoints/auth";
import { User } from "@/types/response/user/user";
import ChangePasswordResponse from "@/types/response/auth/changepassword.response";
import ChangePasswordPayload from "@/types/request/auth/changepassword_request";

export class AuthService {
  /**
   * Lấy thông tin người dùng hiện tại
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const response = await FetchServerGetApi(AUTH_API.MY_ACCOUNT, "", false);
      if (response?.status === 200) {
        return response.result as User;
      }
      return null;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }

  static async getCurrentUserRole(): Promise<string | null> {
    const user = await this.getCurrentUser();
    return user?.role?.name || null;
  }

  static async isAdmin(): Promise<boolean> {
    const role = await this.getCurrentUserRole();
    return role === "ADMIN";
  }

  static async isUser(): Promise<boolean> {
    const role = await this.getCurrentUserRole();
    return role === "USER";
  }

  /**
   * Đổi mật khẩu người dùng hiện tại
   * @param payload Thông tin mật khẩu cũ, mới, và xác nhận lại
   * @returns Promise<ChangePasswordResponse>
   */
  static async changePassword(
    payload: ChangePasswordPayload
  ): Promise<ChangePasswordResponse> {
    try {
      const response = await FetchServerPutApi(
        AUTH_API.CHANGE_PASSWORD,
        payload
      );

      const data = response as ChangePasswordResponse;

      if (data.status === 200) {
        return data;
      }

      // Xử lý lỗi chi tiết nếu có
      // if (data.errors && data.errors.length > 0) {
      //   throw new Error(data.errors.map((e: Error) => e.message).join(", "));
      // }

      throw new Error(data.message || "Đổi mật khẩu thất bại");
    } catch (error: unknown) {
      console.error("❌ Error changing password:", error);
      throw error;
    }
  }
}
