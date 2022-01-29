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
    addTransaction(transactionState, { payload: { data: txnData, initiator = 'system', } }) {

      // Check PO List for duplicates
      const duplicateIndex = transactionState.findIndex(el => el.tid === txnData.tid)

      if (duplicateIndex < 0) {
        // Add the new Transaction
        transactionState.push({
          ...txnData,
          initiator: initiator
        })

      } else {
        console.log(`Duplicate Transaction Found`)
      }


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


// fetchTransactionThunk - to be executed to transaction page load
export function fetchTransactions_Thunk() {

  return /* async */ (dispatch, getState) => {

    const { poList, mwoList, transactionList } = getState();

    // Delete all system generated Transactions
    if (transactionList.length > 0) {

      // Fetch array of system generated transaction IDs
      const sysGenTxnList = transactionList.reduce((acc, cur, arr) => {
        if (cur.initiator !== 'system') return acc
        return acc.concat(cur.tid);
      }, []);

      // For each TID in the array, delete Item
      sysGenTxnList.forEach(txnId => {
        dispatch(transactionActions.deleteTransaction({ data: txnId }))
      });
    }
    // console.log(transactionList);


    // add transactions from POList
    poList.forEach((curPO, poIdx) => {

      curPO.items && curPO.items.length > 0 && curPO.items.forEach((poItem, poItemIdx) => {
        const transaction = mapPOtoTransaction(poItem, poIdx, curPO.refType, curPO.refId, curPO.supplier)

        dispatch(transactionActions.addTransaction(
          {
            data: transaction
          }
        ))
      })
    });


    // add transactions from MWOList
    mwoList.forEach((curMWO, mwoIdx) => {

      const transaction = mapMWOtoTransaction(curMWO, mwoIdx);

      dispatch(transactionActions.addTransaction(
        {
          data: transaction
        }
      ))

    })


  }
}



// mapPOtoTransaction
export function mapPOtoTransaction(data = {}, idx, refType, refId, supplier) {
  // const subLength = 6;
  // return 'transaction' object
  return {
    // tid: `${idx}_${refId}_${Date.now().toString().substring(13 - subLength, 13)}`, // auto-generated transaction id
    tid: uuidv4(),
    type: 'deposit', // bcz of PO
    product: data.name,
    id: data.id,
    qty: data.qty,
    // intent: refId && `PO_${refId}` || 'poId', // reason of transaction
    intent: refId && `${refType}# ${refId}`, // reason of transaction
    party: supplier && supplier.split(' ').slice(0, 2).join(' ') || 'supplier', // 'NDC PD', 'NESCOM PD'
    date: 'receivingDate', //receivingDate
    remarks: data.remarks,
  };
}

// mapMWOtoTransaction
export function mapMWOtoTransaction(data = {}, idx) {
  // const subLength = 6;
  // const dateSegment = Date.now().toString().substring(13 - subLength, 13);
  // return 'transaction' object
  return {
    // tid: `${idx}_${data.mwoId}_${dateSegment}`, // auto-generated transaction id
    tid: uuidv4(),
    type: 'deposit', // bcz of PO
    product: data.itemName,
    id: data.itemId,
    qty: data.qty,
    // intent: data.mwoId && `MWO_${data.mwoId}` || 'poId', // reason of transaction
    intent: data.mwoId && `MWO# ${data.mwoId}`, // reason of transaction
    party: 'PPC', // 'NDC PD', 'NESCOM PD'
    date: 'receivingDate', //receivingDate
    remarks: data.remarks,
  };
}
