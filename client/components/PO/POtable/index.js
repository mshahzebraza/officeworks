// Dependency & Helpers
import React from 'react'
import { Paper } from '@mui/material';
import MaterialTable from 'material-table';
// Constants, Store & Styles
import { tableIcons } from "../../../constants/tableIcons"
import { getPOentryActions } from "./actions"
import { MTcomponents } from "./components"
import { MToptions } from "./options"
import { columns } from './columns';

/**
 * A JSX component to render Material Table for PO entries
 * @param  {Function} dispatchModal - let's the user dispatch action against the action buttons (create, update & summary) of the MTable Row
 * @param  {Function} deleteHandler - function to delete the selected PO entry
 * @param  {Array} [data]='' - List of PO entries to render as Table rows
 */
const POtable = ({ dispatchModal, deleteHandler, data }) => {
    console.log('poData', data)
    const MTconfig = {
        title: 'Purchase Orders',
        icons: tableIcons,
        data, // can be replaced later
        columns,
        options: MToptions,
        // editable: editableOptions, // add this to enable editing options (onRowAdd, onRowDelete, onRowUpdate, onBulkUpdate)
        actions: getPOentryActions(dispatchModal, deleteHandler),
        // detailPanel: tableDetailPanel,
        // ! Not working
        components: MTcomponents,
    }

    return (
        <Paper>
            <MaterialTable
                {...MTconfig}
            />
        </Paper>
    )
}

export default POtable;