// src/api/services/NotificationService.ts

import NOTIFICATION_API from "@/api/endpoints/notification";
import {
  FetchServerDeleteApi,
  FetchServerGetApi,
  FetchServerPostApi,
  FetchServerPatchApi, // <-- dùng PATCH
} from "@/actions/FetchServerAction";
import type {
  NotificationRequest,
  SendNotificationRequest,
  SendNotificationToUserRequest,
} from "@/types/request/notification/notification";
import type {
  ListNotificationResp,
  OneNotificationResp,
  SimpleMessageResp,
} from "@/types/response/notification/notification";

const NotificationService = {
  async list(): Promise<ListNotificationResp> {
    const data = await FetchServerGetApi(NOTIFICATION_API.LIST(), "", false);
    return data as ListNotificationResp;
  },

  async markAsRead(id: number): Promise<SimpleMessageResp> {
    const data = await FetchServerPatchApi(NOTIFICATION_API.MARK_AS_READ(id), {});
    return data as SimpleMessageResp;
  },

  async remove(id: number): Promise<SimpleMessageResp> {
    const data = await FetchServerDeleteApi(NOTIFICATION_API.DELETE(id));
    return data as SimpleMessageResp;
  },

  async sendToUser(payload: SendNotificationToUserRequest): Promise<OneNotificationResp> {
    const data = await FetchServerPostApi(NOTIFICATION_API.SEND_TO_USER(), payload);
    return data as OneNotificationResp;
  },

  async sendToUsers(payload: SendNotificationRequest): Promise<ListNotificationResp> {
    const data = await FetchServerPostApi(NOTIFICATION_API.SEND_TO_USERS(), payload);
    return data as ListNotificationResp;
  },

  async sendToAll(payload: NotificationRequest): Promise<OneNotificationResp> {
    const data = await FetchServerPostApi(NOTIFICATION_API.SEND_TO_ALL(), payload);
    return data as OneNotificationResp;
  },
};

export default NotificationService;
