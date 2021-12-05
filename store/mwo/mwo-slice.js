import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Initial State Here
};

const mwoSlice = createSlice({
  name: "mwo",
  initialState,

  reducers: {
    updateItem(state, action) {
    },
    addItem(state, action) {
    },
    removeItem(state, action) {
    },
  },
});

export const mwoActions = mwoSlice.actions;

export default mwoSlice;
