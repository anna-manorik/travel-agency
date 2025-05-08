import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../types/Props'

const initialState: CartState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    decreaseItem(state, action: PayloadAction<CartItem>) {
        const item = state.items.find(item => item.id === action.payload.id);
        if (!item) return;
        if (item.quantity === 1) {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        } else {
            item.quantity -= action.payload.quantity;
        }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const { addItem, decreaseItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;