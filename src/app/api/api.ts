// @/api/endpoints/index.ts

import CONVERSATIONS_API from "./endpoints/chat/conversations";
import CHAT_API from "./endpoints/chat/chat";


const API = {
  
  CONVERSATIONS: CONVERSATIONS_API,
  CHAT: CHAT_API,
  
};

export default API;