import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stateKey: 'stateValue',
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addItem(state, action) {
      state.item += 1;
    },
  },
});

export const inventoryActions = inventorySlice.actions;
export default inventorySlice;
