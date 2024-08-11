import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItemToCart(state, action) {
        const newItem = action.payload;
        state.cartItems.push(newItem);
      },
      updateCartItemQuantity(state, action) {
        const { itemId, quantity } = action.payload;
        const item = state.cartItems.find((item) => item.id === itemId);
        if (item) {
          item.quantity = quantity;
        }
      },
      removeItemFromCart(state, action) {
        const itemId = action.payload;
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      },
    },
  });
  

export const { addItemToCart, updateCartItemQuantity, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
