// src/utils/toastUtils.ts
import { useToast } from "@/components/ui/toast";

export const useAppToast = () => {
  const { addToast } = useToast();

  /**
   * Hiển thị toast thành công
   */
  const showSuccessToast = (
    title: string,
    description?: string,
    duration = 3000
  ) => {
    addToast({
      title,
      description,
      variant: "success",
      duration,
    });
  };

  /**
   * Hiển thị toast lỗi
   */
  const showErrorToast = (
    title: string,
    description?: string,
    duration = 5000
  ) => {
    addToast({
      title,
      description,
      variant: "destructive",
      duration,
    });
  };

  /**
   * Hiển thị toast thông tin
   */
  const showInfoToast = (
    title: string,
    description?: string,
    duration = 4000
  ) => {
    addToast({
      title,
      description,
      variant: "default",
      duration,
    });
  };

  return {
    showSuccessToast,
    showErrorToast,
    showInfoToast,
  };
};
