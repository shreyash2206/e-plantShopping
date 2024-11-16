import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((plant) => plant.name === name);

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity++;
      } else {
        // Otherwise, add the new item to the cart
        state.items.push({ name, image, cost, quantity: 1 });
      }
      // Increase the total quantity of items in the cart
      state.totalQuantity++;
    },
    removeItem: (state, action) => {
      const itemName = action.payload;
      const itemToRemove = state.items.find((plant) => plant.name === itemName);

      if (itemToRemove) {
        // Decrease the total quantity by the item's quantity
        state.totalQuantity -= itemToRemove.quantity;
        // Remove the item from the cart
        state.items = state.items.filter((plant) => plant.name !== itemName);
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find((plant) => plant.name === name);

      if (existingItem) {
        // Calculate the change in quantity and update accordingly
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        // Update the total quantity based on the difference
        state.totalQuantity += quantityDifference;
      }
    },
  },
});

// Export the actions to be used in components
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;
