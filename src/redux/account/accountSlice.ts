/* eslint-disable @typescript-eslint/no-unused-vars */
// redux/account/accountSlice.ts - Updated to fetch real user data
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/response/user/user";
import { LoginRequest } from "@/types/request/auth/login_request";
import { GoogleAuthRequest } from "@/types/request/auth/google_auth_request";
import {
  setUserData,
  clearAuthCookies,
  getUserData,
  isAuthenticated,
  setAccessToken,
  setRefreshToken,
} from "@/utils/cookies";
import { LoginServerAction } from "@/actions/LoginAction";
import { LoginWithGoogleCode } from "@/actions/GoogleAuthAction";
import { LogoutServerAction } from "@/actions/LogoutAction";
import { GetCurrentUserAction } from "@/actions/GetCurrentUserAction";
import { AuthService } from "@/api/services/AuthService";
import ChangePasswordPayload from "@/types/request/auth/changepassword_request";
import ChangePasswordResponse, {
  PASSWORD_ERROR,
} from "@/types/response/auth/changepassword.response";

interface AccountState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
  tempAvatar: string;
  userRole: string | null;
}

// Helper function để lưu authentication data
const saveAuthenticationData = (token: string, refreshToken?: string) => {
  if (typeof window !== "undefined") {
    setAccessToken(token);
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
  }
};

// Async thunk cho login với phone/password
export const loginWithCredentials = createAsyncThunk<
  { user: User; token: string; refreshToken?: string },
  LoginRequest,
  { rejectValue: string }
>("account/loginWithCredentials", async (loginData, { rejectWithValue }) => {
  try {
    // Bước 1: Thực hiện login
    const loginResponse = await LoginServerAction(loginData);

    if (loginResponse && loginResponse.status === 200) {
      const { token, refreshToken } = loginResponse.result;

      // CRITICAL: Kiểm tra token có hợp lệ không
      if (!token) {
        console.error("❌ Backend returned null token for credential login");
        return rejectWithValue(
          "Đăng nhập thất bại: Server không thể xác thực thông tin đăng nhập. Vui lòng kiểm tra lại tài khoản và mật khẩu."
        );
      }

      // Bước 2: Lưu token trước (để có thể gọi API authenticated)
      saveAuthenticationData(token, refreshToken);

      // Bước 3: Lấy thông tin user thực từ API
      const userResponse = await GetCurrentUserAction();

      if (userResponse && userResponse.status === 200 && userResponse.result) {
        return {
          user: userResponse.result,
          token,
          refreshToken,
        };
      } else {
        // Nếu không lấy được user, tạo user data tạm thời
        console.warn("Cannot fetch user data, creating temporary user");
        const tempUser: User = {
          userId: `user-${Date.now()}`,
          userName: loginData.username,
          email: `${loginData.username}@gmail.com`,
          emailVerified: false,
          name: loginData.username,
          userStatus: "ACTIVE" as const,
          role: {
            id: 1,
            name: "USER",
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          addresses: [],
          avatar: function (avatar: any): unknown {
            throw new Error("Function not implemented.");
          }
        };

        return {
          user: tempUser,
          token,
          refreshToken,
        };
      }
    } else {
      return rejectWithValue(
        loginResponse?.message || "Thông tin đăng nhập không hợp lệ"
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return rejectWithValue("Đã xảy ra lỗi kết nối");
  }
});

// Async thunk cho Google login
export const loginWithGoogle = createAsyncThunk<
  { user: User; token: string; refreshToken?: string },
  GoogleAuthRequest,
  { rejectValue: string }
>("account/loginWithGoogle", async (googleData, { rejectWithValue }) => {
  try {
    // Bước 1: Thực hiện Google login
    const loginResponse = await LoginWithGoogleCode(googleData);

    if (loginResponse && loginResponse.status === 200) {
      const { token, refreshToken } = loginResponse.result;

      // CRITICAL: Kiểm tra token có hợp lệ không
      if (!token) {
        console.error("❌ Backend returned null token for Google login");
        return rejectWithValue(
          "Đăng nhập Google thất bại: Server không thể xác thực tài khoản Google của bạn. Vui lòng thử lại hoặc liên hệ hỗ trợ."
        );
      }

      // Bước 2: Lưu token trước
      saveAuthenticationData(token, refreshToken);

      // Bước 3: Lấy thông tin user thực từ API
      const userResponse = await GetCurrentUserAction();

      if (userResponse && userResponse.status === 200 && userResponse.result) {
        return {
          user: userResponse.result,
          token,
          refreshToken,
        };
      } else {
        // Nếu không lấy được user, tạo user data tạm thời cho Google
        console.warn("Cannot fetch Google user data, creating temporary user");
        const tempUser: User = {
          userId: `google-${Date.now()}`,
          userName: "Google User",
          email: "google@example.com",
          emailVerified: true,
          name: "Google User",
          userStatus: "ACTIVE" as const,
          role: {
            id: 1,
            name: "USER",
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          addresses: [],
          avatar: function (avatar: any): unknown {
            throw new Error("Function not implemented.");
          }
        };

        return {
          user: tempUser,
          token,
          refreshToken,
        };
      }
    } else {
      return rejectWithValue(
        loginResponse?.message || "Đăng nhập Google thất bại"
      );
    }
  } catch (error) {
    console.error("Google login error:", error);
    return rejectWithValue("Đã xảy ra lỗi kết nối Google");
  }
});

// Async thunk cho logout
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "account/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await LogoutServerAction();

      if (response.status === 200) {
        return;
      } else {
        return rejectWithValue(response.message || "Đăng xuất thất bại");
      }
    } catch (error) {
      return rejectWithValue("Đã xảy ra lỗi khi đăng xuất");
    }
  }
);

// Async thunk cho lấy thông tin user hiện tại (độc lập)
export const getCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("account/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await GetCurrentUserAction();

    if (response && response.status === 200 && response.result) {
      return response.result;
    } else {
      return rejectWithValue(
        response?.message || "Không thể lấy thông tin người dùng"
      );
    }
  } catch (error) {
    console.error("Get current user error:", error);
    return rejectWithValue("Đã xảy ra lỗi kết nối");
  }
});

