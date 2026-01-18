// @/redux/store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account/accountSlice";
import chatReducer from "./chat/chatSlice";
import checkoutReducer from "./checkout/checkoutSlice"; // ✅ Import mới

const rootReducer = combineReducers({
  account: accountReducer,
  chat: chatReducer,
  checkout: checkoutReducer, // ✅ Thêm vào store
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;