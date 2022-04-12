import { deepClone } from "./reusable";




export function updateFlexibleModuleSpecs(moduleSpecs, updateFormData = {}) {
     const permanentFields = [
          // Always present
          '_id',
          'id',
          'name',
          'linkedMWOs',
          'linkedPOs',
          'qty',
          'unitPrice',
          'remarks',
          // Present after specs-update
          'application',
          'type',
          // ? Flexible - we want to delete these and add then add the flexible fields from the form
          // 's1',
     ];

     for (const iterator in moduleSpecs) {
          // console.log('iterator: ', iterator);
          if (!permanentFields.includes(iterator)) {
               delete moduleSpecs[iterator];
          }
     }

     // Add the flexible fields from the form
     moduleSpecs = { ...moduleSpecs, ...updateFormData }

     return moduleSpecs;

}


// export a function named filterPOmoduleData & filterMWOmoduleData which returns the received data
/* 
  const formFieldsPOitem = {
    ? module specific
    id
    name
    application
    type
    
    ? source specific
    qty
    unitPrice
    remarks
  }
*/
// ? source-specific and independent module data
export const filterPOmoduleData = (data) => {
     // const { id, name, application, type, ...sourceData } = data;
     const { qty, unitPrice, remarks, ...moduleData } = data;

     return [
          moduleData,
          { qty, unitPrice, remarks },
     ];
}

/*
  const formFieldsMWO = {
    ? module specific
    TODO: Rename 'itemId' and 'itemName' to 'id' and 'name' respectively
    itemId
    itemName
    application
    type
    
    ? source specific
    mwoId
    qty
    status
    title
    remarks
  }

  ? const { id, name, type, application ...sourceDataPOitem } = formFieldsPOitem;
  ? const { itemId: id, itemName: name, type, application ...sourceDataMWO } = formFieldsMWO;

*/
export const filterMWOmoduleData = (data) => {
     // const { itemId: id, itemName: name, application, type, ...sourceData } = data;
     const { qty, remarks, ...moduleData } = data;

     return [
          moduleData,
          { qty, remarks }
     ];
}


// ? source-specific and independent module data
export const separateModuleAndSourceData = (data, sourceType = null) => {
     let sourceData = {};
     const { qty, unitPrice, remarks, ...moduleData } = data;

     if (sourceType === 'PO') {
          sourceData = { qty, unitPrice, remarks };
     } else if (sourceType === 'MWO') {
          sourceData = { qty, remarks };
     } else {
          return [moduleData, null];
     }

     return [
          moduleData,
          sourceData
     ];
}

export const sourceSpecificKeys = (sourceType = 'po') => {
     if (sourceType === 'po') return ['unitPrice', 'qty', 'remarks']
}



// takes in a list of POitems and returns a list of POitems with the linked modules populated
export function populateLinkedModules(linkedItemList, moduleList) {
     return linkedItemList.map((linkedModule) => {
          const { item: moduleRef, ...rest } = linkedModule;

          const matchingModule = deepClone(
               moduleList.find(module => {
                    return module._id === moduleRef
               })
          ) || {}
          // ? " || {} " was added to solve the problem of delay in state update. In the 1/2 of the state update, the empty module is returned to avoid the error and upon the 2/2 state update the logic runs again and fetches the matchingModule
          console.assert(matchingModule, 'MatchingModule is empty. Must Not Happen', matchingModule);

          delete matchingModule.linkedPOs;
          delete matchingModule.linkedMWOs;
          delete matchingModule.__v;

          return {
               ...matchingModule,
               ...rest,
          }

     })

}

