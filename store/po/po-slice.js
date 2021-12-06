import { createSlice } from "@reduxjs/toolkit";
import purchaseOrdersDb from '../../db/purchaseOrders'

const initialState = [
  ...purchaseOrdersDb
];

const poSlice = createSlice({
  name: "po",
  initialState,
  reducers: {

    addPO(poState, action) {
      // Check PO List for duplicates
      const duplicateIndex = poState.findIndex(el => el.refId === action.payload.refId)
      // Add the new PO
      duplicateIndex < 0 ? poState.push(action.payload) : console.log(`Duplicate Found`);
    },

    deletePO(poState, action) {
      // Find PO entry index against the input poId
      const poIndex = poState.findIndex(el => el.refId === action.payload)

      // delete the PO from the poState slice
      poIndex < 0 ?
        console.log(`Can't find item with the refId (${action.payload}) in the redux state`) :
        poState.splice(poIndex, 1);
    },

    updatePO(poState, action) {
      // Find PO entry index against the input poId
      console.log(`updatePO in ran`);
      console.log(action.payload);
      // const poIndex = poState.findIndex(el => el.refId === action.payload)

      // delete the PO from the poState slice
      // poIndex < 0 ?
      //   console.log(`Can't find item with the refId (${action.payload}) in the redux state`) :
      //   poState.splice(poIndex, 1) && poState;
    }
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