  // src/types/response/notification/notification.ts

  export interface ApiResponse<T> {
    status?: number;
    message?: string;
    result: T;
    timestamp?: number;
  }

  export interface NotificationDto {
    notificationId: number;      // Integer
    title: string;
    message: string;
    imageUrl: string;
    createdAt: string;            // LocalDateTime -> BE/Jackson trả ISO string
    senderId: string;
    recipientId: string | null;
    viewed: boolean;
  }

  export type ListNotificationResp = ApiResponse<NotificationDto[]>;
  export type OneNotificationResp  = ApiResponse<NotificationDto>;
  export type SimpleMessageResp    = ApiResponse<string>;
