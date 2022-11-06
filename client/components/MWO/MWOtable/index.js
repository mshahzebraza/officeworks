// Dependency & Helpers
import React from 'react'
import { Paper } from '@mui/material';
import MaterialTable from 'material-table';
// Constants, Store & Styles
import { tableIcons } from "../../../constants/tableIcons"
import { getMWOentryActions } from "./actions"
import { MTcomponents } from "./components"
import { MToptions } from "./options"
import { columns } from './columns';

/**
 * A JSX component to render Material Table for MWO entries
 * @param  {Function} dispatchModal - let's the user dispatch action against the action buttons (create, update & summary) of the MTable Row
 * @param  {Function} deleteHandler - function to delete the selected MWO entry
 * @param  {Array} [data]='' - List of MWO entries to render as Table rows
 */
const MWOtable = ({ dispatchModal, deleteHandler, data }) => {
    console.log('mwoData', data)
    const MTconfig = {
        title: 'Work Orders',
        icons: tableIcons,
        data, // can be replaced later
        columns,
        options: MToptions,
        // editable: editableOptions, // add this to enable editing options (onRowAdd, onRowDelete, onRowUpdate, onBulkUpdate)
        actions: getMWOentryActions(dispatchModal, deleteHandler),
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


export default MWOtable
