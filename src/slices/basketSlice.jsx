import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //Actions
    addToBasket: (state, action) => {
      console.log('actionn', action.payload)
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      console.log('dasdasda', action.payload.id)
      const index = state.items.findIndex((basketItem) => basketItem.id === action.payload.id)
      console.log('inddd', index)
      let newBasket = [...state.items];

      if (index >= 0) {
        //the items exist in the basket
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product {id: ${action.payload.id}} as its not in the basket`)

      }
      state.items = newBasket
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const seletedItemsTotal = (state) => state.basket.items.reduce((total, item) => {
  return total + item.price
}, 0)

export default basketSlice.reducer;
