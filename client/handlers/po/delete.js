import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { poClientState } from "../../store/config";

export const deletePO = async (poDeleteId) => {
    // Find target PO Index & Delete it
    const poState = poClientState();
    const poStateList = [...poState.list];

    // 1. Database delete
    const PREFIX = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.LOCAL_URL
    const { success, data, error, message } = await requestAPI(
        {
            url: PREFIX + process.env.API.PO,
            method: 'DELETE',
            params: {
                poUUID: poDeleteId
            }
        }
    )

    if (!success) {
        console.error(error);
        return null;
    }
    console.log('message: ', message);

    // 2. Update State
    poClientState({
        fetched: poState.fetched,
        list: poStateList.filter(po => po.refId !== deletedPO.refId)
    });
};
