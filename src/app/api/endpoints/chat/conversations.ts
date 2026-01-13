import { API_HOST } from "@/utils/env";

const CONVERSATIONS_API = {
  POST_RECEIVED_CONVERSATIONS_BY_STAFF: (conversationId: string) =>
    `${API_HOST}/api/v1/conversations/${conversationId}`,
   POST_CLIENT_CREATE_CONVERSATION: `${API_HOST}/api/v1/conversations/client-create-conversation`,
  POST_GET_CONVERSATION: `${API_HOST}/api/v1/conversations/get-conversation`,
  GET_CONVERSATION: (page: number = 0, size: number = 10) =>
    `${API_HOST}/api/v1/conversations/conversations?page=${page}&size=${size}`,
  GET_CONVERSATIONS_CLIENT: `${API_HOST}/api/v1/conversations/client`,
  GET_CONVERSATION_PENDING: (page: number = 0, size: number = 10) =>
    `${API_HOST}/api/v1/conversations/pending?page=${page}&size=${size}`,
} as const;

export default CONVERSATIONS_API;
