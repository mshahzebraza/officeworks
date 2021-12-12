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
      // Input: PO-refId, Item-Details & Specs
      console.log(`update PO - reducer running`);

      // Find PO entry index against the input poId
      const poUpdateIndex = poState.findIndex(el => el.refId === action.payload.refId)
      // Compare the prev and new
      // poState[poUpdateIndex] v/s action.payload

      // delete the PO from the poState slice
      poUpdateIndex < 0 ?
        console.log(`Can't find item with the refId (${action.payload}) in the redux state`) :
        poState.splice(poUpdateIndex, 1, action.payload) && poState;
    },



    // Item reducers

    addPOitem(poState, action) {
      // Input: PO-refId, Item-Details & Specs
      console.log(`add PO item - reducer running`, action.payload);

      // Check PO List for duplicates
      // const duplicateIndex = poState.findIndex(el => el.refId === action.payload.refId)
      // // Add the new PO
      // duplicateIndex < 0 ? poState.push(action.payload) : console.log(`Duplicate Found`);
    },

    deletePOitem(poState, action) {
      // action.payload = [po-refId, item-id]

      // Find PO entry index against the input poId
      const poIndex = poState.findIndex(el => el.refId === action.payload[0])
      const itemIndex = poState[poIndex].items.findIndex((el, elIdx) => elIdx === action.payload[1])

      // delete the PO from the poState slice
      poIndex < 0 ?
        console.log(`Can't find item with the item id: (${action.payload[1]}) in the redux state`) :
        poState[poIndex].items.splice(itemIndex, 1);

      console.log(`Deleted item ID# ${action.payload[1]} from PO# ${action.payload[0]}.`)

    },
    updatePOitem(poState, action) {
      // Input: PO-refId, Item-Details & Specs
      console.log(`update PO item - reducer running`);

      // Find PO entry index against the input poId
      const poUpdateIndex = poState.findIndex(el => el.refId === action.payload.refId)
      // Compare the prev and new
      // poState[poUpdateIndex] v/s action.payload

      // delete the PO from the poState slice
      poUpdateIndex < 0 ?
        console.log(`Can't find item with the refId (${action.payload}) in the redux state`) :
        poState.splice(poUpdateIndex, 1, action.payload) && poState;
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