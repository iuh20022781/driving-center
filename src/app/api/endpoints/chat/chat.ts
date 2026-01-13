import { API_HOST } from "@/utils/env";

const CHAT_API = {
  CHAT_MESSAGES: `${API_HOST}/api/v1/chat-messages`,
} as const;

export default CHAT_API;
