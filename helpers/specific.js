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

