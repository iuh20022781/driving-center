import { ApiResponseArray } from "../APIResponseType";
import { SendMessageResponse } from "./sendMessageResponse";

export interface ConversationPending {
  conversationId: string;
  userId: string;
  userName?: string;
  assistantId?: string;
  assistantName?: string;
  createdAt: string;
  chatMessageResponses?: SendMessageResponse[];
}

export type GetConversationPendingResponse =
  ApiResponseArray<ConversationPending>;
