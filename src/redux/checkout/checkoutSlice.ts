// @/redux/checkout/checkoutSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CheckoutItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CheckoutState {
  items: CheckoutItem[];
  selectedItemIds: string[]; // IDs của items được chọn từ cart
}

const initialState: CheckoutState = {
  items: [],
  selectedItemIds: [],
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // Set items cho checkout (từ cart)
    setCheckoutItems: (state, action: PayloadAction<CheckoutItem[]>) => {
      state.items = action.payload;
    },

    // Set selected item IDs (từ cart)
    setSelectedItemIds: (state, action: PayloadAction<string[]>) => {
      state.selectedItemIds = action.payload;
    },

    // Update quantity của 1 item
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    // Remove item khỏi checkout
    removeCheckoutItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.selectedItemIds = state.selectedItemIds.filter(
        (id) => id !== action.payload
      );
    },

    // Clear all checkout data
    clearCheckout: (state) => {
      state.items = [];
      state.selectedItemIds = [];
    },
  },
});

export const {
  setCheckoutItems,
  setSelectedItemIds,
  updateItemQuantity,
  removeCheckoutItem,
  clearCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;