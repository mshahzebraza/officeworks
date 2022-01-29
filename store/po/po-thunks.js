import { v4 as uuidv4 } from 'uuid';
import { replaceLastCharacter } from '../../helpers/reusable';
import { transactionActions } from '../transaction/transaction-slice';
import { poActions } from "./po-slice";

// Add POThunk
export const addPO_Thunk = (payload) => /* async */(dispatch, getState) => {

  let answer = 'yes', isClosed = false;

  // check if status is closed
  // if (payload.status === 'Closed') {
  //   isClosed = true;
  //   answer = prompt(`Type "yes" to continue.`)
  // }
  if (isClosed && answer !== "yes") return

  dispatch(poActions.addPO(payload))

  if (payload.status === 'Closed') {
    console.log(`Closed PO Data`, payload);
    // Right now the New PO form doesn't allow this. But later in development, try to handle this case like updatePO_Thunk.
  }

}

// Update POThunk
export const updatePO_Thunk = (payload) => /* async */(dispatch, getState) => {

  let answer = 'yes', isClosed = false;

  // check if status is closed
  if (payload.status === 'Closed') {
    isClosed = true;
    // answer = prompt(`Type "yes" to continue.`)
  }
  if (isClosed && answer !== "yes") return

  dispatch(poActions.updatePO(payload))


  // If the status was closed: add PO data to txn approval list where it is separated from finalized TXNs
  if (isClosed) {

    payload.items.forEach((poItem, idx, arr) => dispatch(
      transactionActions.addTransaction(
        {
          data: mapPOtoTransaction(poItem, idx, arr.length, payload.refType, payload.refId, payload.supplier)
        }
      )
    ))
  }

}



// mapPOtoTransaction
export function mapPOtoTransaction(data = {}, poItemIdx = Math.round(Math.random() * 9), totalPoItems = 999, refType, refId, supplier) {
  const epochTimeOfTxn = replaceLastCharacter(Date.now(), poItemIdx);
  return {
    date: epochTimeOfTxn,
    /* //  the "last digit of epoch time" is replaced by "poItemIdx" to differentiate the ids when multiple TXNs are added by system almost instantaneously.
    1643465405048 + last digit 
    becomes
    1643465405048 + poItemIdx
    */
    id: data.id,
    intent: refId && `${refType}# ${refId}`, // reason of transaction
    partIDs: false, // ids array need to be assigned to each item in the po.
    party: supplier && supplier.split(' ').slice(0, 2).join(' ') || 'supplier', // 'NDC PD', 'NESCOM PD'
    product: data.name,
    qty: data.qty,
    remarks: data.remarks,
    // OR 
    // tid: uuidv4(),
    tid: `${refType}#${refId}_${poItemIdx}/${totalPoItems}_${epochTimeOfTxn}`, // auto-generated transaction id
    type: 'deposit', // bcz of PO
  };
}
