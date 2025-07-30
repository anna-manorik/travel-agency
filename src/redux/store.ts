import { configureStore } from '@reduxjs/toolkit';
import { cartReducer, toursReducer, tourInfoReducer, userListReducer, tourListReducer, searchTourReducer } from './slice';

const loadCartFromStorage = () => {
  try {
    const serialized = localStorage.getItem("cart");
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    return undefined;
  }
};

const loadCurrentTourFromStorage = () => {
  try {
    const serialized = localStorage.getItem("tourInfo");
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (e) {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    tours: toursReducer,
    tourInfo: tourInfoReducer,
    toursForAdmin: tourListReducer,
    users: userListReducer,
    search: searchTourReducer
  },
  preloadedState: {
    cart: loadCartFromStorage(),
    tourInfo: loadCurrentTourFromStorage()
  }
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  localStorage.setItem("tourInfo", JSON.stringify(store.getState().tourInfo));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;