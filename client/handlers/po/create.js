import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { poClientState } from "../../store/config";

// Note: There was a separate addPOmoduleHandler before the-great-cleansing
export const createPO = async (poCreateData) => {
    const poState = poClientState();
    const poStateList = [...poState.list];

    const PREFIX = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.LOCAL_URL
    const { success, data, error, message } = await requestAPI(
        {
            url: PREFIX + process.env.API.PO,
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
    poClientState({
        fetched: poState.fetched,
        list: poStateList
    });

};

