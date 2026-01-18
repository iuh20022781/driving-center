export interface SendMessageResponse {
  messageId: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: number;
  isAssistant: boolean;
  status: "SENT" | "DELIVERED" | "READ";
  createdAt: string;
}
