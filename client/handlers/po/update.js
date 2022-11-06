import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { poClientState } from "../../store/config";

export const updatePO = async (poUpdateData) => {
    const poState = poClientState()
    const poStateList = [...poState.list]

    const targetIndex = poStateList.findIndex(
        po => po.refId === poUpdateData.refId
    );

    // Create the request 
    const { success, data: { updatedPO }, error, message } = await requestAPI(
        {
            url: process.env.API.PO,
            method: 'PATCH',
            body: {
                poData: poUpdateData
            },
            params: {
                poUUID: poStateList[targetIndex]._id
            }
        }
    )

    if (!success) {
        console.error(error);
        return null;
    }
    console.log('message: ', message);

    // Update the PO
    poStateList[targetIndex] = updatedPO;
    console.log('updatedPO', updatedPO);

    poClientState({
        fetched: poState.fetched,
        list: poStateList
    });

}
