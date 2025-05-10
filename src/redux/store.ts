import { configureStore } from '@reduxjs/toolkit';
import { cartReducer, toursReducer } from './slice';

const loadCartFromStorage = () => {
  try {
    const serialized = localStorage.getItem("cart");
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    tours: toursReducer
  },
  preloadedState: {
    cart: loadCartFromStorage()
  }
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;