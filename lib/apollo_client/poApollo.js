import { makeVar } from '@apollo/client'
import { checkDataType, httpParams, replaceLastCharacter } from '../../helpers/reusable';
import { addTxnHandler, mapPOtoTransaction } from './transactionApollo';

const poApollo = makeVar([
  // {
  //   // There can be a field of available References and RefId can be chosen to be from one of them. In the order of PO > DeliveryNote > Bill# > Quotation#
  //   refType: 'CST', // Bill, Delivery Note (DN), , Comparative Statement of Tender (CST), Purchase Order (PO)
  //   refId: '20210414', // typeOfRef-YYYYMMDD
  //   category: 'Single Quotation',
  //   fulfillmentSource: 'Foreign',
  //   currency: 'USD',
  //   totalCost: 32500,
  //   supplier: 'Wuhan Beta Tech Company',
  //   status: 'Active', // Active,Delivered,Closed
  //   // Remark / Update
  //   remarks: '',
  //   //   [ // it is planned to convert the remarks into an array of different remarks
  //   //   // { dateId, title, remark } // date id is automatically generated for each remark
  //   // ],
  //   items: [ // 05 items in the PO
  //     {
  //       // Trim the input strings before saving from inputs
  //       name: 'Ball Lead Screw',
  //       type: 'Special',
  //       id: 'NRS BF 220x2 1502',
  //       qty: 200,
  //       unitPrice: 450,
  //       remarks: '',
  //       specification:
  //       {
  //         pitch: '0.02 mm',
  //         threadedLength: '220 mm',
  //         backlash: '0.001 %',
  //         details: 'Other details ',
  //       }
  //       // [
  //       // ['pitch', '0.02 mm'],
  //       // ['threadedLength', '220 mm'],
  //       // ['backlash', '0.001 %'],
  //       // ['details', 'Other details'],
  //       // ]
  //     },
  //     {
  //       name: 'Ball Lead Screw',
  //       type: 'Special',
  //       id: 'NRS BF 200x4 1002',
  //       qty: 100,
  //       unitPrice: 500,
  //       remarks: '',
  //       specification: {
  //         pitch: '0.04 mm',
  //         threadedLength: '200 mm',
  //         backlash: '0.001 %',
  //         details: 'All of the long long lorem ipsum goes in here if it is felt that the content does not fall in any other category',
  //       }
  //     },
  //     {
  //       name: 'Motor',
  //       type: 'Special',
  //       id: 'J48ZWX01',
  //       qty: 100,
  //       unitPrice: 500,
  //       remarks: '',
  //       specification: {
  //         type: 'Brush-less DC',
  //         voltage: '20 V',
  //         ratedCurrent: '70 A',
  //         details: 'All of the long long lorem ipsum goes in here if it is felt that the content does not fall in any other category',
  //       }
  //     },
  //     {
  //       name: 'Screw',
  //       type: 'Standard',
  //       id: 'M 5 * 15',
  //       qty: 100,
  //       unitPrice: 100,
  //       remarks: '',
  //       specification: {
  //         headType: 'Slot Head',
  //         // screwValues: 'M2 x 10',
  //         orderCode: 'RS 0152253',
  //         material: 'SS A4',
  //       }
  //     },
  //     {
  //       name: 'Screw',
  //       type: 'Standard',
  //       id: 'M 5 * 15',
  //       qty: 100,
  //       unitPrice: 100,
  //       remarks: '',
  //       specification: {
  //         headType: 'Slot Head',
  //         screwValues: 'M2 x 10',
  //         material: 'SS A4',
  //       }
  //     },
  //     {
  //       name: 'Screw',
  //       type: 'Standard',
  //       id: 'M 5 * 15',
  //       qty: 100,
  //       unitPrice: 100,
  //       remarks: '',
  //       specification: {
  //         headType: 'Slot Head',
  //         screwValues: 'M2 x 10',
  //         material: 'SS A4',
  //       }
  //     },
  //     {
  //       name: 'Screw',
  //       type: 'Standard',
  //       id: 'M 5 * 15',
  //       qty: 100,
  //       unitPrice: 100,
  //       remarks: '',
  //       specification: {
  //         headType: 'Slot Head',
  //         screwValues: 'M2 x 10',
  //         material: 'SS A4',
  //       }
  //     },
  //   ]
  // },
  // {
  //   refType: 'PO',
  //   refId: 'NDC-LP-MN-65',
  //   category: 'Repeat Order',
  //   fulfillmentSource: 'Foreign',
  //   currency: 'RMB',
  //   totalCost: 2500,
  //   supplier: 'Wuhan Beta Tech Company',
  //   status: 'Closed',
  // },
  // {
  //   refType: 'Bill',
  //   refId: '269-IE-FP-9-21',
  //   category: 'Spot Purchase',
  //   fulfillmentSource: 'Local',
  //   currency: 'PKR',
  //   totalCost: 500,
  //   supplier: 'E-Tech',
  //   status: 'Delivered',
  //   items: [ // 02 items in the PO
  //     {
  //       name: 'Screw',
  //       type: 'Standard',
  //       id: 'M 5 * 15',
  //       qty: 200,
  //       unitPrice: 45,
  //       remarks: '',
  //       specification: {
  //         // headType: 'Slot Head',
  //         // screwValues: 'M2 x 10',
  //         // material: 'SS A4',
  //       }
  //     },
  //     {
  //       name: 'Screw',
  //       type: 'Standard',
  //       id: 'M 5 * 25',
  //       qty: 200,
  //       unitPrice: 45,
  //       remarks: '',

  //     },
  //   ]
  // },
])
// Target: PO
export const fetchAllPO = async () => {
  const res = await httpParams('http://localhost:3000/api/po');
  const resJSON = await res.json();
  return poApollo(resJSON.data) // populating the state and returning at the same time ;) 
};
export const deletePOHandler = async (id) => {
  // Find target PO Index & Delete it
  let poState = [...poApollo()];

  const targetIndex = poApollo().findIndex(el => el.refId === id)
  const targetExists = targetIndex !== -1;
  const targetUUID = poState[targetIndex]._id
  if (targetExists) {

    // Database delete
    const res = await httpParams(
      'http://localhost:3000/api/po',
      'DELETE',
      { id: targetUUID }
    ); // res.data = Deleted Item 

    // State delete
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
      'http://localhost:3000/api/po',
      'POST',
      { data: newPOvalues }
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
  let poState = [...poApollo()]
  const targetIndex = poState.findIndex(el => el.refId === updatePOvalues.refId);
  const targetExists = targetIndex >= 0;

  if (targetExists) {
    // Database
    const res = await httpParams(
      'http://localhost:3000/api/po',
      'PATCH',
      {
        id: poState[targetIndex]._id,
        data: updatePOvalues
      }
    ); // res.data = updated PO
    const { data: updatedPO } = await res.json();// returns updated PO
    // Client Side
    poState.splice(targetIndex, 1, updatedPO)
  } else {
    console.log(`PO Id(${updatePOvalues.refId}) not found`)
  }

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
        'http://localhost:3000/api/po-item',
        'DELETE',
        {
          poId: targetParentUUID,
          itemId: targetUUID
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
          'http://localhost:3000/api/po-item',
          'POST',
          {
            poId: poState[targetParentIndex]._id,
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
        'http://localhost:3000/api/po-item',
        'PATCH',
        {
          poId: poState[targetParentIndex]._id,
          itemId: targetUUID,
          itemData: itemFormData
        }
      ); // res.data = updated Item
      const { data: updatedItem } = await res.json()
      // Client Side
      poState[targetParentIndex].items.splice(targetIndex, 1, updatedItem); // `&& poState` doesn't do anything hence commented
      poApollo(poState)

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
    const targetParentUUID = targetParent._id;

    if (targetParent) { // PO-itemId found ?
      // Update the PO item in the poState[idx].items slice and return the poState
      // Database
      const res = await httpParams(
        'http://localhost:3000/api/po-item-spec',
        'PATCH',
        {
          poId: targetParent2UUID,
          itemId: targetParentUUID,
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




