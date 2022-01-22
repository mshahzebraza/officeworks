import { createSlice } from "@reduxjs/toolkit";
import transactionsDb from "../../db/transactions";

const initialState = [
  ...transactionsDb
];

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction(state, { payload: { data, sender = 'user', } }) {
      // sender: user/ mwo/ po
      // Received from PO / MWO / Client
      // state.item = 
    },
    deleteTransaction(state, action) {
      // state.item = 
    },
  },
});

export const transactionListActions = transactionSlice.actions;
export default transactionSlice;


// PO Status
// Uninitiated, In Process, Delivered, Received/Closed
// At 'Closed' stage, the addTransaction should be called.

// MWO Status
// Uninitiated, In Process, Delivered, Received/Closed
// At 'Closed' stage, the addTransaction should be called.

// as soon as the po status changes to delivered




