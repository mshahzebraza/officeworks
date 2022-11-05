import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { mwoClientState } from "../../store/config";

export const deleteMWO = async (deleteMWOid) => {

    const mwoState = mwoClientState();
    const mwoStateList = [...mwoState.list];

    // 1. Database delete
    const { success, data: { deletedMWO }, error, message } = await requestAPI(
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
    mwoClientState({
        fetched: mwoState.fetched,
        list: mwoStateList.filter(po => po.mwoId !== deletedMWO.mwoId)
    })
}