/** UI filter state cho trang /account/notifications */
export type FilterTab = "all" | "unread" | "read";
export type FilterType = "all" | "system" | "message" | "warning" | "success";

export interface FilterState {
  tab: FilterTab;
  type: FilterType;
  q: string;
}

/** Body cho POST /notifications/send-to-all */
export interface NotificationRequest {
  title: string;
  message: string;
  imageUrl: string;
}

/** Body cho POST /notifications/send-to-user */
export interface SendNotificationToUserRequest {
  recipientId: string;
  title: string;
  message: string;
  imageUrl: string;
}

/** Body cho POST /notifications/send-to-users */
export interface SendNotificationRequest {
  recipientIds: string[];
  title: string;
  message: string;
  imageUrl: string;
}
