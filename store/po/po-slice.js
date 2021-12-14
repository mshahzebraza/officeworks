import { createSlice } from "@reduxjs/toolkit";
import purchaseOrdersDb from '../../db/purchaseOrders'

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
      // Add the new PO
      duplicateIndex < 0 ? poState.push(action.payload) : console.log(`Duplicate Found`);
    },

    deletePO(poState, action) {

      // Confirmation deletion
      console.log(action.payload);
      console.log(`Request to delete ${action.payload} dispatched.`)
      const answer = prompt(`You will not be able to retrieve it back! Type "DELETE ${action.payload}" if you really want to delete it.`)

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

    updatePO(poState, action) {
      // Input: PO-Details & Specs
      console.log(`update PO - reducer running`);

      // Find PO entry index against the input poId
      const poUpdateIndex = poState.findIndex(el => el.refId === action.payload.refId)
      // Compare the prev and new
      // poState[poUpdateIndex] v/s action.payload

      // delete the PO from the poState slice
      poUpdateIndex < 0 ?
        console.log(`Can't find item with the refId (${action.payload.refId}) in the redux state`) :
        // returning the main poState after making the edit
        poState.splice(poUpdateIndex, 1, action.payload) && poState;
    },



    // Item reducers

    addPOitem(poState, action) {
      // Input: PO-refId, Item-Details & Specs
      console.log(`add PO item - reducer running`, action.payload);

      // Check PO List for duplicates
      const activePOitemIndex = poState.findIndex(el => el.refId === action.payload[0])
      console.log(activePOitemIndex);

      if (activePOitemIndex >= 0) { // Parent PO exists
        // Check for duplicate PO item
        const duplicateItemIndex = poState[activePOitemIndex].items.findIndex(el => el.id === action.payload[1].id)

        if (duplicateItemIndex < 0) { // No Duplicate PO Item present already
          // // Add the new PO Item
          const newPOitemIndex = poState[activePOitemIndex].items.push(action.payload[1])
          console.log(`Item Added to PO at #${newPOitemIndex}`);
        } else {
          console.log(`Item ID# ${action.payload[1].id} already exists in the PO# ${action.payload[0]}.`);

        }


      } else {
        console.log('Parent PO Not Found');
      }
      // duplicateIndex < 0 ? poState.push(action.payload) : console.log(`Duplicate Found`);
    },

    deletePOitem(poState, action) {
      // action.payload = [po-refId, item-id]

      // Find PO entry index against the input poId
      const poIndex = poState.findIndex(el => el.refId === action.payload[0])

      if (poIndex >= 0) { // PO-refId found ?

        // Find PO entry index against the input poId
        const itemIndex = poState[poIndex].items.findIndex((el, elIdx) => elIdx === action.payload[1])

        if (itemIndex >= 0) { // item-id found ?

          poState[poIndex].items.splice(itemIndex, 1);
          // delete the PO from the poState slice
          console.log(`Deleted item ID# ${action.payload[1]} from PO# ${action.payload[0]}.`)

        } else { // item-id not found ?
          console.log(`Can't find item with the item id: (${action.payload[1]}) in the redux state`)
        }
      }
      else { // PO-refId not found ?
        console.log(`Can't find PO with the refId: (${action.payload[0]}) in the redux state`)
      }
    },

    updatePOitem(poState, action) {
      // Input: PO-refId, Item-Details & Specs
      console.log(`update PO item - reducer running`);

      // Find PO entry index against the input poId
      const poUpdateIndex = poState.findIndex(el => el.refId === action.payload[0])

      if (poUpdateIndex >= 0) { // PO-refId found ?

        const itemUpdateIndex = poState[poUpdateIndex].items.findIndex(el => el.id === action.payload[1].id)

        if (itemUpdateIndex >= 0) { // PO-itemId found ?

          // Update the PO item in the poState[idx].items slice and return the poState
          poState[poUpdateIndex].items.splice(itemUpdateIndex, 1, action.payload[1]) && poState

        } else { // PO-itemId not found ?
          console.log(`Can't find item with the ID (${action.payload[1].id}) in the PO# ${action.payload[0]} of redux state`)
        }

      } else { // PO-refId not found
        console.log(`Can't find PO with the refId (${action.payload[0]}) in the redux state`)
      }

    },
  },
});

export const poActions = poSlice.actions;
export default poSlice;

// {
  //   refType: '',
  //   refId: '',
  //   category: '',
  //   fulfillmentSource: '',
  //   currency: '',
  //   totalCost: '',
  //   supplier: '',
  //   status: '',
  //   remarks: '',
  //   specifications: {},
  // }