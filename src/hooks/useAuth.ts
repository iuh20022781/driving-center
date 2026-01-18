// hooks/useAuth.ts
"use client";

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    loginWithCredentials,
    loginWithGoogle,
    logoutUser,
    getCurrentUser,
    doLoginAction,
    doLogoutAction,
    clearError,
    setLoading
} from '@/redux/account/accountSlice';
import { User } from '@/types/response/user/user';
import { LoginRequest } from '@/types/request/auth/login_request';
import { GoogleAuthRequest } from '@/types/request/auth/google_auth_request';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading, user, error, userRole } = useAppSelector((state) => state.account);

    // Login với credentials (phone/password)
    const loginWithPhone = async (credentials: LoginRequest) => {
        try {
            const result = await dispatch(loginWithCredentials(credentials));
            if (loginWithCredentials.fulfilled.match(result)) {
                return { success: true, user: result.payload };
            } else {
                return { success: false, error: result.payload };
            }
        } catch {
            return { success: false, error: 'Đã xảy ra lỗi không xác định' };
        }
    };

    // Login với Google
    const loginWithGoogleCode = async (googleData: GoogleAuthRequest) => {
        try {
            const result = await dispatch(loginWithGoogle(googleData));
            if (loginWithGoogle.fulfilled.match(result)) {
                return { success: true, user: result.payload };
            } else {
                return { success: false, error: result.payload };
            }
        } catch {
            return { success: false, error: 'Đã xảy ra lỗi không xác định' };
        }
    };

    // Legacy method để tương thích với code cũ
    const login = (userData: User) => {
        console.log("useAuth - legacy login called with:", userData);
        dispatch(doLoginAction(userData));
    };

    const logout = () => {
        dispatch(doLogoutAction());
    };

    const setAuthLoading = (loading: boolean) => {
        dispatch(setLoading(loading));
    };

    const clearAuthError = () => {
        dispatch(clearError());
    };

    // Lấy thông tin user hiện tại từ server
    const fetchCurrentUser = async () => {
        try {
            const result = await dispatch(getCurrentUser());
            if (getCurrentUser.fulfilled.match(result)) {
                return { success: true, user: result.payload };
            } else {
                return { success: false, error: result.payload };
            }
        } catch {
            return { success: false, error: 'Đã xảy ra lỗi không xác định' };
        }
    };

    // Logout với server
    const logoutWithServer = async () => {
        try {
            const result = await dispatch(logoutUser());
            if (logoutUser.fulfilled.match(result)) {
                return { success: true };
            } else {
                return { success: false, error: result.payload };
            }
        } catch {
            return { success: false, error: 'Đã xảy ra lỗi không xác định' };
        }
    };

    // Kiểm tra role
    const isUser = () => userRole === 'USER';
    const hasRole = (role: string) => userRole === role;

    return {
        // State
        isAuthenticated,
        isLoading,
        user,
        userRole,
        error,

        // Actions
        loginWithPhone,        // New async method
        loginWithGoogleCode,   // New async method
        login,                 // Legacy method
        logout,                // Legacy logout
        logoutWithServer,      // New async logout
        fetchCurrentUser,      // New method to fetch current user
        setAuthLoading,
        clearAuthError,

        // Role checking
        isUser,
        hasRole
    };
};