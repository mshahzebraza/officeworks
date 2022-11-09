import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { poClientState } from "../../store/config";

// Note: There was a separate addPOmoduleHandler before the-great-cleansing
export const createPO = async (poCreateData) => {
    const poState = poClientState();
    const poStateList = [...poState.list];

    const { success, data, error, message } = await requestAPI(
        {
            url: process.env.NEXT_PUBLIC_API_PO,
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

    poStateList.push(data.createdPO);
    poClientState({
        fetched: poState.fetched,
        list: poStateList
    });

};

