import { makeVar } from "@apollo/client";
import { request, replaceLastCharacter, superArray } from "../../helpers/reusable";
import moduleApollo from "./moduleApollo";


const transactionApollo = makeVar({
     fetched: false,
     list: [],
})

// Delete a transaction
export const deleteTxnHandler = async (txnId) => {
     const transactionState = transactionApollo();
     const transactionStateList = [...transactionState.list];
     const moduleState = moduleApollo();
     const moduleStateList = [...moduleState.list];

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
     if (!success) throw new Error("Error: ", error);
     console.log('message: ', message);


     {
          console.log('Checkpoint 3');
          const { success, data: { updatedModules }, message, error } = await request( //? fetch the list of updated modules only
               {
                    url: process.env.API.INVENTORY,
                    method: 'PATCH',
                    params: {
                         isIncrement: false,
                    },
                    body: {
                         txnList: [deletedTransaction]
                    }
               }
          )
          if (!success) throw new Error('Error: ', error)
          console.log('message: ', message);

          // update the moduleStateList with the new qty
          updatedModules.forEach(updatedModule => {
               const moduleIndex = moduleStateList.findIndex(module => module._id === updatedModule._id)
               moduleStateList[moduleIndex].inv.total = updatedModule.inv.total
          })
          // update the moduleState
          moduleApollo({
               fetched: moduleState.fetched,
               list: moduleStateList
          })
     }


     // 2. Update State
     transactionApollo({
          fetched: transactionState.fetched,
          list: transactionStateList.filter(txn => txn._id !== deletedTransaction._id)
     })

     // TODO: Update the inventory with the new transactions
}

// Create a transaction - General Purpose
export const addTxnHandler = async (txnData) => {
     // Create a local copy of the transaction state
     const transactionState = transactionApollo()
     const transactionStateList = [...transactionState.list]
     const moduleState = moduleApollo()
     const moduleStateList = [...moduleState.list]

     // ? Additions of multiple Txns take place in POs. Also it can be triggered with a manual API request
     // 1. Filter PO Transactions data for duplicates and add in state
     const filteredDupeList = txnData.filter(
          dispatchTxn => {
               return transactionStateList.findIndex(stateTxn => stateTxn._id === dispatchTxn._id) < 0
          })
     if (filteredDupeList.length === 0) throw new Error('Error: No new transactions to add')
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
     if (!success) throw new Error('Error: ', error)
     console.log('message: ', message);
     // 3. Client Side
     createdTxnList.forEach(newTxn => transactionStateList.push(newTxn))
     // TODO: Add logic to update the inventory (module.qty) with the new transactions data (qty and moduleId)
     // 1. Get the moduleState of the moduleID
     // 2. Update the moduleState qty with the new transactions qty. 
     // 3. Either Use the updateModule function or another function to update the moduleStateQty. like updateInventory etc.
     // 4. We can also create a dedicated inventoryController for the modules qty to be updated by just passing the list of modules to be incremented or decremented. This will cost us only one API call
     // 5. Figure out a way to trigger multiple backend promise calls 

     // Request to inventory-api to update the inventory (redirects to inventory-update-fn in the moduleController)
     // Apollo function is not created, and the logic is merged in the transaction function.

     // ? Inventory Update Block
     {
          console.log('Checkpoint 3');
          const { success, data: { updatedModules }, message, error } = await request( //? fetch the list of updated modules only
               {
                    url: process.env.API.INVENTORY,
                    method: 'PATCH',
                    params: {
                         isIncrement: true,
                    },
                    body: {
                         txnList: createdTxnList
                    }
               }
          )
          if (!success) throw new Error('Error: ', error)
          console.log('message: ', message);

          // update the moduleStateList with the new qty
          updatedModules.forEach(updatedModule => {
               const moduleIndex = moduleStateList.findIndex(module => module._id === updatedModule._id)
               moduleStateList[moduleIndex].inv.total = updatedModule.inv.total
          })
          // update the moduleState
          moduleApollo({
               fetched: moduleState.fetched,
               list: moduleStateList
          })
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
          const { success, data: { updatedTransaction }, message, error } = await request({
               url: process.env.API.TRANSACTION,
               method: 'PATCH',
               params: {
                    transactionUUID: targetUUID
               },
               body: {
                    transactionData: txnData
               }
          })
          if (!success) throw new Error('Error: ' + error)
          console.log('message: ', message);

          // 2. Client Side
          transactionState[targetIndex] = updatedTransaction

     } else {
          console.log('Target not found');
     }
     transactionApollo(transactionState)
}

export default transactionApollo;


export function mapPOtoTransaction(
     purchaseItemData = {}, // purchase specific data
     poItemIdx = Math.round(Math.random() * 9), // at what number does the current PO item lie in the PO
     refType,
     refId,
     supplier
) {
     const moduleState = moduleApollo();
     const moduleStateList = [...moduleState.list];
     const poItem = moduleStateList.find(module => module._id === purchaseItemData.item); // module specification data

     const epochTimeOfTxn = replaceLastCharacter(Date.now(), poItemIdx);

     return {
          date: epochTimeOfTxn,
          /* // ? the "last digit of epoch time" is replaced by "poItemIdx" to differentiate the ids when multiple TXNs are added by system almost instantaneously.
          1643465405048 + last digit 
          becomes
          1643465405048 + poItemIdx
          */
          product: {
               _id: poItem._id, // = purchaseItemData.item
               name: poItem.name,
               id: poItem.id,
          },
          partIDs: superArray(purchaseItemData.qty, poItem.id, 3/* , '___' */), // ids array need to be assigned to each item in the po.
          intent: refId && `${refType}# ${refId}`, // reason of transaction
          party: supplier && supplier?.split(' ').slice(0, 2).join(' ') || 'supplier', // 'NDC PD', 'NESCOM PD'
          remarks: purchaseItemData.remarks,
          txnType: 'deposit', // bcz of PO
     };
}


export function mapMWOtoTransaction(
     manufactureItemData = {}, // manufacture specific data
     mwoItemIdx, // at what number does the current MWO item lie in the MWO
     mwoId
) {

     const moduleState = moduleApollo();
     const moduleStateList = [...moduleState.list];
     const mwoItem = moduleStateList.find(module => module._id === manufactureItemData.item); // module specification data

     const epochTimeOfTxn = replaceLastCharacter(Date.now(), mwoItemIdx); // no need to replace last digit as mwo usually contains one item per MWO, but future proofing is a good thing
     return {
          date: epochTimeOfTxn, //receivingDate
          product: {
               id: mwoItem.id,
               name: mwoItem.name,
               uuid: mwoItem._id, // = manufactureItemData.item
          },
          partIDs: superArray(manufactureItemData.qty, mwoItem.id, 3/* , '___' */), // ids array need to be assigned to each item in the po.
          intent: mwoId && `MWO# ${mwoId}`, // reason of transaction
          party: 'PPC', // 'NDC PD', 'NESCOM PD'
          remarks: manufactureItemData.remarks,
          txnType: 'deposit', // bcz of PO
     }
}
