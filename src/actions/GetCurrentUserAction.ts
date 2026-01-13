'use server'

import { AuthService } from "@/api/services/AuthService";
import { User } from "@/types/response/user/user";

export const GetCurrentUserAction = async (): Promise<{
    status: number;
    message: string;
    result: User | null;
}> => {
    try {
        const user = await AuthService.getCurrentUser();

        if (user) {
            return {
                status: 200,
                message: "OK",
                result: user
            };
        } else {
            return {
                status: 401,
                message: "Unauthorized",
                result: null
            };
        }
    } catch (error) {
        console.error('GetCurrentUserAction error:', error);
        return {
            status: 500,
            message: "Internal Server Error",
            result: null
        };
    }
};
