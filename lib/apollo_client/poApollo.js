import { makeVar } from '@apollo/client'
import { checkDataType, replaceLastCharacter } from '../../helpers/reusable';
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

export const fetchAllPO = async () => {
  const res = await fetch('http://localhost:3000/api/po');
  const resJSON = await res.json();
  return poApollo(resJSON.data)
};



// Target: PO
export const deletePOHandler = async (id) => {
  // Find target PO Index & Delete it

  const deleteTargetIndex = poApollo().findIndex(el => el.refId === id)
  // const targetExists = deleteTargetIndex >= 0;
  if (deleteTargetIndex != -1) {
    let duplicateArr = [...poApollo()];

    // State delete
    const [target] = duplicateArr.splice(deleteTargetIndex, 1);
    // Database delete
    const res = await fetch('http://localhost:3000/api/po', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json' // the request won't work without specifying headers
      },
      body: JSON.stringify({ id: target._id })
    });
    const resJSON = await res.json();// returns deleted PO
    poApollo(duplicateArr);
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
    // Client Side
    poState.push(newPOvalues)
    // Database
    const res = await fetch('http://localhost:3000/api/po', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // the request won't work without specifying headers
      },
      body: JSON.stringify({ data: newPOvalues })
    });
    const resJSON = await res.json();// returns added PO
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
    // Client Side
    poState.splice(targetIndex, 1, updatePOvalues)
    // Database
    const res = await fetch('http://localhost:3000/api/po', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' // the request won't work without specifying headers
      },
      body: JSON.stringify({
        id: poState[targetIndex]._id,
        data: updatePOvalues
      })
    });
    const resJSON = await res.json();// returns updated PO
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

  if (targetParentExists) { // PO-refId found ?
    const targetIndex = poState[targetParentIndex].items.findIndex((el, elIdx) => elIdx === dataIndex)
    const targetExists = targetIndex >= 0;

    if (targetExists) {
      // Client Side
      const [target] = poState[targetParentIndex].items.splice(targetIndex, 1);
      console.log('ss', target);
      // Database
      // const res = await fetch('http://localhost:3000/api/po', {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json' // the request won't work without specifying headers
      //   },
      //   body: JSON.stringify({
      //     id: poState[targetIndex]._id,
      //     data: updatePOvalues
      //   })
      // });
      // const resJSON = await res.json();// returns deleted PO item
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
export const updatePOitemHandler = async ([activePOid, itemFormData, oldItemSpecs]) => {
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
export const updatePOitemSpecHandler = async ([activePOid, activeItemIndex, specFormData]) => {
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




