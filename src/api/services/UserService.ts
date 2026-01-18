import UpdateUserRequest from "@/types/request/user/updateUser_request";
import axiosClient from "../axiosClient";
import API from "../endpoints/api";
export class UserService {
  //  Cập nhật thông tin tài khoản
  async updateUser(payload: UpdateUserRequest): Promise<UpdateUserRequest> {
    try {
      const res = await axiosClient.put(API.USER.UPDATE_MY_ACCOUNT, payload);
      return res.data;
    } catch (err) {
      console.error(`Error updating user:`, err);
      throw err;
    }
  }

  // Cập nhật avatar user

  async updateUserAvatar(imageUrl: string): Promise<{ imageUrl: string }> {
    try {
      const res = await axiosClient.put(API.USER.CHANGE_AVATAR, { imageUrl });
      return res.data;
    } catch (err) {
      console.error("Error updating avatar:", err);
      throw err;
    }
  }
}
