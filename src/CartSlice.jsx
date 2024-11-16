import { createSlice } from '@reduxjs/toolkit';

export const CreateSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity:0
  },
  reducers: {
    addItem: (state, action) => {
      const {name,image,cost}=action.payload;
      const existing=state.items.find((plant)=>plant.name===name);
      if(existing){
        existing.quantity++;
      }else{
        state.items.push({name,image,cost,quantity:1});
      }
      state.totalQuantity++;
    },
    removeItem: (state, action) => {
      let item=state.items.find((plant)=>plant.name===action.payload);
      state.items=state.items.filter((plant)=>plant.name!==action.payload); 
      state.totalQuantity-=item.quantity;
    },
    updateQuantity: (state, action) => {
      const {name,quantity}=action.payload;
      const existing=state.items.find((plant)=>plant.name===name);
      if(existing){
        let updateCost=quantity-existing.quantity;
        existing.quantity=quantity;
        state.totalQuantity+=updateCost;
      } 
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CreateSlice.actions;

export default CreateSlice.reducer;