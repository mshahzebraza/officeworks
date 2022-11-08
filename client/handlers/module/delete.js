import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { moduleClientState } from "../../store/config";

export const deleteModule = async (selectedModuleUUID) => {
    // !Will all the purchases/MWO against the module be deleted ?
    // !What about the linked-parts in the project-part-lists ?

    // ?Ensure that the module ALREADY EXISTS in the module list
    // Delete the entry to the module list

    const moduleState = moduleClientState();
    const moduleStateList = [...moduleState.list];

    // find duplicate ID in current moduleList and stop execution if found
    const selectedModuleIndex = moduleStateList.findIndex(module => module._id === selectedModuleUUID)

    if (selectedModuleIndex === -1) {
        alert('No module found against the Id!.')
        return null
    }

    // ! Keep Record of linked Sources with the PO
    // ! And inform the user that all instances or linkages will be removed if the module id deleted

    // 1. Database add
    const PREFIX = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_VERCEL_URL : process.env.LOCAL_URL
    const { success, data, error, message } = await requestAPI(
        {
            url: PREFIX + process.env.API.MODULE,
            method: 'DELETE',
            params: {
                moduleUUID: selectedModuleUUID
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
    moduleStateList.splice(selectedModuleIndex, 1)


    moduleClientState({
        fetched: moduleState.fetched,
        list: moduleStateList
    })

}
