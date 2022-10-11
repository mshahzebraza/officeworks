import { makeVar } from "@apollo/client";
import { request } from "../../helpers/reusable";
import { addTxnHandler, mapMWOtoTransaction } from "./transactionApollo";

const mwoApollo = makeVar({
    fetched: false,
    list: [],
})



export const deleteMWOHandler = async (deleteMWOid) => {

    const mwoState = mwoApollo();
    const mwoStateList = [...mwoState.list];

    // 1. Database delete
    const { success, data: { deletedMWO }, error, message } = await request(
        {
            url: process.env.API.MWO,
            method: 'DELETE',
            params: {
                mwoUUID: deleteMWOid
            }
        }
    )

    if (!success) {
        console.error(error);
        return null;
    }
    console.log('message: ', message);

    // 2. Update State
    mwoApollo({
        fetched: mwoState.fetched,
        list: mwoStateList.filter(po => po.mwoId !== deletedMWO.mwoId)
    })
}

export const addMWOHandler = async (formData) => {
    const mwoState = mwoApollo();
    const mwoStateList = [...mwoState.list];

    // Check Duplicate
    const { success, data: { createdMWO }, error, message } = await request(
        {
            url: process.env.API.MWO,
            method: 'POST',
            body: {
                mwoData: formData
            }
        }
    )

    if (!success) {
        console.error(error);
        return null;
    }
    console.log('message: ', message);
    delete createdMWO.__v;

    // Add MWO to MWOList
    mwoStateList.push(createdMWO)
    mwoApollo({
        fetched: mwoState.fetched,
        list: mwoStateList
    })

}

export const updateMWOHandler = async (formData) => {
    let wasClosed, isClosed = formData.status === 'Closed';

    const mwoState = mwoApollo();
    const mwoStateList = [...mwoState.list];

    const targetIndex = mwoStateList.findIndex(MWO => {
        return MWO.mwoId === formData.mwoId
    })
    wasClosed = mwoStateList[targetIndex].status === 'Closed';
    // Database
    const { success, data: { updatedMWO }, error, message } = await request(
        {
            url: process.env.API.MWO,
            method: 'PATCH',
            params: {
                mwoUUID: mwoStateList[targetIndex]._id
            },
            body: {
                mwoData: formData
            }
        }
    )

    if (!success) {
        console.error(error);
        return null;
    }
    console.log('message: ', message);

    // State
    mwoStateList.splice(targetIndex, 1, updatedMWO)
    console.log('updatedMWO', updatedMWO);


    if (isClosed && !wasClosed) {

        const txnList = updatedMWO.items.map(
            // We could ofcourse pass in entire updatedMWO but SoC is better
            (item, idx) => mapMWOtoTransaction(
                item,
                idx,
                updatedMWO?.mwoId, // mwoId
            )
        )
        addTxnHandler(txnList)
    }

    mwoApollo({
        fetched: mwoState.fetched,
        list: mwoStateList
    })
}

export default mwoApollo;


