import { makeVar } from "@apollo/client";
import { httpParams, replaceLastCharacter } from "../../helpers/reusable";

const transactionApollo = makeVar([])

// Delete a transaction
export const deleteTxnHandler = (txnId) => {
  let transactionState = [...transactionApollo()]

  const targetIndex = transactionState.findIndex(el => el.tid === txnId);
  const targetExists = targetIndex >= 0;

  if (targetExists) {
    const targetUUID = transactionState[targetIndex]._id
    // Delete the transaction
    // 1. Database
    const res = httpParams(
      process.env.API.TRANSACTION, //'http://localhost:3000/api/transaction',
      "DELETE",
      { transactionUUID: targetUUID }
    ); // res.data = Deleted Item

    transactionState.splice(targetIndex, 1)
  }
  transactionApollo(transactionState)
}

// Create a transaction
export const addTxnHandler = async (txnData) => {
  console.log("addTxnHandler: ", txnData)
  let transactionState = [...transactionApollo()]
  // Check PO List for duplicates
  const isUnique = transactionState.findIndex(el => el.tid === txnData.tid) < 0

  if (isUnique) {
    // Create a new transaction
    // 1. Database
    const res = await httpParams(
      process.env.API.TRANSACTION, //'http://localhost:3000/api/transaction',
      "POST",
      {
        transactionData: txnData
        /* , many: true */ // this must be used to insert many records
      }
    ); // res.data = added PO

    const { data: createdTransaction } = await res.json();

    console.log("createdTransaction: ", createdTransaction);
    // 2. Client Side
    transactionState.push(createdTransaction)
  } else {
    console.log('Duplicate Txn Id!')
  }

  transactionApollo(transactionState)
}

// Create multiple transactions
export const addTxnListHandler = async (txnListData) => {
  let transactionState = [...transactionApollo()]

  // filter the each of incoming transactions against the existing transactions in the App
  const uniquePOtxnList = txnListData.filter(
    txnData => {
      // Check if the incoming transaction is already in the state transaction list
      return transactionState.findIndex(
        transaction => transaction.tid === txnData.tid
      ) < 0 // return true if incoming transaction is unique
    }
  )
  // console.log("uniquePOtxnList: ", uniquePOtxnList)

  const res = await httpParams(
    process.env.API.TRANSACTION, //'http://localhost:3000/api/transaction',
    "POST",
    {
      transactionDataList: uniquePOtxnList
      , many: true
    }
  ); // res.data = added PO transaction List

  const { data: createdTransactionList } = await res.json();

  console.log("createdTransactionList: ", createdTransactionList);
  // 2. Client Side
  transactionState.concat([...createdTransactionList])
  console.log('transactionState: ', transactionState);
  transactionApollo(transactionState)
}

// Update a transaction - In Process
export const updateTxnHandler = async (txnData) => {
  let transactionState = [...transactionApollo()]
  const targetIndex = transactionState.findIndex(el => el.tid === txnData.tid);
  const targetExists = targetIndex >= 0;

  if (targetExists) {
    const targetUUID = transactionState[targetIndex]._id
    // 1. Database
    const res = await httpParams(
      process.env.API.TRANSACTION, //'http://localhost:3000/api/transaction',
      "PATCH",
      {
        transactionUUID: targetUUID,
        transactionData: txnData
      }
    ); // res.data = added PO
    const { updatedTransaction } = await res.json();
    // 2. Client Side
    transactionState[targetIndex] = updatedTransaction

  } else {
    console.log('Target not found');
  }
  transactionApollo(transactionState)
}

export default transactionApollo;


export function mapPOtoTransaction(data = {}, poItemIdx = Math.round(Math.random() * 9), totalPoItems = 999, refType, refId, supplier) {
  const epochTimeOfTxn = replaceLastCharacter(Date.now(), poItemIdx);
  return {
    date: epochTimeOfTxn,
    /* //  the "last digit of epoch time" is replaced by "poItemIdx" to differentiate the ids when multiple TXNs are added by system almost instantaneously.
    1643465405048 + last digit 
    becomes
    1643465405048 + poItemIdx
    */
    productId: data.id,
    intent: refId && `${refType}# ${refId}`, // reason of transaction
    // help for quantity
    partIDs: null, // ids array need to be assigned to each item in the po.
    party: supplier && supplier.split(' ').slice(0, 2).join(' ') || 'supplier', // 'NDC PD', 'NESCOM PD'
    productNomenclature: data.name,
    // qty: data.qty,
    remarks: data.remarks,
    tid: `${refType}#${refId}_${poItemIdx}/${totalPoItems}_${epochTimeOfTxn}`, // auto-generated transaction id
    txnType: 'deposit', // bcz of PO
  };
}


export function mapMWOtoTransaction(data = {}, idx) {
  // const epochTimeOfTxn = replaceLastCharacter(Date.now(), idx);
  const epochTimeOfTxn = Date.now();
  return {
    // tid: `${idx}_${data.mwoId}_${dateSegment}`, // auto-generated transaction id
    date: epochTimeOfTxn, //receivingDate
    productId: data.itemId,
    intent: data.mwoId && `MWO# ${data.mwoId}`, // reason of transaction
    partIDs: null, // ids array need to be assigned to each item in the po.
    party: 'PPC', // 'NDC PD', 'NESCOM PD'
    productNomenclature: data.itemName,
    // qty: data.qty,
    remarks: data.remarks,
    tid: `MWO#${data.mwoId}_${epochTimeOfTxn}`,
    // tid: uuidv4(),
    txnType: 'deposit', // bcz of PO
  }
}
