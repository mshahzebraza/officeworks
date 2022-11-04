import React from 'react'
import { Paper } from '@mui/material';
import MaterialTable from 'material-table';

import { tableIcons } from "../../../constants/tableIcons"
import { getAllMTactions } from "./actions"
import { MTcomponents } from "./components"
import { MToptions } from "./options"
import { columns } from './columns';
import { useRouter } from 'next/router';
import { editableOptions } from './editable';


// import { tableConfig } from "../tableConfig"

/**
 * A JSX component to render Material Table for MWO entries
 * @param  {Function} setModalState - Set of states to toggle between modals of add-form, edit-form & summary-dialog
 * @param  {Function} deleteHandler - function to delete the selected MWO entry
 * @param  {Array} [data]='' - List of MWO entries to render as Table rows
 */

// MWO Material-Table
const POtable = ({ setModalState, deleteHandler, data }) => {

    const MTconfig = {
        title: 'Purchase Orders',
        icons: tableIcons,
        data, // can be replaced later
        columns,
        options: MToptions,
        // editable: editableOptions, // add this to enable editing options (onRowAdd, onRowDelete, onRowUpdate, onBulkUpdate)
        actions: getAllMTactions(setModalState, deleteHandler, useRouter()),
        // detailPanel: tableDetailPanel,
        // ! Not working
        components: MTcomponents,
        editable: editableOptions, // add this to enable editing options (onRowAdd, onRowDelete, onRowUpdate, onBulkUpdate)
        // onSelectionChange: (rows) => console.log('onSelectionChange', rows),

    }

    return (
        <Paper>
            <MaterialTable
                {...MTconfig}
            />
        </Paper>
    )
}


export default POtable









// export { data } from './tableData';
// export { columns } from './fieldConfig';
// export { tableIcons } from '../../../constants/tableIcons';
// export { tableConfig } from './tableConfig';

