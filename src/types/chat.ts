export type ChatChannel = "facebook" | "zalo" | "phone" | "other";

export type ChatThread = {
  id: string;
  channel: ChatChannel;
  customerName: string;
  customerPhone: string;
  lastMessage: string;
  lastTime: string;
};

export type ChatMessage = {
  id: string;
  threadId: string;
  from: "admin" | "customer";
  text: string;
  createdAt: number;
};
