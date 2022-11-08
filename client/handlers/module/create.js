import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { moduleClientState } from "../../store/config";

// Only for Modules-Page's Form Function
export const createModule = async (itemData) => {
    // ?Ensure that the module does not already exist in the module list
    // add another entry to the module list

    const moduleState = moduleClientState();
    const moduleStateList = [...moduleState.list];

    // find duplicate ID in current moduleList and stop execution if found
    const isDuplicate = moduleStateList.some(module => module.id === itemData.id)
    // if (Boolean(isDuplicate)) {
    //     alert('This module already exists in the moduleList. Cannot add duplicate module ID.')
    //     return null
    // }

    // 1. Database add
    const PREFIX = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.LOCAL_URL
    const { success, data, error, message } = await requestAPI(
        {
            url: PREFIX + process.env.API.MODULE,
            method: 'POST',
            body: {
                moduleData: itemData
            }
        }
    )

    {// if creation fails, return error
        if (!success) {
            console.error(error);
            return null;
        }
        console.log('message:', message);
    }

    // 2. Client update
    moduleStateList.push(data.createdModule)

    moduleClientState({
        fetched: moduleState.fetched,
        list: moduleStateList
    })

}
