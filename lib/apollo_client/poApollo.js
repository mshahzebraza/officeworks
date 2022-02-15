import { makeVar } from '@apollo/client'
import { checkDataType, httpParams, replaceLastCharacter } from '../../helpers/reusable';
import { addTxnHandler, mapPOtoTransaction } from './transactionApollo';

const poApollo = makeVar([])
// Target: PO

export const deletePOHandler = async (id) => {
  // Find target PO Index & Delete it
  let poState = [...poApollo()];

  const targetIndex = poApollo().findIndex(el => el.refId === id)
  const targetExists = targetIndex !== -1;
  if (targetExists) {
    const targetUUID = poState[targetIndex]._id
    // Delete the PO Data

    // 1. Database delete
    const res = await httpParams(
      process.env.API.PO, //'http://localhost:3000/api/po',
      'DELETE',
      { poUUID: targetUUID }
    ); // res.data = Deleted Item 

    // 2. Local State delete
    const [target] = poState.splice(targetIndex, 1);

    poApollo(poState);
  } else {
    console.log('Target not fount');
  }

  // // Async Code
  // return poApollo(resJSON.data)

};
export const addPOHandler = async (newPOvalues) => {
  let poState = [...poApollo()]
  // Check PO List for duplicates and add in state
  const isUnique = poState.findIndex(el => el.refId === newPOvalues.refId) < 0;
  if (isUnique) {
    // Database
    const res = await httpParams(
      process.env.API.PO, //'http://localhost:3000/api/po',
      'POST',
      { poData: newPOvalues }
    ); // res.data = added PO
    const { data: createdPO } = await res.json();
    // Client Side
    poState.push(createdPO)
  } else {
    console.log('Duplicate PO Id!')
  }

  poApollo(poState)
};
export const updatePOHandler = async (updatePOvalues) => {
  let wasClosed, isClosed = updatePOvalues.status === 'Closed';

  let poState = [...poApollo()]
  const targetIndex = poState.findIndex(el => el.refId === updatePOvalues.refId);
  const targetExists = targetIndex >= 0;
  if (targetExists) {
    wasClosed = poState[targetIndex].status === 'Closed';
    // Database
    const res = await httpParams(
      process.env.API.PO, //'http://localhost:3000/api/po',
      'PATCH',
      {
        poUUID: poState[targetIndex]._id,
        poData: updatePOvalues
      }
    ); // res.data = updated PO
    const { data: updatedPO } = await res.json();// returns updated PO

    // Client Side
    poState.splice(targetIndex, 1, updatedPO)
  } else {
    console.log(`PO Id(${updatePOvalues.refId}) not found`)
  }

  poApollo(poState);

  // Thi code below does something wrong such that the code above doesn't run without reload
  // Add a transaction if status = 'Closed'
  if (isClosed && !wasClosed) { // if status is closed && was changed to closed

    // convert PO items to transactions
    const txnList = updatePOvalues.items.map((poItem, idx, items) => mapPOtoTransaction(
      poItem, // data
      idx, // poItem index
      items.length, // total poItems in the PO (siblings of the item)
      updatePOvalues?.refType, // refType
      updatePOvalues?.refId, // refId
      updatePOvalues?.supplier // supplier
    )
    )
    // add multiple transactions to db and state
    addTxnHandler(txnList, true)
  }

};

