import { makeVar } from "@apollo/client";
import { httpParams, request } from "../../helpers/reusable";
import { addTxnHandler, mapMWOtoTransaction } from "./transactionApollo";

const mwoApollo = makeVar([])



export const deleteMWOHandler = async (deleteMWOid) => {
  let mwoState = [...mwoApollo()];

  const targetIndex = mwoState.findIndex(mwo => mwo.mwoId === deleteMWOid)
  const mwoUUID = mwoState[targetIndex]._id

  // delete - DB
  const response = await request(
    {
      url: process.env.API.MWO,
      method: 'DELETE',
      params: {
        mwoUUID: mwoUUID
      }
    }
  )

  // delete - state
  mwoState.splice(targetIndex, 1)

  mwoApollo(mwoState)

}

export const addMWOHandler = async (formData) => {
  let mwoState = [...mwoApollo()];
  // Check Duplicate
  const response = await request(
    {
      url: process.env.API.MWO,
      method: 'POST',
      body: {
        mwoData: formData
      }
    }
  )
  const { data: addedMWO } = response

  // Add MWO to MWOList
  mwoState.push(addedMWO)
  mwoApollo(mwoState)

}

export const updateMWOHandler = async (formData) => {
  let wasClosed, isClosed = formData.status === 'Closed';

  let mwoState = [...mwoApollo()];
  const targetIndex = mwoState.findIndex(MWO => {
    return MWO.mwoId === formData.mwoId
  })
  const targetUUID = mwoState[targetIndex]._id

  wasClosed = mwoState[targetIndex].status === 'Closed';
  // Database
  const response = await request(
    {
      url: process.env.API.MWO,
      method: 'PATCH',
      params: {
        mwoUUID: targetUUID
      },
      body: {
        mwoData: formData
      }
    }
  )

  const { data: updatedMWO } = response;

  // State
  mwoState.splice(targetIndex, 1, updatedMWO)
  mwoApollo(mwoState)

  if (isClosed && !wasClosed) {
    const txnData = mapMWOtoTransaction(updatedMWO)
    addTxnHandler(txnData)
  }


}

export default mwoApollo;


