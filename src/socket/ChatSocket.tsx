"use client";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";

interface SocketContextType {
  subscribe: (
    topic: string,
    callback: (msg: IMessage) => void
  ) => StompSubscription | null;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextType>({
  subscribe: () => null,
  disconnect: () => {},
});

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const clientRef = useRef<Client | null>(null);
  const pendingSubs = useRef<
    { topic: string; callback: (msg: IMessage) => void }[]
  >([]);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    const socket = new SockJS("http://localhost:8080/api/v1/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log("[STOMP]", str),
      reconnectDelay: 5000, // tự động reconnect nếu disconnect
    });

    client.onConnect = () => {
      console.log("✅ WebSocket đã kết nối");
      // chạy lại toàn bộ các subscribe đã pending
      pendingSubs.current.forEach(({ topic, callback }) => {
        client.subscribe(topic, callback);
        console.log("📡 Đăng ký lại sau khi kết nối:", topic);
      });
      pendingSubs.current = [];
    };

    client.onStompError = (frame) => {
      console.error("❌ STOMP error:", frame.headers["message"]);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, []);

  const subscribe = (
    topic: string,
    callback: (msg: IMessage) => void
  ): StompSubscription | null => {
    const client = clientRef.current;
    if (client && client.connected) {
      const sub = client.subscribe(topic, callback);
      console.log("✅ Đã đăng ký WebSocket cho:", topic);
      return sub;
    } else {
      console.warn("⚠️ Client chưa kết nối, lưu vào pending:", topic);
      pendingSubs.current.push({ topic, callback });
      return null;
    }
  };

  const disconnect = () => {
    clientRef.current?.deactivate();
    console.log("🛑 WebSocket ngắt kết nối");
  };

  return (
    <SocketContext.Provider value={{ subscribe, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
