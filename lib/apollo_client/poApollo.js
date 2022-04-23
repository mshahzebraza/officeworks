import { makeVar } from '@apollo/client'
import { checkDataType, deepClone, httpParams, replaceLastCharacter, request } from '../../helpers/reusable';
import { addTxnHandler, mapPOtoTransaction } from './transactionApollo';

// const poApollo = makeVar([])
const poApollo = makeVar({
     fetched: false,
     list: [],
})

export const deletePOHandler = async (poDeleteId) => {
     // Find target PO Index & Delete it
     const poState = poApollo();
     const poStateList = [...poState.list];

     // 1. Database delete
     const { success, data: { deletedPO }, error, message } = await request(
          {
               url: process.env.API.PO,
               method: 'DELETE',
               params: {
                    poUUID: poDeleteId
               }
          }
     )

     if (!success) {
          console.error(error);
          return null;
     }
     console.log('message: ', message);

     // 2. Update State
     poApollo({
          fetched: poState.fetched,
          list: poStateList.filter(po => po.refId !== deletedPO.refId)
     });
};

export const addPOHandler = async (poCreateData) => {
     const poState = poApollo();
     const poStateList = [...poState.list];

     const { success, data: { createdPO }, error, message } = await request(
          {
               url: process.env.API.PO,
               method: 'POST',
               body: {
                    poData: poCreateData
               }
          }
     )

     if (!success) {
          console.error(error);
          return null;
     }
     console.log('message: ', message);
     delete createdPO.__v;

     poStateList.push(createdPO);
     poApollo({
          fetched: poState.fetched,
          list: poStateList
     });

};

export const updatePOHandler = async (poUpdateData) => {
     let wasClosed, isClosed = poUpdateData.status === 'Closed';

     const poState = poApollo()
     const poStateList = [...poState.list]

     const targetIndex = poStateList.findIndex(
          po => po.refId === poUpdateData.refId
     );
     wasClosed = poStateList[targetIndex].status === 'Closed';

     // Create the request 
     const { success, data: { updatedPO }, error, message } = await request(
          {
               url: process.env.API.PO,
               method: 'PATCH',
               body: {
                    poData: poUpdateData
               },
               params: {
                    poUUID: poStateList[targetIndex]._id
               }
          }
     )

     if (!success) {
          console.error(error);
          return null;
     }
     console.log('message: ', message);

     // Update the PO
     poStateList[targetIndex] = updatedPO;

     // Update the Transaction
     if (isClosed && !wasClosed) {

          // convert each of the po's items to a transaction
          const txnList = updatedPO.items.map(
               (item, idx, items) => mapPOtoTransaction(
                    item,
                    idx,
                    items.length,
                    updatedPO?.refType, // refType
                    updatedPO?.refId, // refId
                    updatedPO?.supplier // supplier
               )
          )
          addTxnHandler(txnList, true);
     }

     poApollo({
          fetched: poState.fetched,
          list: poStateList
     });

}



export default poApollo;