// Async thunk đổi mật khẩu
// Async thunk đổi mật khẩu
export const changePassword = createAsyncThunk<
  ChangePasswordResponse,
  ChangePasswordPayload,
  { rejectValue: string }
>("account/changePassword", async (payload, { rejectWithValue }) => {
  try {
    const response = await AuthService.changePassword(payload);

    // ✅ Thành công
    if (response.status === 200) {
      return response;
    }

    // ❌ Lỗi chi tiết từ backend
    if (response.errors?.length) {
      const combinedError = response.errors
        .map((e) => `${e.code}: ${e.message}`)
        .join("\n");
      return rejectWithValue(combinedError);
    }

    // ❌ Lỗi khác
    return rejectWithValue(response.message || "Đổi mật khẩu thất bại");
  } catch (error) {
    console.error("❌ changePassword error:", error);
    const errMsg =
      error instanceof Error ? error.message : "Đã xảy ra lỗi khi đổi mật khẩu";
    return rejectWithValue(errMsg);
  }
});

// Initialize state from cookies if available
const getInitialState = (): AccountState => {
  if (typeof window !== "undefined") {
    const userData = getUserData();
    const authenticated = isAuthenticated();

    return {
      isAuthenticated: authenticated,
      isLoading: false,
      user: userData,
      error: null,
      tempAvatar: "",
      userRole: userData?.role?.name || null,
    };
  }

  return {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: null,
    tempAvatar: "",
    userRole: null,
  };
};

const initialState: AccountState = getInitialState();

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // Sync actions
    clearError: (state) => {
      state.error = null;
    },
    doLogoutAction: (state) => {
      if (typeof window !== "undefined") {
        clearAuthCookies();
      }
      state.isAuthenticated = false;
      state.user = null;
      state.tempAvatar = "";
      state.userRole = null;
      state.error = null;
    },
    doUpdateUserInfoAction: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.userRole = state.user.role?.name || null;
        if (typeof window !== "undefined") {
          setUserData(state.user);
        }
      }
    },
    doUploadAvatarAction: (
      state,
      action: PayloadAction<{ avatar: string }>
    ) => {
      state.tempAvatar = action.payload.avatar;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // Legacy action cho backward compatibility
    doLoginAction: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
      state.userRole = action.payload.role?.name || null;
      state.error = null;
      if (typeof window !== "undefined") {
        setUserData(action.payload);
      }
    },
    updateCartCount: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.countCart = action.payload;
        if (typeof window !== "undefined") {
          setUserData(state.user);
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Login with credentials
    builder
      .addCase(loginWithCredentials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithCredentials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.userRole = action.payload.user.role?.name || null;
        state.error = null;

        // Save to client cookies (tokens đã được lưu trong thunk)
        if (typeof window !== "undefined") {
          setUserData(action.payload.user);
        }
      })
      .addCase(loginWithCredentials.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Đăng nhập thất bại";

        // Clear any partial auth data
        if (typeof window !== "undefined") {
          clearAuthCookies();
        }
      });

    // Login with Google
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.userRole = action.payload.user.role?.name || null;
        state.error = null;

        // Save to client cookies (tokens đã được lưu trong thunk)
        if (typeof window !== "undefined") {
          setUserData(action.payload.user);
        }
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload || "Đăng nhập Google thất bại";

        // Clear any partial auth data
        if (typeof window !== "undefined") {
          clearAuthCookies();
        }
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.tempAvatar = "";
        state.userRole = null;
        state.error = null;

        // Clear cookies
        if (typeof window !== "undefined") {
          clearAuthCookies();
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Đăng xuất thất bại";

        // Even if logout fails on server, clear local state
        state.isAuthenticated = false;
        state.user = null;
        state.tempAvatar = "";
        state.userRole = null;

        if (typeof window !== "undefined") {
          clearAuthCookies();
        }
      });

    // Get current user
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.userRole = action.payload.role?.name || null;
        state.error = null;

        // Save to client cookies
        if (typeof window !== "undefined") {
          setUserData(action.payload);
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.userRole = null;
        state.error = action.payload || "Không thể lấy thông tin người dùng";

        // Clear invalid auth data
        if (typeof window !== "undefined") {
          clearAuthCookies();
        }
      });

    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("✅", action.payload.message);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Đổi mật khẩu thất bại";
        console.error("❌ Lỗi đổi mật khẩu:", state.error);
      });
  },
});

export const {
  clearError,
  doLoginAction,
  doLogoutAction,
  doUpdateUserInfoAction,
  doUploadAvatarAction,
  setLoading,
  updateCartCount,
} = accountSlice.actions;

export default accountSlice.reducer;
