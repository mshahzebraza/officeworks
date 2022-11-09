import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { mwoClientState } from "../../store/config";

export const createMWO = async (formData) => {
    const mwoState = mwoClientState();
    const mwoStateList = [...mwoState.list];

    // 1. Database create
    const { success, data, error, message } = await requestAPI(
        {
            url: process.env.NEXT_PUBLIC_API_MWO,
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

    // Add MWO to MWOList
    mwoStateList.push(data.createdMWO)
    mwoClientState({
        fetched: mwoState.fetched,
        list: mwoStateList
    })

}
