// "use client";

// import { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import { Facebook, MessageCircle, X } from "lucide-react";
// import { useSelector } from "react-redux";
// import type { RootState } from "@/redux/store";

// import ChatModal from "./ChatModal";
// import { ConversationService } from "@/api/services/chat/ConversationService";
// import { useAppToast } from "@/utils/toast";

// const FACEBOOK_PAGE = "your.page.username"; // đổi thành page của bạn
// const ZALO_LINK = "https://zalo.me/0987654321"; // đổi thành link zalo của bạn

// export default function FloatingHelp() {
//   const [mounted, setMounted] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [chatOpen, setChatOpen] = useState(false);
//   const [conversationId, setConversationId] = useState<string | null>(null);

//   const { showErrorToast, showInfoToast } = useAppToast();
//   const currentUser = useSelector((state: RootState) => state.account.user);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   async function handleOpenChat() {
//     try {
//       if (!currentUser) {
//         showInfoToast("Vui lòng đăng nhập để chat với người hỗ trợ.");
//         return;
//       }

//       const existing = await ConversationService.getClientConversation();
//       let conversation = existing?.result;

//       if (!conversation?.conversationId) {
//         const created = await ConversationService.createConversation();
//         conversation = created?.result;
//       }

//       if (!conversation?.conversationId) {
//         showErrorToast("Không thể mở chat ngay bây giờ. Vui lòng thử lại sau.");
//         return;
//       }

//       setConversationId(conversation.conversationId);
//       setChatOpen(true);
//       setMenuOpen(false);
//     } catch (err) {
//       showErrorToast("Đã có lỗi xảy ra. Vui lòng thử lại sau.", (err as Error).message);
//     }
//   }

//   function handleCloseChat() {
//     setChatOpen(false);
//     setMenuOpen(false);
//   }

//   return createPortal(
//     <>
//       <div
//         className="fixed z-[9999] flex flex-col items-end gap-2"
//         style={{
//           right: "max(16px, env(safe-area-inset-right, 16px))",
//           bottom: "max(16px, env(safe-area-inset-bottom, 16px))",
//         }}
//       >
//         {/* Menu xổ lên */}
//         {menuOpen && !chatOpen && (
//           <div className="flex flex-col items-end gap-2 mb-2 animate-in fade-in slide-in-from-bottom-2">
//             <button
//               onClick={handleOpenChat}
//               className="group flex items-center gap-3 rounded-full bg-white shadow-lg px-3 py-2 hover:bg-gray-50 transition"
//             >
//               <span className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white shadow">
//                 <MessageCircle className="w-5 h-5" />
//               </span>
//               <span className="font-medium text-gray-800 whitespace-nowrap">Chat trực tuyến</span>
//             </button>

//             <a
//               href={`https://m.me/${FACEBOOK_PAGE}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group flex items-center gap-3 rounded-full bg-white shadow-lg px-3 py-2 hover:bg-gray-50 transition"
//             >
//               <span className="flex items-center justify-center w-10 h-10 bg-[#1877F2] rounded-full text-white shadow">
//                 <Facebook className="w-5 h-5" />
//               </span>
//               <span className="font-medium text-gray-800 whitespace-nowrap">Chat Facebook</span>
//             </a>

//             <a
//               href={ZALO_LINK}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group flex items-center gap-3 rounded-full bg-white shadow-lg px-3 py-2 hover:bg-gray-50 transition"
//             >
//               <span className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white font-bold shadow">
//                 Z
//               </span>
//               <span className="font-medium text-gray-800 whitespace-nowrap">Chat Zalo</span>
//             </a>
//           </div>
//         )}

//         {/* Nút mở/đóng menu (ẩn khi chat mở) */}
//         {!chatOpen && (
//           <button
//             onClick={() => setMenuOpen((v) => !v)}
//             className="w-14 h-14 bg-blue-600 rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 transition"
//             aria-label="Mở hỗ trợ"
//           >
//             {menuOpen ? (
//               <X className="w-6 h-6 text-white" />
//             ) : (
//               <MessageCircle className="w-6 h-6 text-white" />
//             )}
//           </button>
//         )}
//       </div>

//       {/* Chat modal */}
//       {conversationId && (
//         <ChatModal open={chatOpen} onClose={handleCloseChat} conversationId={conversationId} />
//       )}
//     </>,
//     document.body
//   );
// }
