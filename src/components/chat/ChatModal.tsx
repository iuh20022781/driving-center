// "use client";

// import { useEffect, useRef, useState } from "react";
// import { X } from "lucide-react";
// import { ConversationService } from "@/api/services/chat/ConversationService";
// import { SendMessageResponse } from "@/types/response/chat/sendMessageResponse";
// import { formatNow } from "@/utils/time";
// import { useSocketContext } from "@/socket/ChatSocket";

// interface ChatModalProps {
//   open: boolean;
//   onClose: () => void;
//   conversationId: string;
// }

// export default function ChatModal({ open, onClose, conversationId }: ChatModalProps) {
//   const [messages, setMessages] = useState<SendMessageResponse[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [nextTime, setNextTime] = useState<string | null>(null);
//   const [input, setInput] = useState("");
//   const [assistantId, setAssistantId] = useState<string | null>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const { subscribe } = useSocketContext();

//   // Load tin nhắn khi mở
//   useEffect(() => {
//     if (open && conversationId) fetchMessages();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open, conversationId]);

//   // Subscribe socket khi mở
//   useEffect(() => {
//     if (!open || !conversationId) return;

//     const topic = `/topic/conversation/${conversationId}`;
//     const sub = subscribe(topic, (msg) => {
//       const body = JSON.parse(msg.body);
//       setMessages((prev) => [...prev, body]);
//     });

//     return () => {
//       if (sub) sub.unsubscribe();
//     };
//   }, [open, conversationId, subscribe]);

//   // Reset khi đóng
//   useEffect(() => {
//     if (!open) {
//       setMessages([]);
//       setNextTime(null);
//       setAssistantId(null);
//       setInput("");
//       setLoading(false);
//     }
//   }, [open]);

//   async function fetchMessages() {
//     setLoading(true);
//     try {
//       const res = await ConversationService.getConversationMessages({
//         conversationId,
//         time: nextTime || formatNow(),
//         limit: 20,
//       });

//       const list: SendMessageResponse[] = res?.result?.chatMessageResponses || [];
//       const sorted = list.sort((a, b) => a.timestamp - b.timestamp);
//       setMessages(sorted);

//       if (res?.result?.assistantId) setAssistantId(res.result.assistantId);
//       updateNextTime(sorted);
//     } catch (err) {
//       console.error("❌ Lỗi khi tải tin nhắn:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   function updateNextTime(list: SendMessageResponse[]) {
//     if (list.length > 0) {
//       const lastMsg = list[list.length - 1];
//       const next = new Date(new Date(lastMsg.createdAt).getTime() + 60 * 1000).toISOString();
//       setNextTime(next);
//     }
//   }

//   async function handleSend() {
//     const text = input.trim();
//     if (!text) return;

//     try {
//       const res = await ConversationService.sendMessage({
//         conversationId,
//         message: text,
//       });

//       const newMsg = res?.result as SendMessageResponse;
//       if (newMsg) setMessages((prev) => [...prev, newMsg]);
//       setInput("");
//     } catch (err) {
//       console.error("❌ Gửi tin nhắn lỗi:", err);
//     }
//   }

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ESC để đóng
//   useEffect(() => {
//     if (!open) return;
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [open, onClose]);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-[1000]">
//       {/* overlay */}
//       <button
//         className="absolute inset-0 bg-black/30"
//         onClick={onClose}
//         aria-label="Đóng chat"
//         type="button"
//       />

//       {/* panel */}
//       <div
//         className="
//           absolute bottom-4 right-4
//           w-[92vw] sm:w-[420px]
//           h-[70vh] sm:h-[520px]
//           bg-white shadow-2xl rounded-2xl
//           flex flex-col overflow-hidden
//         "
//       >
//         {/* Header */}
//         <div className="px-4 py-3 border-b flex justify-between items-center bg-white">
//           <div>
//             <div className="font-semibold">Trò chuyện hỗ trợ</div>
//             <div className="text-xs text-gray-500">Nhắn tin để được tư vấn nhanh</div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-md hover:bg-gray-100 transition"
//             aria-label="Đóng"
//             type="button"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
//           {loading ? (
//             <div className="text-center text-gray-500 mt-5">Đang tải...</div>
//           ) : messages.length === 0 ? (
//             <div className="text-center text-gray-400 mt-10">Chưa có tin nhắn nào</div>
//           ) : (
//             messages
//               .filter((m) => m && m.senderId)
//               .map((msg) => {
//                 const isAssistant = msg.senderId === assistantId;
//                 return (
//                   <div key={msg.messageId} className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
//                     <div
//                       className={[
//                         "px-3 py-2 rounded-2xl max-w-[78%] break-words text-sm",
//                         isAssistant ? "bg-gray-200 text-gray-800" : "bg-blue-600 text-white",
//                       ].join(" ")}
//                     >
//                       {msg.message}
//                     </div>
//                   </div>
//                 );
//               })
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input */}
//         <div className="border-t p-3 flex items-center gap-2 bg-white">
//           <input
//             type="text"
//             placeholder="Nhập tin nhắn..."
//             className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <button
//             onClick={handleSend}
//             className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shrink-0"
//           >
//             Gửi
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
