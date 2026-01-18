// @/api/endpoints/index.ts
import AUTH_API from "./auth";
import CATEGORY_API from "./category/category";
import CONVERSATIONS_API from "./chat/conversations";
import CHAT_API from "./chat/chat";
import NOTIFICATION_API from "./notification";
import BLOG_API from "./blog/blog";


const API = {
  AUTH: AUTH_API,
  CATEGORY: CATEGORY_API,
  CONVERSATIONS: CONVERSATIONS_API,
  CHAT: CHAT_API,
  NOTIFICATION_API: NOTIFICATION_API,
  BLOG: BLOG_API,
  
};

export default API;