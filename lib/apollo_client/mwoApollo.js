import { makeVar } from "@apollo/client";
import { httpParams } from "../../helpers/reusable";
import { addTxnHandler, mapMWOtoTransaction } from "./transactionApollo";

const mwoApollo = makeVar([])



export const deleteMWOHandler = async (deleteMWOid) => {
  let mwoState = [...mwoApollo()];

  const targetIndex = mwoState.findIndex(mwo => mwo.mwoId === deleteMWOid)
  const mwoUUID = mwoState[targetIndex]._id

  // delete - DB
  const res = await httpParams(
    process.env.API.MWO, // 'http://localhost:3000/api/mwo',
    'DELETE',
    { mwoUUID }
  )
  await res.json()

  // delete - state
  mwoState.splice(targetIndex, 1)

  mwoApollo(mwoState)

}

export const addMWOHandler = async (formData) => {
  let mwoState = [...mwoApollo()];
  // Check Duplicate
  const res = await httpParams(
    process.env.API.MWO, // 'http://localhost:3000/api/mwo',
    "POST",
    { mwoData: formData }
  )
  const { data: addedMWO } = await res.json()
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
  const res = await httpParams(
    process.env.API.MWO, // 'http://localhost:3000/api/mwo',
    "PATCH",
    {
      mwoUUID: targetUUID,
      mwoData: formData
    }
  )
  const { data: updatedMWO } = await res.json()

  // State
  mwoState.splice(targetIndex, 1, updatedMWO)
  mwoApollo(mwoState)

  if (isClosed && !wasClosed) {
    const txnData = mapMWOtoTransaction(updatedMWO)
    addTxnHandler(txnData)
  }


}

export default mwoApollo;


