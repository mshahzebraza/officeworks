export const editableOptions = {
    // onRowAdd: (addedData) => new Promise((resolve, reject) => {
    //     setTimeout(() => { console.log('addedData', addedData); resolve(); }, 600);
    // }),
    // ? onRowDelete provides tableData object as well
    // ? tableData.editing is undefined after promise is resolved but a boolean before that. So, we can use it to check if the row is being edited or deleted
    // onRowDelete: (deletedRow) => new Promise((resolve, reject) => {
    //     setTimeout(() => { console.log('deletedRow', deletedRow); resolve(); }, 600);
    // }),
    // onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
    //     setTimeout(() => { console.log('newData', newData, 'oldData', oldData); resolve(); }, 600);
    // }),


    // onBulkUpdate: (updatedRows) => new Promise((resolve, reject) => {
    //     setTimeout(() => { console.log('updatedRows', updatedRows); resolve(); }, 600);
    // }),
    // isDeleteHidden: (rowData) => rowData.id === 1,
    // isDeletable: (rowData) => rowData.id !== 2,
    // isEditHidden: (rowData) => rowData.id === 3,
    // onRowAddCancelled: (rowData) => console.log('Row adding cancelled'),
    // onRowUpdateCancelled: (rowData) => console.log('Row editing cancelled'),


}