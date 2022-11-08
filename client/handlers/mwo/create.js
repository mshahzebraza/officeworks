import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { mwoClientState } from "../../store/config";

export const createMWO = async (formData) => {
    const mwoState = mwoClientState();
    const mwoStateList = [...mwoState.list];

    // Check Duplicate
    const PREFIX = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.LOCAL_URL
    const { success, data, error, message } = await requestAPI(
        {
            url: PREFIX + process.env.API.MWO,
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
    mwoClientState({
        fetched: mwoState.fetched,
        list: mwoStateList
    })

}
