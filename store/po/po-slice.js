import { createSlice } from "@reduxjs/toolkit";
import purchaseOrdersDb from '../../db/purchaseOrders'
import { deepClone, genLog } from "../../helpers/reusable";
import { POtransactionMap } from "../../helpers/specific";
import { transactionActions } from "../transaction/transaction-slice";
import { v4 as uuidv4 } from 'uuid';

const initialState = [
  ...purchaseOrdersDb
];

const poSlice = createSlice({
  name: "po",
  initialState,
  reducers: {
    // PO reducers
    addPO(poState, action) {

      // Check PO List for duplicates
      const duplicateIndex = poState.findIndex(el => el.refId === action.payload.refId)

      if (duplicateIndex < 0) {

        // Add the new PO
        poState.push(action.payload)

      } else {
        console.log(`Duplicate Found`)
      }
    },

    deletePO(poState, action) {

      const answer = prompt(`Type "DELETE ${action.payload}" to continue.`)

      if (answer === `DELETE ${action.payload}`) {

        // Find PO entry index against the input poId
        const poIndex = poState.findIndex(el => el.refId === action.payload)

        // delete the PO from the poState slice
        poIndex < 0 ?
          console.log(`Can't find item with the refId (${action.payload}) in the redux state`) :
          poState.splice(poIndex, 1);

        console.log(`Deleted PO# ${action.payload}.`)
      } else {
        console.log(`Action Failed! Confirm the deletion of ${action.payload} by typing the required message.`)
      }
    },

    updatePO(poState, { payload: formData }) { // action.payload = [formData, oldItems]
      // Find PO entry index against the input poId
      const poUpdateIndex = poState.findIndex(el => el.refId === formData.refId)

      // delete the PO from the poState slice
      if (poUpdateIndex < 0) {
        console.log(`Can't find PO with the refId (${formData.refId}) in the redux state`)
      } else {
        // Update PO & generate Log
        const [oldPO] = poState.splice(poUpdateIndex, 1, formData);
        // console.log(`OldPO Log`, deepClone(oldPO));
      }

    },

    // Item reducers
    addPOitem(poState, { payload: [activePOid, itemFormData] }) {
      // 1. find the current PO index
      // 1-T. check for items array inside
      // 1-T-T. Check for duplicate item-id in the items
      // 1-T-T-T. "Item already exists. Try updating the item"
      // 1-T-T-F. Push the items inside
      // 1-T-F. create items array and push the form-data inside
      // 1-F. 'PO not found'

      const activePOIndex = poState.findIndex(el => el.refId === activePOid)

      if (activePOIndex >= 0) { // Parent PO exists

        const activePOitems = poState[activePOIndex].items;

        if (!!activePOitems) {
          const duplicateItemIndex = activePOitems && activePOitems.findIndex(el => el.id === itemFormData.id)

          if (duplicateItemIndex < 0) { // No Duplicate PO Item present already
            // // Add the new PO Item
            const newPOitemIndex = activePOitems.push(itemFormData)
            console.log(`Item Added to PO at #${newPOitemIndex}`);

          } else {
            console.log(`Item ID# ${itemFormData.id} already exists in the PO# ${activePOid}.`);
          }
        }
        else {
          poState[activePOIndex].items = [itemFormData]
          console.log(`Item Added to PO at #1`);
        }


      } else {
        console.log('Parent PO Not Found');
      }
    },

    deletePOitem(poState, { payload: [activePOid, dataIndex] }) {
      // action.payload = [po-refId, item-id]

      // Find PO entry index against the input poId
      const poIndex = poState.findIndex(el => el.refId === activePOid)

      if (poIndex >= 0) { // PO-refId found ?

        // Find PO entry index against the input poId
        const itemIndex = poState[poIndex].items.findIndex((el, elIdx) => elIdx === dataIndex)

        if (itemIndex >= 0) { // item-id found ?

          poState[poIndex].items.splice(itemIndex, 1);
          // delete the PO from the poState slice
          console.log(`Deleted item ID# ${dataIndex} from PO# ${activePOid}.`)
          // check if index is greater than array length
          // dataIndex > dataLength - 1 && setDataIndex(dataIndex - 1) // will be triggered after the reducer ends

        } else { // item-id not found ?
          console.log(`Can't find item with the item id: (${dataIndex}) in the redux state`)
        }
      }
      else { // PO-refId not found ?
        console.log(`Can't find PO with the refId: (${activePOid}) in the redux state`)
      }
    },

    updatePOitem(poState, { payload: [activePOid, itemFormData, oldItemSpecs] }) {
      // Input: PO-refId, Item-Details & Specs
      // genLog('itemFormData - slice', itemFormData);

      // Find PO entry index against the input poId
      const poUpdateIndex = poState.findIndex(el => el.refId === activePOid)

      if (poUpdateIndex >= 0) { // PO-refId found ?

        const itemUpdateIndex = poState[poUpdateIndex].items.findIndex(el => el.id === itemFormData.id)

        if (itemUpdateIndex >= 0) { // PO-itemId found ?

          // Update the PO item in the poState[idx].items slice and return the poState
          poState[poUpdateIndex].items.splice(itemUpdateIndex, 1, itemFormData); // `&& poState` doesn't do anything hence commented

        } else { // PO-itemId not found ?
          console.log(`Can't find item with the ID (${itemFormData.id}) in the PO# ${activePOid} of redux state`)
        }

      } else { // PO-refId not found
        console.log(`Can't find PO with the refId (${activePOid}) in the redux state`)
      }

    },

    // Spec reducers
    updatePOitemSpec(poState, { payload: [activePOid, activeItemIndex, specFormData] }) {
      // Input: PO-refId, Item-Details & Specs

      // Find PO entry index against the input poId
      const poUpdateIndex = poState.findIndex(el => el.refId === activePOid)

      if (poUpdateIndex >= 0) { // PO-refId found ?

        const activeItem = poState[poUpdateIndex].items[activeItemIndex]

        if (activeItem) { // PO-itemId found ?

          // Update the PO item in the poState[idx].items slice and return the poState
          activeItem.specification = specFormData

        } else { // PO-itemId not found ?
          console.log(`Can't find item with the ID (${specFormData.id}) in the PO# ${activePOid} of redux state`)
        }

      } else { // PO-refId not found
        console.log(`Can't find PO with the refId (${activePOid}) in the redux state`)
      }

    },

  },
});

