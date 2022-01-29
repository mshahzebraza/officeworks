import { createSlice } from "@reduxjs/toolkit";
import purchaseOrdersDb from '../../db/purchaseOrders'
import { checkDataType, deepClone, genLog } from "../../helpers/reusable";
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
    addPO(poState, { payload: newPOdata }) {

      // Check PO List for duplicates and add in state
      const isUnique = poState.findIndex(el => el.refId === newPOdata.refId) < 0
      isUnique ? poState.push(newPOdata) : console.log('Duplicate refId!');

    },

    deletePO(poState, { payload: targetPOid }) {

      // const answer = prompt(`Type "DELETE ${targetPOid}" to continue.`)
      const answer = `DELETE ${targetPOid}`

      if (answer === `DELETE ${targetPOid}`) {

        // Find target PO Index & Delete it
        const deleteTargetIndex = poState.findIndex(el => el.refId === targetPOid)
        const targetExists = deleteTargetIndex >= 0;
        targetExists ? poState.splice(deleteTargetIndex, 1) : console.log('Target not fount');

      } else {
        console.log(`Match the message!`)
      }
    },

    updatePO(poState, { payload: formData }) { // action.payload = [formData, oldItems]
      // Find PO entry index against the input poId
      const updateTargetIndex = poState.findIndex(el => el.refId === formData.refId)
      const targetExists = updateTargetIndex >= 0;

      if (targetExists) {
        const [deleteLog] = poState.splice(updateTargetIndex, 1, formData);
      } else {
        console.log(`Can't find PO with the refId (${formData.refId}) in the redux state`)
      }

    },

    // Item reducers
    addPOitem(poState, { payload: [activePOid, itemFormData] }) {


      // Find the Parent of Target (PO of the Item)
      const targetParentIndex = poState.findIndex(el => el.refId === activePOid)
      const targetParentExists = targetParentIndex >= 0;

      if (targetParentExists) {
        const targetPOitemSet = poState[targetParentIndex].items;
        const isTargetPOitemSetValid = !!targetPOitemSet && checkDataType(targetPOitemSet) === 'array'

        // PO.items = []
        if (isTargetPOitemSetValid) {
          const isUnique = targetPOitemSet.findIndex(el => el.id === itemFormData.id) < 0

          if (isUnique) { // No Duplicate PO Item present already
            // // Add the new PO Item
            const targetIndex = targetPOitemSet.push(itemFormData)
            console.log(`Item Added to PO at #${targetIndex}`);

          } else {
            console.log(`Item ID# ${itemFormData.id} already exists in the PO# ${activePOid}.`);
          }
        }
        else {
          // PO.items = empty
          poState[targetParentIndex].items = [itemFormData]
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



// 1. Ongoing PO added
// 2. Closed PO added
// 3. PO edited to Closed
// 4. items added to closed PO. (not allowed)
// 5. items edited in closed PO. (not allowed)