import { tableIcons } from "../../../constants/tableIcons"
import { columns } from "./fieldConfig"
import { data } from "./tableData"
import { MTableAction, MTableActions } from 'material-table'
import RowOverlay from "../../customMUI/tableComponents/RowOverlay"
import { Switch } from "@mui/material"


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
    isDeleteHidden: (rowData) => rowData.id === 1,
    isDeletable: (rowData) => rowData.id !== 2,
    isEditHidden: (rowData) => rowData.id === 3,
    onRowAddCancelled: (rowData) => console.log('Row adding cancelled'),
    onRowUpdateCancelled: (rowData) => console.log('Row editing cancelled'),


}
const customActions = [
    {
        icon: tableIcons.Details,
        tooltip: 'Go To Purchase Details',
        onClick: (event, rowData) => alert(rowData)
    },
    {
        icon: tableIcons.Summary,
        tooltip: 'View Summary',
        onClick: (event, rowData) => console.log(rowData)
    },
    {
        icon: () => <Switch />,
        tooltip: 'Theme Switch',
        onClick: (event, rowData) => console.log(rowData),
        isFreeAction: true,
    }
]

const componentOverrides = {
    // Row: RowOverlay,

}



export const tableOptions = {
    // Set to Default Values
    paging: true,
    search: true,
    filtering: false,

    // Set Other than default
    exportButton: true,
    actionsColumnIndex: -1, //? to position the actions column to the right
    addRowPosition: 'first', // | 'last' //? to add new rows to the top 
    grouping: true, // certain columns can be configured otherwise.
}



export const tableConfig = {
    title: 'Some Table',
    data,
    columns,
    options: tableOptions,
    editable: editableOptions, // add this to enable editing options (onRowAdd, onRowDelete, onRowUpdate, onBulkUpdate)
    actions: customActions,
    components: componentOverrides


}