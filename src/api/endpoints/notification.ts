// src/api/endpoints/notification.ts
import { API_HOST } from "@/utils/env";

const PREFIX = `${API_HOST}/api/v1`;

const NOTIFICATION_API = {
  /** GET /notifications — danh sách thông báo của user hiện tại */
  LIST: () => `${PREFIX}/notifications`,

  /** PATCH /notifications/{id}/mark-as-read */
  MARK_AS_READ: (id: number) =>
    `${PREFIX}/notifications/${encodeURIComponent(String(id))}/mark-as-read`,

  /** DELETE /notifications/{id} */
  DELETE: (id: number) =>
    `${PREFIX}/notifications/${encodeURIComponent(String(id))}`,

  /** POST /notifications/send-to-user */
  SEND_TO_USER: () => `${PREFIX}/notifications/send-to-user`,

  /** POST /notifications/send-to-users */
  SEND_TO_USERS: () => `${PREFIX}/notifications/send-to-users`,

  /** POST /notifications/send-to-all */
  SEND_TO_ALL: () => `${PREFIX}/notifications/send-to-all`,
} as const;

export default NOTIFICATION_API;