// Target: PO/POItem
export const deletePOitemHandler = async ([activePOid, dataIndex]) => {
  // Find PO entry index against the input poId
  let poState = [...poApollo()]
  const targetParentIndex = poState.findIndex(el => el.refId === activePOid)
  const targetParentExists = targetParentIndex >= 0;
  const targetParentUUID = poState[targetParentIndex]._id;

  if (targetParentExists) { // PO-refId found ?
    const targetIndex = poState[targetParentIndex].items.findIndex((el, elIdx) => elIdx === dataIndex)
    const targetExists = targetIndex >= 0;
    const targetUUID = poState[targetParentIndex].items[targetIndex]._id;

    if (targetExists) {
      // Database
      const res = await httpParams(
        process.env.API.PO_ITEM, //'http://localhost:3000/api/po-item',
        'DELETE',
        {
          poUUID: targetParentUUID,
          itemUUID: targetUUID
        }
      );
      // Client Side
      const [target] = poState[targetParentIndex].items.splice(targetIndex, 1);
      poApollo(poState)

    } else { // item-id not found ?
      console.log(`PO Item id(${dataIndex}) not found`)
    }
  }
  else { // PO-refId not found ?
    console.log(`PO(${activePOid}) not found`)
  }
}
export const addPOitemHandler = async ([activePOid, itemFormData]) => {
  let poState = [...poApollo()]
  // Find the Parent of Target (PO of the Item)
  const targetParentIndex = poState.findIndex(el => el.refId === activePOid)
  const targetParentExists = targetParentIndex >= 0;

  if (targetParentExists) {
    const targetSet = poState[targetParentIndex].items;
    const isTargetSetValid = !!targetSet && checkDataType(targetSet) === 'array'

    // PO.items = []
    if (isTargetSetValid) {
      const isUnique = targetSet.findIndex(el => el.id === itemFormData.id) < 0

      if (isUnique) { // No Duplicate PO Item present already
        // Add the new PO Item
        // Database
        const res = await httpParams(
          process.env.API.PO_ITEM, //'http://localhost:3000/api/po-item',
          'POST',
          {
            poUUID: poState[targetParentIndex]._id,
            itemData: itemFormData
          }
        ); // returns success & last element added
        const { data: createdItem } = await res.json()
        // Client Side
        poState[targetParentIndex].items.push(createdItem)
        poApollo(poState)


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
}
export const updatePOitemHandler = async ([activePOid, itemFormData, oldItemSpecs]) => {
  const poState = [...poApollo()]
  // Find PO entry index against the input poId
  const targetParentIndex = poState.findIndex(el => el.refId === activePOid)
  const targetParentExists = targetParentIndex >= 0;
  const targetParentUUID = poState[targetParentIndex]._id;

  if (targetParentExists) { // PO-refId found ?

    const targetIndex = poState[targetParentIndex].items.findIndex(el => el.id === itemFormData.id)
    const targetExists = targetIndex >= 0;
    const targetUUID = poState[targetParentIndex].items[targetIndex]._id;

    if (targetExists) {
      // Update the PO item in the poState[idx].items slice and return the poState
      // Database
      const res = await httpParams(
        process.env.API.PO_ITEM, //'http://localhost:3000/api/po-item',
        'PATCH',
        {
          poUUID: poState[targetParentIndex]._id,
          itemUUID: targetUUID,
          itemData: itemFormData
        }
      ); // res.data = updated Item
      const { data: updatedItem } = await res.json()
      // Client Side
      poState[targetParentIndex].items.splice(targetIndex, 1, updatedItem); // `&& poState` doesn't do anything hence commented
      poApollo(poState)
      console.log("updatedItem", updatedItem);
    } else { // PO-itemId not found ?
      console.log(`PO Item ID (${itemFormData.id}) not found of PO#${activePOid}`)
    }

  } else { // PO-refId not found
    console.log(`PO(${activePOid}) not found`)
  }

}

// Target: PO/POItem/POItemSpec
export const updatePOitemSpecHandler = async ([activePOid, activeItemIndex, specFormData]) => {
  // Input: PO-refId, Item-Details & Specs

  let poState = [...poApollo()]
  // Find PO entry index against the input poId
  const targetParent2Index = poState.findIndex(el => el.refId === activePOid)
  const targetParent2Exists = targetParent2Index >= 0;
  const targetParent2UUID = poState[targetParent2Index]._id;

  if (targetParent2Exists) { // PO-refId found ?

    const targetParent = poState[targetParent2Index].items[activeItemIndex]
    const targetParentUUID = targetParent && targetParent._id;

    if (targetParent) { // PO-itemId found ?
      // Update the PO item in the poState[idx].items slice and return the poState
      // Database
      const res = await httpParams(
        process.env.API.PO_ITEM_SPEC, //'http://localhost:3000/api/po-item-spec',
        'PATCH',
        {
          poUUID: targetParent2UUID,
          itemUUID: targetParentUUID,
          specData: specFormData
        }
      ) // res.data = updatedSpecs
      const { data: updatedSpecs } = await res.json()
      // Client Side
      targetParent.specification = updatedSpecs
      poApollo(poState)

    } else { // PO-itemId not found ?
      console.log(`PO Item Id (${specFormData.id}) NOT FOUND.`)
    }

  } else { // PO-refId not found
    console.log(`PO (${activePOid}) NOT FOUND`)
  }

}

export default poApollo;




