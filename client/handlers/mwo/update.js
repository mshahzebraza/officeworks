import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { mwoClientState } from "../../store/config";

export const updateMWO = async (formData) => {
    let wasClosed, isClosed = formData.status === 'Closed';

    const mwoState = mwoClientState();
    const mwoStateList = [...mwoState.list];

    const targetIndex = mwoStateList.findIndex(MWO => {
        return MWO.mwoId === formData.mwoId
    })
    wasClosed = mwoStateList[targetIndex].status === 'Closed';
    // Database
    const { success, data, error, message } = await requestAPI(
        {
            url: process.env.NEXT_PUBLIC_API_MWO,
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
    mwoStateList.splice(targetIndex, 1, data.updatedMWO)

    mwoClientState({
        fetched: mwoState.fetched,
        list: mwoStateList
    })
}
