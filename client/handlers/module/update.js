import { requestAPI } from '../../../helpers/refactored/requestAPI';
import { moduleClientState } from "../../store/config";

export const updateModule = async (itemData) => {
    // ?Ensure that the module ALREADY EXISTS in the module list
    // Edit the entry to the module list

    const moduleState = moduleClientState();
    const moduleStateList = [...moduleState.list];

    // find duplicate ID in current moduleList and stop execution if found
    const selectedModuleIndex = moduleStateList.findIndex(module => {

        console.log('module.id: ', module.id);
        return module.id === itemData.id
    })

    if (selectedModuleIndex === -1) {
        alert('No module found against the Id!.')
        return null
    }

    // 1. Database add
    const { success, data, error, message } = await requestAPI(
        {
            url: process.env.API.MODULE,
            method: 'PATCH',
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
    moduleStateList.splice(selectedModuleIndex, 1, data.updatedModule)


    moduleClientState({
        fetched: moduleState.fetched,
        list: moduleStateList
    })

}
