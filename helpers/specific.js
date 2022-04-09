import { deepClone } from "./reusable";

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
          { qty, unitPrice, remarks },
          moduleData,
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
          { qty, remarks },
          moduleData
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

