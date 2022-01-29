import { createSlice } from "@reduxjs/toolkit";
import transactionsDb from "../../db/transactions";
import { v4 as uuidv4 } from 'uuid';

const initialState = [
  ...transactionsDb
];

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addTransaction(transactionState, { payload: { data: txnData, /* initiator = 'system', */ } }) {
      // Check PO List for duplicates
      const isUnique = transactionState.findIndex(el => el.tid === txnData.tid) < 0
      // Add Txn
      isUnique ? transactionState.push({ ...txnData/* , initiator */ }) : console.log('Duplicate tid!');
    },

    deleteTransaction(transactionState, { payload: { data: txnId } }) {

      const deleteIndex = transactionState.findIndex(el => el.tid === txnId);
      console.log(deleteIndex);
      if (deleteIndex >= 0) {
        const [{ tid }] = transactionState.splice(deleteIndex, 1)
        console.log(`Deleted transaction# ${tid}`);
      }

      // state.item = 
    },
  },
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice;

