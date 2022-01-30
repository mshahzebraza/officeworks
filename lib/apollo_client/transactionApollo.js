import { makeVar } from "@apollo/client";
import { replaceLastCharacter } from "../../helpers/reusable";

const transactionApollo = makeVar([])

export const addTxnHandler = ({ data: txnData, /* initiator = 'system', */ }) => {
  let transactionState = [...transactionApollo()]
  // Check PO List for duplicates
  const isUnique = transactionState.findIndex(el => el.tid === txnData.tid) < 0
  // Add Txn
  isUnique ? transactionState.push({ ...txnData/* , initiator */ }) : console.log('Duplicate tid!');
  transactionApollo(transactionState)
}

export const deleteTxnHandler = ({ data: txnId }) => {
  let transactionState = [...transactionApollo()]

  const deleteIndex = transactionState.findIndex(el => el.tid === txnId);
  console.log(deleteIndex);
  if (deleteIndex >= 0) {
    const [{ tid }] = transactionState.splice(deleteIndex, 1)
    console.log(`Deleted transaction# ${tid}`);
  }
  transactionApollo(transactionState)
  // state.item = 
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


export function mapMWOtoTransaction(data = {}, idx) {
  // const epochTimeOfTxn = replaceLastCharacter(Date.now(), idx);
  const epochTimeOfTxn = Date.now();
  return {
    // tid: `${idx}_${data.mwoId}_${dateSegment}`, // auto-generated transaction id
    date: epochTimeOfTxn, //receivingDate
    id: data.itemId,
    intent: data.mwoId && `MWO# ${data.mwoId}`, // reason of transaction
    party: 'PPC', // 'NDC PD', 'NESCOM PD'
    product: data.itemName,
    qty: data.qty,
    remarks: data.remarks,
    tid: `MWO#${data.mwoId}_${epochTimeOfTxn}`,
    // tid: uuidv4(),
    type: 'deposit', // bcz of PO
  };
}
