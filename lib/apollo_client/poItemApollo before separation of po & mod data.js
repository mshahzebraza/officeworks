import { httpParams, request } from '../../helpers/reusable';
import poApollo from './poApollo';
import { makeVar } from '@apollo/client'

const moduleApollo = makeVar([])


// Target: PO

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
     // const { success, data, error, message } = response;

     // if deletion fails, return error
     if (!success) {
          console.error(error);
          return null;
     }
     console.log('message:', message);
     const { deletedModule, moduleSource } = data;

     // 2. Client update

     const sourceIndex = poState.findIndex(
          po => po.refId === moduleSource.refId
     )
     const sourceLinkedModules = poState[sourceIndex].linkedModules
     sourceLinkedModules = sourceLinkedModules.filter(module => module.id !== deletedModule.id);

     poState[sourceIndex].linkedModules = sourceLinkedModules;

     moduleState = moduleState.filter(module => module.id !== deletedModule.id);
     poApollo(poState)
     moduleApollo(moduleState)

}

export const addPOitemHandler = async ([activePOid, itemData]) => {
     let overrideExistingData = null;
     console.log('addPOitemHandler data', itemData)

     let poState = [...poApollo()]
     let moduleState = [...moduleApollo()];
     const activePOuuid = poState.find(po => po.refId === activePOid)?._id



     // Search the pos and their linked modules for itemData.id matching module to spot existing modules
     // prompt confirmation to replace the data with the existing or to link with previous
     const { existingModule, existsInActivePO } = poState.reduce((acc, po, poIdx) => {
          const existingModule = po.linkedModules.find(module => module.id === itemData.id)
          if (!!existingModule) {
               delete existingModule.qty;
               delete existingModule.unitPrice;
               delete existingModule.remarks;

               acc.existingModule = existingModule;
               if (activePOid === po.refId) acc.existsInActivePO = true;
          };
          return acc;
     }, { existingModule: null, existsInActivePO: null })

     // TODO: This block may also not be needed. Or may be it is needed.
     if (!!existsInActivePO) {
          alert('This module already exists in the active PO. Please use a different id or update the existing entry?')
          return null
     }

     // TODO: Check if the block is needed. It may have been replaced by the check in the form component already
     if (!!existingModule) {
          const warnInput = window.confirm('Existing Module detected! Continue?')
          if (!warnInput) return null;

          // TODO: No replacement needed if the module data is entered
          overrideExistingData = window.confirm('Confirm: Replace the existing module\'s specification with the new data! OR \nCancel: Use the existing module\'s specification ')

          // ! why don't we let the server handle the replacement code for both cases of existing module
          if (!overrideExistingData) { // ? = useExisting
               delete existingModule.qty;
               delete existingModule.unitPrice;
               delete existingModule.remarks;
               itemData = {
                    ...itemData,
                    ...existingModule
               }
               console.log('Existing Module(replaces new module data) + New PO Data', itemData)


          } else { // ? =  useIncoming
               // TODO: wait for createdModule to be returned from the server and replace the existing with incoming module data
               console.log('New Module + New Data overrides all the existing POs', itemData)
          }

          // * ISSUE: It may be the case that user is already entering the data in accordance with the existing module. To handle this, we should check the difference in data before even asking the user
          // TODO: Aim is to let the backend decide if the module is to be replaced or added to the existing PO or just thrown away (if it exists in same PO)
          // ISSUE: But BE has no away of asking the user about the decision choice
          //? useExisting: BE should
          //   expect : itemData (incoming), useExisting(true)
          //   do : find the matching module in moduleList, ref. the matching module's id in the po/mwo & add the source-specific data to po as well
          //   return : createdModule(existing module-specific data), sourceModuleData (incoming source-specific data)
          //? useIncoming: BE should
          //   expect : itemData (incoming), useExisting(false)
          //   do : 
          //   return : 

          return null;
     }

     // 1. Database add
     const { success, data, error, message } = await request(
          {
               url: process.env.API.MODULE,
               method: 'POST',
               params: {
                    poUUID: activePOuuid,
                    existingModule: !!existingModule,
                    useExisting: !overrideExistingData
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

     const { createdModule, sourceModuleData } = data;
     delete createdModule.__v;

     // 2. Client update

     // if the module exists already then
     // search the pos and their linked Modules for the existing module id and replace that with the new one as well

     if (overrideExistingData) {
          // by default is null & can only be true if existingModule is true
          // for a false value, the code is same as a non-existing new module
     }

     if (!!existingModule) {
          //overrideExistingData is true
          // if module exists and is to override existing data then


          //overrideExistingData is false
          // if module exists but is to be replaced with existing data then

     }
     else {

     }

     // update source (po) with source dependent & main module data
     const sourceIndex = poState.findIndex(
          po => po.refId === activePOid
     )
     const sourceLinkedModules = poState[sourceIndex].linkedModules
     sourceLinkedModules.push({
          ...createdModule,
          ...sourceModuleData
     });

     poState[sourceIndex].linkedModules = sourceLinkedModules;

     // add or concatenate the new module to the moduleState array (only for non-existing modules)
     // if exists and overrideExistingData is true then moduleState's matching module needs to link with current PO
     moduleState = moduleState.length === 0 ? [createdModule] : [...moduleState, createdModule]

     console.log('poState: ', poState);
     poApollo(poState)
     moduleApollo(moduleState)

}


// ! should deal the existing module update case
export const updatePOitemHandler = async ([activePOid, itemData]) => {
     const poState = [...poApollo()]
     const moduleState = [...moduleApollo()];
     const activePOuuid = poState.find(po => po.refId === activePOid)?._id
     const activeModuleUUID = moduleState.find(module => module.id === itemData.id)?._id

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
     // const { success, data, error, message } = response;

     // if update fails, return error
     if (!success) {
          console.error(error);
          return null;
     }
     console.log('message:', message);

     const { updatedModule, sourceModuleData } = data;
     delete updatedModule.__v;

     // 2. Client update
     const sourceIndex = poState.findIndex(po => po.refId === activePOid)
     const sourceLinkedModules = poState[sourceIndex].linkedModules;
     // find the index of the updated module
     const updatedModuleIndex = sourceLinkedModules.findIndex(module => module.id === updatedModule.id);
     sourceLinkedModules[updatedModuleIndex] = {
          ...updatedModule,
          ...sourceModuleData
     }
     poState[sourceIndex].linkedModules


     console.assert(moduleState.length !== 0, 'moduleState must not be empty')
     const matchModuleIndex = moduleState.findIndex(module => module.id === updatedModule.id);
     console.assert(matchModuleIndex !== -1, 'matchModuleIndex must not be -1')
     moduleState[matchModuleIndex] = updatedModule;


     moduleApollo(moduleState)
     poApollo(poState)


}




export default moduleApollo;