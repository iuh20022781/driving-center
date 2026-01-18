import {
  FetchServerGetApi,
  FetchServerPostApi,
} from "@/actions/FetchServerAction";
import API from "@/api/endpoints/api";
import { GetConversationPendingResponse } from "@/types/response/chat/conversastionsPending";
import { GetConversationsResponse } from "@/types/response/chat/conversationResponse";

export class ConversationService {
  // 🟦 Client tạo conversation
  static async createConversation() {
    return await FetchServerPostApi(
      API.CONVERSATIONS.POST_CLIENT_CREATE_CONVERSATION,
      {}
    );
  }

  // 🟦 Lấy danh sách conversation pending (chưa được nhân viên nhận)
  static async getPendingConversations(
    page: number = 0,
    size: number = 10
  ): Promise<GetConversationPendingResponse> {
    try {
      const response = await FetchServerGetApi(
        API.CONVERSATIONS.GET_CONVERSATION_PENDING(page, size)
      );
      return response;
    } catch (error) {
      console.error("Error fetching pending conversations:", error);
      throw error;
    }
  }

  // 🟦 Nhân viên nhận conversation (accept)
  static async getConversationById(conversationId: string) {
    return await FetchServerPostApi(
      API.CONVERSATIONS.POST_RECEIVED_CONVERSATIONS_BY_STAFF(conversationId),
      {}
    );
  }

  // 🟦 Lấy danh sách conversation của nhân viên
  static async getConversationsAdmin(
    page: number = 0,
    size: number = 10
  ): Promise<GetConversationsResponse> {
    try {
      const response = await FetchServerGetApi(
        API.CONVERSATIONS.GET_CONVERSATION(page, size)
      );
      return response;
    } catch (error) {
      console.error("Error fetching pending conversations:", error);
      throw error;
    }
  }

  // 🟦 Lấy nội dung conversation (pagination theo message cũ nhất)
  static async getConversationMessages(payload: {
    conversationId: string;
    time: string; // đổi key đúng với BE: time
    limit: number; // BE có tham số limit
  }) {
    return await FetchServerPostApi(
      API.CONVERSATIONS.POST_GET_CONVERSATION,
      payload
    );
  }

  // 🟦 Client lấy conversation đã tạo trước đó
  static async getClientConversation() {
    return await FetchServerGetApi(API.CONVERSATIONS.GET_CONVERSATIONS_CLIENT);
  }

  // 🟦 Gửi chat message
  static async sendMessage(payload: {
    conversationId: string;
    message: string;
  }) {
    return await FetchServerPostApi(API.CHAT.CHAT_MESSAGES, payload);
  }
}
