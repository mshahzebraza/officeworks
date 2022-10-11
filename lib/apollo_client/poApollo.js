import { makeVar } from '@apollo/client'
import { request } from '../../helpers/reusable';
import { addTxnHandler, mapPOtoTransaction } from './transactionApollo';

// const poApollo = makeVar([])
const poApollo = makeVar({
    fetched: false,
    list: [],
})

export const deletePOHandler = async (poDeleteId) => {
    // Find target PO Index & Delete it
    const poState = poApollo();
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
    poApollo({
        fetched: poState.fetched,
        list: poStateList.filter(po => po.refId !== deletedPO.refId)
    });
};

export const addPOHandler = async (poCreateData) => {
    const poState = poApollo();
    const poStateList = [...poState.list];

    const { success, data: { createdPO }, error, message } = await request(
        {
            url: process.env.API.PO,
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
    poApollo({
        fetched: poState.fetched,
        list: poStateList
    });

};

export const addPOmoduleHandler = async ([activeSourceID, itemData]) => {
    // TODO: update the fetch property of the states

    const poState = poApollo()
    const moduleState = moduleApollo()
    const poStateList = [...poState.list]
    const moduleStateList = [...moduleState.list]


    const activeSourceIndex = poStateList.findIndex(po => po.refId === activeSourceID)
    if (activeSourceIndex === -1) {
        console.error('Error: addPOitemHandler: activeSourceIndex is -1');
        return null;
    }
    const activeSource = poStateList[activeSourceIndex]
    const activeSourceUUID = activeSource._id

    // find duplicate ID in current moduleList
    const existingModuleIndex = moduleStateList.findIndex(module => module.id === itemData.id)


    if (existingModuleIndex !== -1) {
        const existingModule = moduleStateList[existingModuleIndex]
        console.log('hitting existing module');
        const duplicateExists = existingModule.linkedPOs?.includes(activeSourceUUID)

        // check and stop execution for existing module in same source
        if (!!duplicateExists) {
            alert('This module already exists in the active PO. Cannot add duplicate in the same PO.')
            return null
        }
        // if duplicate module found, then ask user to confirm if they want to proceed
        const confirmSubmission = window.confirm(`Id matches an existing module. name: "${itemData.name}" will be replaced with "${existingModule.name}"
          \nContinue?`)
        if (!confirmSubmission) return null // if user clicks cancel, then stop the form submission
    }

    // 1. Database add
    const { success, data, error, message } = await request(
        {
            url: process.env.API.MODULE,
            method: 'POST',
            params: {
                poUUID: activeSourceUUID,
                // existingModule: !!existingModule, // TODO: server should automatically figure this out
                // useExisting: !overrideExistingData
            },
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

    // * Using the sourceModuleData to update the source state, is better for performance but means more code
    const { createdModule, sourceModuleData, moduleSource } = data;
    delete createdModule.__v;
    {
        // 2. Client update
        // * Updating the whole source is a bit expensive than updating the exact item
        // update source (po) with source dependent & main module data
        poStateList[activeSourceIndex] = moduleSource;
        // add/replace the new/update module to the moduleList
        (existingModuleIndex !== -1) // replace if existing module found, otherwise concatenate
            ? moduleStateList.splice(existingModuleIndex, 1, createdModule)
            : moduleStateList.push(createdModule)
    }

    { //TODO: Got to find a way to update both the states at cost of one re-render only
        moduleApollo({
            fetched: moduleState.fetched,
            list: moduleStateList
        })

        poApollo({
            fetched: poState.fetched,
            list: poStateList
        })
    }

}
export const updatePOHandler = async (poUpdateData) => {
    let wasClosed, isClosed = poUpdateData.status === 'Closed';

    const poState = poApollo()
    const poStateList = [...poState.list]

    const targetIndex = poStateList.findIndex(
        po => po.refId === poUpdateData.refId
    );
    wasClosed = poStateList[targetIndex].status === 'Closed';

    // Create the request 
    const { success, data: { updatedPO }, error, message } = await request(
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
    // Update the Transaction
    if (isClosed && !wasClosed) {

        // convert each of the po's items to a transaction
        // check if items prop exists in the data
        const txnList = updatedPO.items.map(
            // We could ofcourse pass in entire updatedPO but SoC is better
            (item, idx) => mapPOtoTransaction(
                item,
                idx,
                updatedPO?.refType, // refType
                updatedPO?.refId, // refId
                updatedPO?.supplier // supplier
            )
        )
        addTxnHandler(txnList);
    }

    poApollo({
        fetched: poState.fetched,
        list: poStateList
    });

}



export default poApollo;


