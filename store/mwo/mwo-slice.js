import { createSlice } from "@reduxjs/toolkit";
import workOrdersDb from '../../db/workOrders'

const initialState = [
  // Initial State Here
  ...workOrdersDb
];

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
