import { ApiResponseArray, ApiResponseObject } from "../APIResponseType";
import { SendMessageResponse } from "./sendMessageResponse";

export interface ConversationResponse {
  conversationId: string;
  userId: string;
  userName: string;
  assistantId: string;
  assistantName: string;
  createdAt: string;
  chatMessageResponses?: SendMessageResponse[];
}

export type GetConversationsResponse = ApiResponseArray<ConversationResponse>;
export type GetConversationClientResponse =
  ApiResponseObject<ConversationResponse>;
