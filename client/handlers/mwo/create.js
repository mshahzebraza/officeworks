import { requestAPI } from "../../helpers/refactored/requestAPI";



export const createMWO = async (formData) => {
    const mwoState = mwoClientState();
    const mwoStateList = [...mwoState.list];

    // Check Duplicate
    const { success, data: { createdMWO }, error, message } = await request(
        {
            url: process.env.API.MWO,
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
