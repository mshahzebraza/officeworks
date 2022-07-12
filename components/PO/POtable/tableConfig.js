import { tableIcons } from "../../../constants/tableIcons"
import { columns } from "./fieldConfig"
import { data } from "./tableData"



// ? Adding the icons automatically create icons for each action
const editableOptions = {
    onRowAdd: (addedData) => new Promise((resolve, reject) => {
        setTimeout(() => { console.log('addedData', addedData); resolve(); }, 600);
    }),
    // ? onRowDelete provides tableData object as well
    // ? tableData.editing is undefined after promise is resolved but a boolean before that. So, we can use it to check if the row is being edited or deleted
    onRowDelete: (deletedRow) => new Promise((resolve, reject) => {
        setTimeout(() => { console.log('deletedRow', deletedRow); resolve(); }, 600);
    }),
    onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
        setTimeout(() => { console.log('newData', newData, 'oldData', oldData); resolve(); }, 600);
    }),
    onBulkUpdate: (updatedRows) => new Promise((resolve, reject) => {
        setTimeout(() => { console.log('updatedRows', updatedRows); resolve(); }, 600);
    }),

}




export const tableOptions = {
    // Set by Default
    paging: true,
    search: true,
    filtering: false,

    // Set by User
    exportButton: true,
    actionsColumnIndex: -1, //? to position the actions column to the right
    addRowPosition: 'first', // | 'last' //? to add new rows to the top 
}



export const tableConfig = {
    title: 'Some Table',
    data,
    columns,
    options: tableOptions,
    editable: editableOptions,
}