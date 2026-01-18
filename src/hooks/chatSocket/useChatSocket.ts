"use client";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";

type Message = {
  id: number;
  from: "user" | "bot";
  text: string;
  time: string;
};

export function useChatSocket(conversationId: string, token: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws"); // backend expose
    const client = Stomp.over(socket);

    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        console.log("✅ Connected STOMP");

        // subscribe để nhận tin nhắn
        client.subscribe(
          `/topic/conversations/${conversationId}`,
          (message: { body: string }) => {
            const body = JSON.parse(message.body);
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now(),
                from: body.from === "ADMIN" ? "bot" : "user",
                text: body.message,
                time: new Date().toLocaleTimeString(),
              },
            ]);
          }
        );
      },
      (error: unknown) => console.error("❌ STOMP error:", error)
    );

    stompClient.current = client;
    return () => {
      client.disconnect(() => console.log("🔌 Disconnected"));
    };
  }, [conversationId, token]);

  const sendMessage = (text: string) => {
    if (!stompClient.current || !stompClient.current.connected) return;
    const msg = {
      conversationId,
      message: text,
    };
    stompClient.current.publish({
      destination: "/app/chat", // mapping trong backend @MessageMapping("/chat")
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(msg),
    });
  };

  return { messages, sendMessage };
}
