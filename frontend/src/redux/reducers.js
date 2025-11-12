// src/redux/reducers.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],     // cart items
  promo: null,   // applied promo
  orders: [],    // stored orders
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!state.items) state.items = [];
      const newItem = action.payload;
      if (!newItem || newItem.id == null) return; // safety
      const existing = state.items.find((i) => i.id === newItem.id);
      if (existing) {
        existing.quantity = (existing.quantity || 0) + 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      if (!state.items) return;
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    setQty: (state, action) => {
      if (!state.items) return;
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity = quantity;
    },

    clearCart: (state) => {
      state.items = [];
      state.promo = null;
    },

    applyPromo: (state, action) => {
      state.promo = action.payload;
    },

    addOrder: (state, action) => {
      if (!state.orders) state.orders = [];
      state.orders.push(action.payload);
    },

    // <-- This is the missing export your OrdersPage expects
    setOrders: (state, action) => {
      state.orders = action.payload || [];
    },
  },
});

export const {
  addItem,
  removeItem,
  setQty,
  clearCart,
  applyPromo,
  addOrder,
  setOrders,
} = cartSlice.actions;

export default cartSlice.reducer;
