import { makeVar } from '@apollo/client'
import { checkDataType, httpParams, replaceLastCharacter, request } from '../../helpers/reusable';
import { addTxnHandler, mapPOtoTransaction } from './transactionApollo';

const poApollo = makeVar([])

export const deletePOHandler = async (poDeleteId) => {
     // Find target PO Index & Delete it
     let poState = [...poApollo()];

     // 1. Database delete
     const response = await request(
          {
               url: process.env.API.PO,
               method: 'DELETE',
               params: {
                    poUUID: poDeleteId
               }
          }
     )
     const { success, data: { deletedPO }, error, message } = response;

     if (!success) {
          console.error(error);
          return null;
     }
     console.log('message: ', message);

     // 2. Update State
     poState = poState.filter(po => po.refId !== deletedPO.refId)
     poApollo(poState);
};

export const addPOHandler = async (poCreateData) => {
     let poState = [...poApollo()]

     console.log('poCreateData', poCreateData);
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
     poState.push(createdPO);
     poApollo(poState);

};

export const updatePOHandler = async (poUpdateData) => {
     let poState = [...poApollo()]

     console.log('hitting updatePOHandler');

     let wasClosed, isClosed = poUpdateData.status === 'Closed';

     const targetIndex = poState.findIndex(
          po => po.refId === poUpdateData.refId
     );
     wasClosed = poState[targetIndex].status === 'Closed';

     // Create the request 
     const { success, data: { updatedPO }, error, message } = await request(
          {
               url: process.env.API.PO,
               method: 'PATCH',
               body: {
                    poData: poUpdateData
               },
               params: {
                    poUUID: poState[targetIndex]._id
               }
          }
     )

     if (!success) {
          console.error(error);
          return null;
     }
     console.log('message: ', message);

     // Update the PO
     poState[targetIndex] = updatedPO;

     // Update the Transaction
     if (!wasClosed && isClosed) {

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

     poApollo(poState);

}



export default poApollo;