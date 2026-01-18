import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  clientId: string;
  staffId?: string;
  status: "PENDING" | "ACCEPTED" | "CLOSED";
}

interface ChatState {
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>; // messages theo conversationId
  activeConversationId?: string;
}

const initialState: ChatState = {
  conversations: [],
  messages: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations(state, action: PayloadAction<Conversation[]>) {
      state.conversations = action.payload;
    },
    setMessages(
      state,
      action: PayloadAction<{ conversationId: string; messages: ChatMessage[] }>
    ) {
      state.messages[action.payload.conversationId] =
        action.payload.messages || [];
    },
    addMessage(state, action: PayloadAction<ChatMessage>) {
      const { conversationId } = action.payload;
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      state.messages[conversationId].push(action.payload);
    },
    setActiveConversation(state, action: PayloadAction<string>) {
      state.activeConversationId = action.payload;
    },
  },
});

export const { setConversations, setMessages, addMessage, setActiveConversation } =
  chatSlice.actions;
export default chatSlice.reducer;