export const poActions = poSlice.actions;
export default poSlice;



// Add POThunk
export const addPO_Thunk = (payload) => /* async */(dispatch, getState) => {

  let answer, isClosed = false;

  // check if status is closed
  if (action.payload.status === 'Closed') {
    isClosed = true;
    answer = prompt(`Type "yes" to continue.`)
  }
  if (isClosed && answer !== "yes") return

  dispatch(poActions.addPO(payload))

  // If the status was closed: add PO data to txn approval list
  if (payload.status === 'Closed') {
    console.log(`Closed PO Data`, payload);
    // Map the PO data to transaction
    // POtransactionMap()
    // addTransaction
  }

}



// Add POThunk
export const updatePO_Thunk = (payload) => /* async */(dispatch, getState) => {

  let answer, isClosed = false;

  // check if status is closed
  if (payload.status === 'Closed') {
    isClosed = true;
    answer = prompt(`Type "yes" to continue.`)
  }
  if (isClosed && answer !== "yes") return

  dispatch(poActions.updatePO(payload))

  // If the status was closed: add PO data to txn approval list

  // this transaction object must be queued in transaction list for approval
  console.log({
    date: Date.now().toString(), //receivingDate
    id: payload.items[0].id,
    intent: payload.refId && `${payload.refType}# ${payload.refId}`, // reason of transaction
    product: payload.items[0].name,
    party: payload.items[0].supplier && supplier.split(' ').slice(0, 2).join(' ') || 'supplier', // 'NDC PD', 'NESCOM PD'
    qty: payload.items[0].qty,
    remarks: payload.items[0].remarks,
    tid: uuidv4(),
    type: 'deposit',
    partIDs: null, // ids array need to be assigned to each item in the po.
    /* 
    for example in a po of 3 items of 20 qty each, ids for all 3 must be assigned separately i.e each item id must be assigned id range.
    BLS: BLS201102 01~20
    TSD: TSD110220 01~20 
    Chair: WPA_CHAIR 01~20
     */
  });

  /* 
  {
    _id: {"$oid":"61ed53c412a7e03e43386e4a"},
    tid: "bd0cd008-20ef-4377-a2ca-03a9a0274dd7",
    type: "deposit",
    product: "Ball Lead Screw",
    id: "NRS BF 220x2 1502",
    qty: 200,
    intent: "CST# 20210414",
    party: "Wuhan Beta",
    date: "receivingDate",
    remarks: "",
    initiator: "system"
  }
   */

}


// 1. Ongoing PO added
// 2. Closed PO added
// 3. PO edited to Closed
// 4. items added to closed PO. (not allowed)
// 5. items edited in closed PO. (not allowed)