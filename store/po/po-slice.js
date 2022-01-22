import { createSlice } from "@reduxjs/toolkit";
import purchaseOrdersDb from '../../db/purchaseOrders'
import { deepClone, genLog } from "../../helpers/reusable";
import { POtransactionMap } from "../../helpers/specific";

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

        let answer, isClosed = false;

        // check if status is closed
        if (action.payload.status === 'Closed') {
          isClosed = true;
          answer = prompt(`Setting the PO status to closed means the contents of the PO cannot be edited! 
          Type "I am sure" if you want to continue.`)
        }

        if (isClosed && answer !== "I am sure") return

        // Add the new PO
        poState.push(action.payload)

      } else {
        console.log(`Duplicate Found`)
      }
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

    updatePO(poState, { payload: [formData] }) { // action.payload = [formData, oldItems]
      // console.log(oldItems);
      // Input: PO-Details & Specs
      console.log(`update PO - reducer running`);

      // Find PO entry index against the input poId
      const poUpdateIndex = poState.findIndex(el => el.refId === formData.refId)
      // Compare the prev and new
      // poState[poUpdateIndex] v/s formData

      // delete the PO from the poState slice
      if (poUpdateIndex < 0) {
        console.log(`Can't find PO with the refId (${formData.refId}) in the redux state`)
      } else {


        let answer, isClosed = false;

        // check if status is closed
        if (formData.status === 'Closed') {
          isClosed = true;
          answer = prompt(`Setting the PO status to closed means the contents of the PO cannot be edited! 
             Type "I am sure" if you want to continue.`)
        }

        if (isClosed && answer !== "I am sure") return

        // Update PO & generate Log
        const [oldPO] = poState.splice(poUpdateIndex, 1, formData);
        console.log(`log of oldPO`, deepClone(oldPO));
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

    // addPOitemSpec(poState, { payload: [activePOid, activeItemIndex, specFormData] }) {
    //   // 1. find the current PO index
    //   // 1-T. Find the item & push the specs inside it (and maybe check if there are already any specs)
    //   // 1-T-T. "Item already exists. Try updating the item"
    //   // 1-T-F. Push the items inside
    //   // 1-F. 'PO not found'

    //   const activePOIndex = poState.findIndex(el => el.refId === activePOid)

    //   if (activePOIndex >= 0) { // Parent PO exists

    //     const activePOitems = poState[activePOIndex].items;

    //     const activeItem = activePOitems[activeItemIndex];
    //     activeItem.specification = specFormData

    //   } else {
    //     console.log('Parent PO Not Found');
    //   }
    // },
  },
});

export const poActions = poSlice.actions;
export default poSlice;





// PO states: Uninitiated, In Process, Delivered, Closed (Received), Cancelled

// Note: Any case that is marked closed cannot be altered.

// Add POThunk
export function addPO_Thunk(payload) {
  // payload = form values from addPO form

  return /* async */ (dispatch) => {

    // dispatch actions just as in any component

    dispatch(poActions.addPO(payload))
    /*
      dispatch(someActions.someReducer(ourPayload))
     */

    // PO Added (usually with no items)


    // PO Status changed (to 'Closed')
    // 1. Contains Items

    // PO item added
    // 1. PO Status === 'Closed'
    // item addition shouldn't be allowed after change is made otherwise transaction must be found & changed. 
    // It may still be possible for a user to change the specifications of an already added item in a Closed PO BUT he may not change the 'id' & 'Name' of the PO item. Bcz the 'id' & 'Name' is picked up by transaction.  
    // PO item updated

    // PO status changed closed && contains po.items
    // po.items Added && po status is closed
    // po.items updated && po status is closed



    if (payload.status === 'Closed') {
      console.log(`Closed PO Data`, payload);
      // Map the PO data to transaction
      // POtransactionMap()
      // addTransaction
    }
    // 1. addPO
    // 2. Check if state === closed (means received)
    // 2.yes addTransaction
    // 2.no ---
  }
}


// 1. Ongoing PO added
// 2. Closed PO added
// 3. PO edited to Closed
// 4. items added to closed PO. (not allowed)
// 5. items edited in closed PO. (not allowed)