import { makeVar } from "@apollo/client";
import { request, httpParams, replaceLastCharacter, superArray, invalidResponse } from "../../helpers/reusable";

const transactionApollo = makeVar({
     fetched: false,
     list: [],
})

// Delete a transaction
export const deleteTxnHandler = async (txnId) => {
     let transactionState = transactionApollo()
     let transactionStateList = [...transactionState.list]

     // check if the transaction with txnId is in the list
     const txnExists = transactionStateList.some(txn => txn._id === txnId)

     if (!txnExists) {
          console.error('Transaction ID not found');
          return null;
     }

     // 1. Database Delete
     console.log('Checkpoint 2');
     const { success, data: { deletedTransaction }, error, message } = await request(
          {
               url: process.env.API.TRANSACTION,
               method: 'DELETE',
               params: {
                    transactionUUID: txnId
               }
          }
     )
     console.log('success: ', success);

     if (!success) {
          console.error("Error: ", error);
          return null;
     }
     console.log('message: ', message);

     // 2. Update State
     transactionApollo({
          fetched: transactionState.fetched,
          list: transactionStateList.filter(txn => txn._id !== deletedTransaction._id)
     })

     // TODO: Update the inventory with the new transactions
}

// Create a transaction - General Purpose
export const addTxnHandler = async (txnData, multiple = false) => {
     // Create a local copy of the transaction state
     const transactionState = transactionApollo()
     const transactionStateList = [...transactionState.list]

     // ? Additions of multiple Txns take place in POs. Also it can be triggered with a manual API request
     if (multiple) {
          // 1. Filter PO Transactions data for duplicates and add in state
          const filteredDupeList = txnData.filter(
               dispatchTxn => {
                    return transactionStateList.findIndex(stateTxn => stateTxn._id === dispatchTxn._id) < 0
               })
          if (filteredDupeList.length === 0) invalidResponse('No new transactions to add')
          // 2. Database
          const { success, data: { createdTxnList }, message, error } = await request(
               {
                    url: process.env.API.TRANSACTION,
                    method: 'POST',
                    body: {
                         transactionDataList: filteredDupeList
                    }
               }
          ) // ?? "request" returns JSON data already... :)
          if (!success) {
               console.error(error);
               return null;
          }
          // 3. Client Side
          createdTxnList.forEach(newTxn => transactionStateList.push(newTxn))

     } else { //? In case of MWO, a single txn takes place only
          // 1. Check transaction data for duplicates and add in state
          // check if the transaction with txnId is in the list using array method some
          const txnExistsAlready = transactionStateList.some(txn => txn._id === txnData._id)
          // cast an invalid response if the transaction already exists
          if (txnExistsAlready) invalidResponse('Transaction already exists')
          // create a new transaction
          if (!txnExistsAlready) {
               // 2. Database
               const { success, data: { createdTxn }, message, error } = await request(
                    {
                         url: process.env.API.TRANSACTION,
                         method: 'POST',
                         body: {
                              transactionData: txnData
                         }
                    }
               ); // res.data = added transaction
               if (!success) {
                    console.error(error);
                    return null;
               }
               // 3. Client Side
               transactionStateList.push(createdTxn)
          } else {
               console.log('Duplicate transaction Id!')
          }
     }
     // Update the transaction state
     transactionApollo({
          fetched: transactionState.fetched,
          list: transactionStateList
     })
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
