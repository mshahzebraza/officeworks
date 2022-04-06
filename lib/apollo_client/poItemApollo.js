import { makeVar } from '@apollo/client'
import { deepClone, httpParams, request } from '../../helpers/reusable';
import poApollo from './poApollo';

const moduleApollo = makeVar([])
// Target: PO/POItem
export const deletePOitemHandler = async ([activePOid, itemDeleteId]) => {
     let poState = [...poApollo()];
     let moduleState = [...moduleApollo()];
     const activePOuuid = poState.find(po => po.refId === activePOid)?._id
     const activeModuleUUID = moduleState.find(module => module.id === itemDeleteId)?._id
     // 1. Database delete
     const { success, data, error, message } = await request(
          {
               url: process.env.API.MODULE,
               method: 'DELETE',
               params: {
                    poUUID: activePOuuid, // po.refId
                    moduleUUID: activeModuleUUID // item.id
               }
          }
     )

     // if deletion fails, return error
     if (!success) {
          console.error(error);
          return null;
     }
     console.log('message:', message);
     const { deletedModule, moduleSource } = data;
     console.log('deletedModule:', deletedModule);

     // 2. Client update

     const sourceIndex = poState.findIndex(
          po => po.refId === moduleSource.refId
     )
     const sourceLinkedModules = poState[sourceIndex].linkedModules
     console.log('sourceLinkedModules 1', sourceLinkedModules);
     sourceLinkedModules = sourceLinkedModules.filter(module => {
          console.log('filter map module', module);
          //if (module.item) return module.item !== deletedModule._id
          return module._id !== deletedModule._id
     });
     console.log('sourceLinkedModules 2', sourceLinkedModules);

     poState[sourceIndex].linkedModules = sourceLinkedModules;

     moduleState = moduleState.filter(module => module.id !== deletedModule.id);
     poApollo(poState)
     moduleApollo(moduleState)

}

export const addPOitemHandler = async ([activePOid, itemData]) => {
     console.log('addPOitemHandler data', itemData)

     let poState = [...poApollo()]
     let moduleState = [...moduleApollo()];

     console.log('poState', [...poState]);

     const activePOuuid = poState.find(po => po.refId === activePOid)?._id

     // find duplicate ID in current moduleList
     const existingModule = moduleState.find(module => module.id === itemData.id)


     { // find and fetch the existing module. and check if the module exists in current po
          // Search the pos and their linked modules for itemData.id matching module to spot existing modules
          // prompt confirmation to replace the data with the existing or to link with previous
          // const { existingModule, existsInActivePO } = poState.reduce((acc, po, poIdx) => {
          //      const existingModule = po.linkedModules.find(module => module.id === itemData.id)
          //      if (!!existingModule) {
          //           delete existingModule.qty;
          //           delete existingModule.unitPrice;
          //           delete existingModule.remarks;

          //           acc.existingModule = existingModule;
          //           if (activePOid === po.refId) acc.existsInActivePO = true;
          //      };
          //      return acc;
          // }, { existingModule: null, existsInActivePO: null })
     }



     // check and stop execution for existing module in same source
     if (!!existingModule) {

          const existsInActivePO = existingModule.linkedPOs?.includes(activePOuuid)

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
                    poUUID: activePOuuid,
                    // existingModule: !!existingModule, // TODO: server should automatically figure this out
                    // useExisting: !overrideExistingData
               },
               body: {
                    moduleData: itemData
               }
          }
     )
     // if creation fails, return error
     if (!success) {
          console.error(error);
          return null;
     }
     console.log('message:', message);

     console.log('data from server: ', data);
     const { createdModule, sourceModuleData } = data;
     delete createdModule.__v;

     // 2. Client update

     // update source (po) with source dependent & main module data
     const sourceIndex = poState.findIndex(
          po => po.refId === activePOid
     )
     const sourceLinkedModules = poState[sourceIndex].linkedModules
     sourceLinkedModules.push({
          item: createdModule._id,
          ...sourceModuleData
     });

     poState[sourceIndex].linkedModules = sourceLinkedModules;

     // add or concatenate the new module to the moduleState array (only for non-existing modules)
     // if exists and overrideExistingData is true then moduleState's matching module needs to link with current PO
     console.log('moduleState after addition would be', [...moduleState, createdModule]);
     moduleState = moduleState.length === 0 ? [createdModule] : [...moduleState, createdModule]

     console.log('poState: ', poState);
     poApollo(poState)
     moduleApollo(moduleState)

}

// ! should deal the existing module update case
export const updatePOitemHandler = async ([activePOid, itemData]) => {

     const poState = deepClone(poApollo())
     const moduleState = deepClone(moduleApollo());
     const activePOuuid = poState.find(po => po.refId === activePOid)?._id
     const activeModuleUUID = moduleState.find(module => module.id === itemData.id)?._id

     console.log('hitting updatePOitemHandler');


     // 1. Database update
     const { success, data, error, message } = await request(
          {
               url: process.env.API.MODULE,
               method: 'PATCH',
               params: {
                    poUUID: activePOuuid,
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

     const { updatedModule, sourceModuleData } = data;
     console.log('updatedModule: ', updatedModule);
     delete updatedModule.__v;

     // 2. Client update
     const sourceIndex = poState.findIndex(po => po.refId === activePOid)
     const sourceLinkedModules = poState[sourceIndex].linkedModules;
     console.log('sourceLinkedModules: ', [...sourceLinkedModules]);
     // find the index of the updated module
     const updatedModuleIndex = sourceLinkedModules.findIndex(module => module.item === updatedModule._id);
     sourceLinkedModules[updatedModuleIndex] = {
          ...updatedModule,
          ...sourceModuleData
     }
     poState[sourceIndex].linkedModules = sourceLinkedModules;


     console.assert(moduleState.length !== 0, 'moduleState must not be empty')
     const matchModuleIndex = moduleState.findIndex(module => module.id === updatedModule.id);
     console.assert(matchModuleIndex !== -1, 'matchModuleIndex must not be -1')
     moduleState[matchModuleIndex] = updatedModule;


     // moduleApollo(moduleState)
     poApollo(poState)


}
export const updatePOitemSpecHandler = async ([specFormData]) => {
     console.log('hitting updatePOitemSpecHandler');
     // Input: PO-refId, Item-Details & Specs
     const moduleState = deepClone(moduleApollo())
     const activeModuleIndex = moduleState.findIndex(module => module.id === specFormData.id);
     const activeModuleUUID = moduleState[activeModuleIndex]?._id;

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


     // find the module with the current linked-module Id and update the module state accordingly // ! WHY ??

     moduleState[activeModuleIndex] = updatedModule

     console.log('Apollo-moduleState: ', moduleState);
     // Client Side
     moduleApollo(moduleState)

}

export default moduleApollo;