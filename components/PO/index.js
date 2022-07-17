// Dependency
import React, { useState, useEffect } from 'react';

// Store & Styles

import styles from '../../styles/poDirectory.module.scss'

// Components
import Layout from '../Layout/Layout';
// import { deepClone } from '../../helpers/reusable';
import ModalButton from '../UI/ModalButton';
import SearchInput from '../UI/SearchInput';


import { useReactiveVar } from "@apollo/client";
import poApollo from '../../lib/apollo_client/poApollo';
import moduleApollo from '../../lib/apollo_client/moduleApollo';
import { deepClone } from '../../helpers/reusable';
import Loader from '../Loader';
import { mapModulesToPO } from '../../helpers/specific';
import Source_Form from '../Procurement/Forms/Source_Form';
import { Paper } from '@mui/material'
import MaterialTable from 'material-table';
import { tableIcons, data, columns } from './POtable';










export default function POpageComp(pProps) {
    // const router = useRouter();

    const POstate = useReactiveVar(poApollo)
    const ModuleState = useReactiveVar(moduleApollo)


    // Section: Component States
    const [POlist, setPOlist] = useState(null)
    const [loading, setLoading] = useState(true);

    // Section: State Transforms
    useEffect(() => {
        // TODO: handle the case when loading state remains true for a long time. re-route to 404 page if stuck in loading state for a long time
        // const loadingTimeout = setTimeout(() => console.error('Loading failed'), 3000)
        if (POstate.fetched && ModuleState.fetched) {
            setLoading(false);
            // populate POstate.list and save it to POlist
            const populatedPOlist = populatePOlist(POstate.list, ModuleState.list)
            setPOlist(populatedPOlist)
        }
    }, [POstate, ModuleState])


    // Section: Fallback Rendering
    if (loading) return <Loader />

    console.assert(!!POlist, 'No POlist. Must never happen.') // ?should never happen


    // Section: Table Config


    const customActions = [
        {
            icon: tableIcons.Add,
            tooltip: 'Add Purchase Record',
            onClick: (event, rowData) => alert('add'),
            isFreeAction: true,
        },
        {
            icon: tableIcons.Delete,
            tooltip: 'Delete Purchase Record',
            onClick: (event, rowData) => alert('delete')
        },
        {
            icon: tableIcons.Edit,
            tooltip: 'Edit Purchase Record',
            onClick: (event, rowData) => alert('edit')
        },
        {
            icon: tableIcons.Summary,
            tooltip: 'View Summary',
            onClick: (event, rowData) => alert('summary')
        },
        {
            icon: tableIcons.Details,
            tooltip: 'Go To Purchase Details',
            onClick: (event, rowData) => alert('detail page')
        },


    ]

    const tableOptions = {
        columnsButton: true,
        exportButton: true,
        actionsColumnIndex: -1, //? to position the actions column to the right
        addRowPosition: 'first', // | 'last' //? to add new rows to the top 
        grouping: true, // certain columns can be configured otherwise.
    }

    const tableConfig = {
        // title: 'Purchase Cases',
        // data,
        columns,
        options: tableOptions,
        // editable: editableOptions, // add this to enable editing options (onRowAdd, onRowDelete, onRowUpdate, onBulkUpdate)
        actions: customActions,
    }
    console.log('POlist', POlist)
    console.log('data', data)


    return (
        <Layout >
            <Paper>
                <MaterialTable
                    title='Purchase Cases'
                    icons={tableIcons}
                    data={POlist}
                    {...tableConfig}
                />
            </Paper>
        </Layout>
    )
}

function populatePOlist(POList, ModuleList) {

    console.log('POList[0]', POList[0])
    const populatedPOlist = POList.map((currentRecord, idx) => {
        currentRecord = deepClone(currentRecord) // ?so that the original apollo state is not mutated
        // for each of moduleRefs, find the corresponding module data in the ModuleState
        currentRecord.linkedModules = mapModulesToPO(currentRecord.linkedModules, ModuleList)
        if (idx === 0) console.log('currentRecord', currentRecord)
        return { ...currentRecord, id: idx }
    })
    console.log('populatedPOlist[0]', populatedPOlist[0])


    return populatedPOlist;
}
