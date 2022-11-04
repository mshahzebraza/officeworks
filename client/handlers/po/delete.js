import { requestAPI } from '../../helpers/refactored/requestAPI';

export const deletePO = async (poDeleteId) => {
    // Find target PO Index & Delete it
    const poState = poClientState();
    const poStateList = [...poState.list];

    // 1. Database delete
    const { success, data: { deletedPO }, error, message } = await request(
        {
            url: process.env.API.PO,
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
