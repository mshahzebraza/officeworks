import { createSlice } from "@reduxjs/toolkit";
import purchaseOrdersDb from '../../db/purchaseOrders'
import { genLog } from "../../helpers/reusable";

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
        // Update PO
        poState.splice(poUpdateIndex, 1, formData); // `&& poState` does not do anything, hence commented
        // Append old PO items
        // poState[poUpdateIndex].items = oldItems;

        // Generate log
        const [oldPO] = poState.splice(poUpdateIndex, 1, formData);
        console.log(`log of oldPO`, oldPO);
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

    deletePOitem(poState, { payload: [activePOid, dataIndex, dataLength, setDataIndex] }) {
      // action.payload = [po-refId, item-id]

      console.log(dataLength);
      // Find PO entry index against the input poId
      const poIndex = poState.findIndex(el => el.refId === activePOid)

      if (poIndex >= 0) { // PO-refId found ?

        // Find PO entry index against the input poId
        const itemIndex = poState[poIndex].items.findIndex((el, elIdx) => elIdx === dataIndex)

        if (itemIndex >= 0) { // item-id found ?

          poState[poIndex].items.splice(itemIndex, 1);
          // delete the PO from the poState slice
          console.log(`Deleted item ID# ${dataIndex} from PO# ${activePOid}.`)
          dataIndex > dataLength - 1 && setDataIndex(dataIndex - 1)

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
      genLog('itemFormData - slice', itemFormData);

      // Find PO entry index against the input poId
      const poUpdateIndex = poState.findIndex(el => el.refId === activePOid)

      if (poUpdateIndex >= 0) { // PO-refId found ?

        const itemUpdateIndex = poState[poUpdateIndex].items.findIndex(el => el.id === itemFormData.id)

        if (itemUpdateIndex >= 0) { // PO-itemId found ?

          // Update the PO item in the poState[idx].items slice and return the poState
          poState[poUpdateIndex].items.splice(itemUpdateIndex, 1, itemFormData); // `&& poState` doesn't do anything hence commented
          // Append old specs in the PO item
          // const activeItem = poState[poUpdateIndex].items[itemUpdateIndex];

          // const newItemSpecs = { ...activeItem.specification, ...oldItemSpecs }

          // activeItem.specification = newItemSpecs

        } else { // PO-itemId not found ?
          console.log(`Can't find item with the ID (${itemFormData.id}) in the PO# ${activePOid} of redux state`)
        }

      } else { // PO-refId not found
        console.log(`Can't find PO with the refId (${activePOid}) in the redux state`)
      }

    },

    // Spec reducers
    updatePOitemSpec(poState, { payload: [activePOid, activeItemIndex, specFormData, oldItemSpecs] }) {
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

    addPOitemSpec(poState, { payload: [activePOid, activeItemIndex, specFormData] }) {
      // 1. find the current PO index
      // 1-T. Find the item & push the specs inside it (and maybe check if there are already any specs)
      // 1-T-T. "Item already exists. Try updating the item"
      // 1-T-F. Push the items inside
      // 1-F. 'PO not found'

      const activePOIndex = poState.findIndex(el => el.refId === activePOid)

      if (activePOIndex >= 0) { // Parent PO exists

        const activePOitems = poState[activePOIndex].items;

        const activeItem = activePOitems[activeItemIndex];
        activeItem.specification = specFormData

      } else {
        console.log('Parent PO Not Found');
      }
    },
  },
});

export const poActions = poSlice.actions;
export default poSlice;




// THUNKS

// export const sendCartData = (cart) => {

//   updatePO(poState, action) {
//     // Input: PO-Details & Specs
//     console.log(`update PO - reducer running`);

//     // Find PO entry index against the input poId
//     const poUpdateIndex = poState.findIndex(el => el.refId === action.payload.refId)
//     // Compare the prev and new
//     // poState[poUpdateIndex] v/s action.payload

//     // delete the PO from the poState slice
//     if (poUpdateIndex < 0) {
//       console.log(`Can't find PO with the refId (${action.payload.refId}) in the redux state`)
//     } else {
//       poState.splice(poUpdateIndex, 1, action.payload); // `&& poState` does not do anything, hence commented

//       // Generate log
//       const [oldPO] = poState.splice(poUpdateIndex, 1, action.payload);
//       console.log(`log of oldPO`, oldPO);
//     }

//   },

// };

// To download backend state
// export const fetchCartData = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       // fetch data
//       const response = await fetch(
//         "https://dummy-react-4111997-default-rtdb.firebaseio.com/cart.json"
//       );

//       // trigger fail response [contd below]
//       // STOP execution
//       if (!response.ok) {
//         throw new Error("Could not fetch cart data!");
//       }

//       // parse JSON
//       const data = await response.json();

//       // Return JSON Data
//       return data;
//     };

//     try {
//       const cartData = await fetchData();

//       // Handle successful response
//       dispatch(
//         cartActions.replaceCart({
//           items: cartData.items || [],
//           totalQuantity: cartData.totalQuantity,
//         })
//       );
//     } catch (error) {
//       // Handle failed response [contd from Error above]
//       dispatch(
//         uiActions.showNotification({
//           status: "error",
//           title: "Error!",
//           message: "Fetching cart data failed!",
//         })
//       );
//     }
//   };
// };




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