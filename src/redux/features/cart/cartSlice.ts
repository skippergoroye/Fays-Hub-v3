import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  imgIcon: string;
  title: string;
  price: string;
  ratingIcon: string;
  addtocart: string;
  cartIcon: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;






// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CartItem {
//   photos: any;
//   current_price: any;
//   name: string;
//   id: string;
//   imgIcon: string;
//   title: string;
//   price: string;
//   ratingIcon: string;
//   addtocart: string;
//   cartIcon: string;
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
// }

// const loadState = (): CartState => {
//   try {
//     const serializedState = localStorage.getItem('cart');
//     if (serializedState === null) {
//       return { items: [] };
//     }
//     return JSON.parse(serializedState);
//   } catch (e) {
//     console.warn('Error loading state from local storage', e);
//     return { items: [] };
//   }
// };

// const saveState = (state: CartState) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('cart', serializedState);
//   } catch (e) {
//     console.warn('Error saving state to local storage', e);
//   }
// };

// const initialState: CartState = loadState();

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.items.find(item => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//       saveState(state);
//     },
//     incrementQuantity: (state, action: PayloadAction<string>) => {
//       const item = state.items.find(item => item.id === action.payload);
//       if (item) {
//         item.quantity += 1;
//       }
//       saveState(state);
//     },
//     decrementQuantity: (state, action: PayloadAction<string>) => {
//       const item = state.items.find(item => item.id === action.payload);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       }
//       saveState(state);
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//       saveState(state);
//     },
  
//   },
// });

// export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;

// export default cartSlice.reducer;
