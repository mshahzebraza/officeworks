/* 
Legacy Note: This is before adding any asynchronous logic i.e. communication with backend
 */



import { makeVar } from '@apollo/client'
import { checkDataType, replaceLastCharacter } from '../../helpers/reusable';
import { addTxnHandler, mapPOtoTransaction } from './transactionApollo';

const poApollo = makeVar([])

export const fetchAllPO = async () => {
  const res = await fetch('http://localhost:3000/api/po');
  const resJSON = await res.json();
  return poApollo(resJSON.data)
};



// Target: PO
export const deletePOHandler = (id) => {
  // Find target PO Index & Delete it
  const deleteTargetIndex = poApollo().findIndex(el => el.refId === id)
  // const targetExists = deleteTargetIndex >= 0;

  if (deleteTargetIndex != -1) {
    let duplicateArr = [...poApollo()];
    const [target] = duplicateArr.splice(deleteTargetIndex, 1);
    poApollo(duplicateArr);
  } else {
    console.log('Target not fount');
  }

};
export const addPOHandler = (newPOvalues) => {
  let poState = [...poApollo()]
  // Check PO List for duplicates and add in state
  const isUnique = poState.findIndex(el => el.refId === newPOvalues.refId) < 0;
  isUnique ? poState.push(newPOvalues) : console.log('Duplicate PO Id!');

  poApollo(poState)
};
export const updatePOHandler = (updatePOvalues) => {
  let poState = [...poApollo()]
  const targetIndex = poState.findIndex(el => el.refId === updatePOvalues.refId);
  const targetExists = targetIndex >= 0;

  targetExists
    ? poState.splice(targetIndex, 1, updatePOvalues)
    : console.log(`PO Id(${updatePOvalues.refId}) not found`)

  poApollo(poState);


  // Add a transaction if status = 'Closed'
  if (updatePOvalues.status === 'Closed') {
    /* updatePOvalues.items && */
    updatePOvalues.items.forEach((poItem, idx, arr) => addTxnHandler(
      {
        data: mapPOtoTransaction(poItem, idx, arr.length, updatePOvalues.refType, updatePOvalues.refId, updatePOvalues.supplier)
      })
    )
  }

};

// Target: PO/POItem
export const deletePOitemHandler = ([activePOid, dataIndex]) => {
  // Find PO entry index against the input poId
  let poState = [...poApollo()]
  const targetParentIndex = poState.findIndex(el => el.refId === activePOid)
  const targetParentExists = targetParentIndex >= 0;

  if (targetParentExists) { // PO-refId found ?
    const targetIndex = poState[targetParentIndex].items.findIndex((el, elIdx) => elIdx === dataIndex)
    const targetExists = targetIndex >= 0;

    if (targetExists) {
      const [target] = poState[targetParentIndex].items.splice(targetIndex, 1);
      poApollo(poState)
      // check if index is greater than array length
      // dataIndex > dataLength - 1 && setDataIndex(dataIndex - 1) // will be triggered after the reducer ends

    } else { // item-id not found ?
      console.log(`PO Item id(${dataIndex}) not found`)
    }
  }
  else { // PO-refId not found ?
    console.log(`PO(${activePOid}) not found`)
  }
}
export const addPOitemHandler = ([activePOid, itemFormData]) => {
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
        // // Add the new PO Item
        const targetIndex = targetSet.push(itemFormData)
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
export const updatePOitemHandler = ([activePOid, itemFormData, oldItemSpecs]) => {
  const poState = [...poApollo()]
  // Find PO entry index against the input poId
  const targetParentIndex = poState.findIndex(el => el.refId === activePOid)
  const targetParentExists = targetParentIndex >= 0;

  if (targetParentExists) { // PO-refId found ?

    const targetIndex = poState[targetParentIndex].items.findIndex(el => el.id === itemFormData.id)
    const targetExists = targetIndex >= 0;

    if (targetExists) {
      // Update the PO item in the poState[idx].items slice and return the poState
      poState[targetParentIndex].items.splice(targetIndex, 1, itemFormData); // `&& poState` doesn't do anything hence commented
      poApollo(poState)

    } else { // PO-itemId not found ?
      console.log(`PO Item ID (${itemFormData.id}) not found of PO#${activePOid}`)
    }

  } else { // PO-refId not found
    console.log(`PO(${activePOid}) not found`)
  }

}

// Target: PO/POItem/POItemSpec
export const updatePOitemSpecHandler = ([activePOid, activeItemIndex, specFormData]) => {
  // Input: PO-refId, Item-Details & Specs

  let poState = [...poApollo()]
  // Find PO entry index against the input poId
  const targetParent2Index = poState.findIndex(el => el.refId === activePOid)
  const targetParent2Exists = targetParent2Index >= 0;

  if (targetParent2Exists) { // PO-refId found ?

    const targetParent = poState[targetParent2Index].items[activeItemIndex]

    if (targetParent) { // PO-itemId found ?

      // Update the PO item in the poState[idx].items slice and return the poState
      targetParent.specification = specFormData
      poApollo(poState)

    } else { // PO-itemId not found ?
      console.log(`PO Item Id (${specFormData.id}) NOT FOUND.`)
    }

  } else { // PO-refId not found
    console.log(`PO (${activePOid}) NOT FOUND`)
  }

}

export default poApollo;




