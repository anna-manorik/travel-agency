import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartState, UserProps } from '../types/Props'
import { ToursProps, ToursState, TourInfoState } from '../types/Props'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config/firebase.ts';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

  const initialCartState: CartState = {
    items: []
  };

  const initialFilterState: ToursState = {
    allTours: [],
    filteredTours: [],
    loading: false
  };

  const initialTourInfoState: TourInfoState = {
    selectedTour: null,
    loading: false
  };

//   const initialState: ToursState = {
//     tours: [],
//     status: 'idle',
//     error: null,
// };

interface UsersState {
  users: UserProps[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialStateUsers: UsersState = {
  users: [],
  loading: 'idle',
  error: null,
};

  export const fetchTours = createAsyncThunk(
    'tours/fetchTours',
    async () => {
      const snapshot = await getDocs(collection(db, "tours"));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ToursProps[];
    }
  );

  export const fetchUsers = createAsyncThunk(
    'tours/fetchUsers',
    async () => {
      const snapshot = await getDocs(collection(db, "users"));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserProps[];
    }
  );

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
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

const toursSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        filterByCategory(state, action: PayloadAction<string>){
            const category = action.payload;
            state.filteredTours = category === "All"
              ? state.allTours
              : state.allTours.filter(tour => tour.category === category);
        },
        filterByPrice(state, action: PayloadAction<{ minPrice: number, maxPrice: number }>){
            state.filteredTours = state.allTours.filter(tour => tour.price >= action.payload.minPrice && tour.price <= action.payload.maxPrice)
        },
        filterByDate(state, action: PayloadAction<string>){
            state.filteredTours = state.allTours.filter(tour => new Date(tour.date.seconds * 1000).toLocaleDateString('en-CA') === action.payload)

        },
        filterByRate(state, action: PayloadAction<string>){
            const rating = action.payload;
            state.filteredTours = rating === 'All'
            ? state.allTours
            : state.allTours.filter(tour => tour.rating === Number(rating))
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchTours.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchTours.fulfilled, (state, action) => {
            state.loading = false;
            state.allTours = action.payload;
            state.filteredTours = action.payload;
          });
    }
})

const tourInfoSlice = createSlice({
  name: 'tours',
  initialState: initialTourInfoState,
  reducers: {
    setSelectedTour: (state, action: PayloadAction<ToursProps>) => {
      state.selectedTour = action.payload;
    },
  }
});

const toursListAdminSlice = createSlice({
    name: 'tours',
    initialState: initialFilterState,
    reducers: {
        updateTourLocally: (state, action: PayloadAction<ToursProps>) => {
            const index = state.allTours.findIndex(tour => tour.id === action.payload.id);
            if (index !== -1) {
                state.allTours[index] = action.payload;
            }
        },
        deleteTourLocally: (state, action: PayloadAction<string>) => {
            state.allTours = state.allTours.filter(tour => tour.id !== action.payload);
        },
    },
});

const userListSlice = createSlice({
  name: 'users',
  initialState: initialStateUsers,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserProps[]>) => {
        state.loading = 'succeeded';
        state.users = action.payload; // Зберігаємо отриманих користувачів
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Помилка завантаження користувачів';
      });
  },
})

export const { addItem, decreaseItem, removeItem, clearCart } = cartSlice.actions;
export const { filterByCategory, filterByPrice, filterByDate, filterByRate } = toursSlice.actions;
export const { setSelectedTour } = tourInfoSlice.actions;
export const { updateTourLocally, deleteTourLocally } = toursListAdminSlice.actions;
export const cartReducer = cartSlice.reducer;
export const toursReducer = toursSlice.reducer;
export const tourInfoReducer =  tourInfoSlice.reducer;
export const tourListReducer =  toursListAdminSlice.reducer;
export const userListReducer = userListSlice.reducer