import { makeVar } from '@apollo/client'
import { deepClone, httpParams, request } from '../../helpers/reusable';
import { updateFlexibleModuleSpecs } from '../../helpers/specific';
import poApollo from './poApollo';

const moduleApollo = makeVar({
     list: [],
     fetched: false
})
// Target: PO/POItem
export const deletePOitemHandler = async ([activeSourceID, itemDeleteId]) => {

     const poState = poApollo();
     const moduleState = moduleApollo();
     const poStateList = [...poState.list];
     const moduleStateList = [...moduleState.list];

     const activeSourceIndex = poStateList.findIndex(po => po.refId === activeSourceID)
     const activeModuleIndex = moduleStateList.findIndex(module => module.id === itemDeleteId)
     if (activeSourceIndex === -1 || activeModuleIndex === -1) {
          console.error('Error: deletePOitemHandler: activeSourceIndex or activeModuleIndex is -1');
          return null;
     }
     const activeSource = poStateList[activeSourceIndex];
     const activeModule = moduleStateList[activeModuleIndex];
     const activeSourceUUID = activeSource._id
     const activeModuleUUID = activeModule._id


     // 1. Database delete
     const { success, data, error, message } = await request(
          {
               url: process.env.API.MODULE,
               method: 'DELETE',
               params: {
                    poUUID: activeSourceUUID, // po.refId
                    moduleUUID: activeModuleUUID // item.id
               }
          }
     )

     { // if deletion fails, return error
          if (!success) {
               console.error(error);
               return null;
          }
          console.log('message:', message);
     }
     const { deletedModule, moduleSource } = data;
     // 2. Client update
     { // Update the source state (unlink - already done in the server, so just replace the data in the state with server's)
          poStateList[activeSourceIndex] = moduleSource
     }
     { // Update the module state (Delete or unlink)
          // ? Exclusive means that "it contains other po refs beside the current po ref in the linkedPOs"
          // Exclusive: delete the module altogether
          // Not Exclusive: unlink the module from the linkedPO

          // Stop execution if the module to be removed is not 
          //// linked to any other modules 
          //
          if (!activeModule.linkedPOs.includes(moduleSource._id)) {
               console.error('Not Possible: Module target is not linked to current PO. Returning null');
               return null;
          }

          // ! Exclusivity of module must be based on linked MWOs as well
          //? if the module is now linked to only the 01 PO, which is the current PO && there is no linkedMWOs, then it is the last instance of the module
          const isLastInstance =
               activeModule.linkedPOs.length === 1
               && activeModule.linkedPOs[0] === activeSourceUUID
               && activeModule.linkedMWOs.length === 0;

          if (isLastInstance) {
               moduleStateList.splice(activeModuleIndex, 1);

          } else {
               moduleStateList.splice(activeModuleIndex, 1, deletedModule);
          }

     }


     { // Update the apollo state
          poApollo({
               fetched: poState.fetched,
               list: poStateList
          })
          moduleApollo({
               fetched: moduleState.fetched,
               list: moduleStateList
          })
     }

}

export const addPOitemHandler = async ([activeSourceID, itemData]) => {
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


     // check and stop execution for existing module in same source
     if (existingModuleIndex !== -1) {
          const existingModule = moduleStateList[existingModuleIndex]
          console.log('hitting existing module');
          const existsInActivePO = existingModule.linkedPOs?.includes(activeSourceUUID)

          if (!!existsInActivePO) {
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
     {// 2. Client update
          // * Updating the whole source is a bit expensive than updating the exact linkedModule
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

export const updatePOitemHandler = async ([activeSourceID, itemData]) => {

     const poState = poApollo();
     const moduleState = moduleApollo();
     const poStateList = [...poState.list]
     const moduleStateList = [...moduleState.list]

     const activeSourceIndex = poStateList.findIndex(po => po.refId === activeSourceID);
     const activeModuleIndex = moduleStateList.findIndex(module => module.id === itemData.id);

     if (activeModuleIndex === -1 || activeSourceIndex === -1) {
          console.error('Module or source not found. Returning null');
          return null;
     }

     const activeSource = poStateList[activeSourceIndex];
     const activeModule = moduleStateList[activeModuleIndex];
     const activeSourceUUID = activeSource._id;
     const activeModuleUUID = activeModule._id;


     // 1. Database update
     const { success, data, error, message } = await request(
          {
               url: process.env.API.MODULE,
               method: 'PATCH',
               params: {
                    poUUID: activeSourceUUID,
                    moduleUUID: activeModuleUUID
               },
               body: {
                    moduleData: itemData
               }

          }
     )

     // if update fails, return error
     if (!success) {
          console.error(error);
          return null;
     }
     console.log('message:', message);

     // * Using the sourceModuleData to update the source state, is better for performance but means more code
     const { updatedModule, sourceModuleData, moduleSource } = data;
     delete updatedModule.__v;

     // 2. Client update

     // TODO: replace the activeSource with the moduleSource
     poStateList[activeSourceIndex] = moduleSource;


     console.assert(moduleStateList.length !== 0, 'moduleStateList must not be empty')
     const matchModuleIndex = moduleStateList.findIndex(module => module.id === updatedModule.id);
     console.assert(matchModuleIndex !== -1, 'matchingModule not found!')
     moduleStateList[matchModuleIndex] = updatedModule;


     poApollo({
          fetched: poState.fetched,
          list: poStateList
     })
     moduleApollo({
          fetched: moduleState.fetched,
          list: moduleStateList
     })


}

// ! THE CODE IS NOT LINKED WITH POS, SO Make it generic and use it for MWOs as well
export const updateItemSpecHandler = async ([specFormData]) => {
     const moduleState = moduleApollo()
     const moduleStateList = [...moduleState.list]
     const activeModuleIndex = moduleStateList.findIndex(module => module.id === specFormData.id);
     const activeModuleUUID = moduleStateList[activeModuleIndex]?._id;

     // Database
     const { success, data, error, message } = await request(
          {
               url: process.env.API.MODULE,
               method: 'PATCH',
               params: {
                    moduleUUID: activeModuleUUID
               },
               body: {
                    moduleData: specFormData
               },
          }
     )
     if (!success) {
          console.error(error);
          return null;
     }

     console.log('message: ', message);
     const { updatedModule } = data;
     delete updatedModule.__v;

     // find the module with the current linked-module Id and update the module state accordingly
     moduleStateList[activeModuleIndex] = updatedModule

     // Client Side
     moduleApollo({
          fetched: moduleState.fetched,
          list: moduleStateList
     })

}

export default moduleApollo;