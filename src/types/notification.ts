export type NotificationType = "course_registration" | "profile_review";
export type NotificationStatus = "unread" | "read";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  status: NotificationStatus;

  title: string;
  message: string;

  createdAt: number;

  // metadata
  studentName?: string;
  courseCode?: string; // A, A1, B, B1, C, C1
  phone?: string;

  reviewResult?: "approved" | "need_more" | "rejected";
};
