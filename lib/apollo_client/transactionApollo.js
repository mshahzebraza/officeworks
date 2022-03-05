import { makeVar } from "@apollo/client";
import { formatNumber, httpParams, replaceLastCharacter, superArray } from "../../helpers/reusable";

const transactionApollo = makeVar([])

// Delete a transaction
export const deleteTxnHandler = (txnId) => {
  let transactionState = [...transactionApollo()]

  const targetIndex = transactionState.findIndex(el => el._id === txnId); //? tid for manual transactions couldn't be defined
  const targetExists = targetIndex >= 0;

  if (targetExists) {
    const targetUUID = transactionState[targetIndex]._id
    // Delete the transaction
    // 1. Database
    const res = httpParams(
      `${process.env.API.TRANSACTION}?transactionUUID=${targetUUID}`,
      "DELETE"
    ); // res.data = Deleted Item

    transactionState.splice(targetIndex, 1)
  }
  transactionApollo(transactionState)

  // TODO: Update the inventory with the new transactions
}

// Create a transaction - General Purpose
export const addTxnHandler = async (txnData, multiple = false) => {
  // Create a local copy of the transaction state
  let transactionState = [...transactionApollo()]

  if (multiple) {
    // 1. Filter PO Transactions data for duplicates and add in state
    const uniqueTxnList = txnData.filter(
      txn => {
        return transactionState.findIndex(transaction => transaction._id === txn._id) < 0
      })
    // 2. Database
    const res = await httpParams(
      process.env.API.TRANSACTION,
      'POST',
      { transactionDataList: uniqueTxnList }
    );
    const { data: createdTxnList } = await res.json();
    // 3. Client Side
    createdTxnList.forEach(txn => transactionState.push(txn))
  } else {
    // 1. Check transaction data for duplicates and add in state
    const isUnique = transactionState.findIndex(txn => txn._id === txnData._id) < 0;
    // create a new transaction
    if (isUnique) {
      // 2. Database
      const res = await httpParams(
        process.env.API.TRANSACTION,
        'POST',
        { transactionData: txnData }
      ); // res.data = added transaction
      const { data: createdTransaction } = await res.json();


      // 3. Client Side
      transactionState.push(createdTransaction)
    } else {
      console.log('Duplicate transaction Id!')
    }
  }
  // Update the transaction state
  transactionApollo(transactionState)
}

// Update a transaction - In Process
export const updateTxnHandler = async (txnData) => {
  let transactionState = [...transactionApollo()]
  const targetIndex = transactionState.findIndex(el => el._id === txnData._id);
  const targetExists = targetIndex >= 0;

  if (targetExists) {
    const targetUUID = transactionState[targetIndex]._id
    // 1. Database
    const res = await httpParams(
      `${process.env.API.TRANSACTION}?transactionUUID=${targetUUID}`,
      "PATCH",
      {
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
    /* // ? the "last digit of epoch time" is replaced by "poItemIdx" to differentiate the ids when multiple TXNs are added by system almost instantaneously.
    1643465405048 + last digit 
    becomes
    1643465405048 + poItemIdx
    */
    productId: data.id,
    intent: refId && `${refType}# ${refId}`, // reason of transaction
    // help for quantity
    partIDs: superArray(data.qty, data.id, 3/* , '___' */), // ids array need to be assigned to each item in the po.
    party: supplier && supplier?.split(' ').slice(0, 2).join(' ') || 'supplier', // 'NDC PD', 'NESCOM PD'
    productNomenclature: data.name,
    // qty: data.qty,
    remarks: data.remarks,
    txnType: 'deposit', // bcz of PO
  };
}


export function mapMWOtoTransaction(data = {}, idx) {
  // const epochTimeOfTxn = replaceLastCharacter(Date.now(), idx);
  const epochTimeOfTxn = Date.now();
  return {
    date: epochTimeOfTxn, //receivingDate
    productId: data.itemId,
    intent: data.mwoId && `MWO# ${data.mwoId}`, // reason of transaction
    partIDs: superArray(data.qty, data.itemId, 3/* , '___' */), // ids array need to be assigned to each item in the po.
    party: 'PPC', // 'NDC PD', 'NESCOM PD'
    productNomenclature: data.itemName,
    // qty: data.qty,
    remarks: data.remarks,
    // tid: `MWO#${data.mwoId}_${epochTimeOfTxn}`,
    // tid: uuidv4(),
    txnType: 'deposit', // bcz of PO
  }
}
