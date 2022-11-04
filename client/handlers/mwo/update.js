import { requestAPI } from "../../helpers/refactored/requestAPI";



export const updateMWO = async (formData) => {
    let wasClosed, isClosed = formData.status === 'Closed';

    const mwoState = mwoClientState();
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


    mwoClientState({
        fetched: mwoState.fetched,
        list: mwoStateList
    })
}
