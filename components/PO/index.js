// Dependency
import React, { useState, useEffect } from 'react';

// Store & Styles

import styles from '../../styles/poDirectory.module.scss'

// Components
import Layout from '../Layout/Layout';
// import { deepClone } from '../../helpers/reusable';

import { useReactiveVar } from "@apollo/client";
import poApollo from '../../lib/apollo_client/poApollo';
import moduleApollo from '../../lib/apollo_client/moduleApollo';
import { deepClone } from '../../helpers/reusable';
import Loader from '../Loader';
import { mapModulesToPO } from '../../helpers/specific';
import Source_Form from '../Procurement/Forms/Source_Form';
import { Paper, Button, Tooltip } from '@mui/material'
import MaterialTable from 'material-table';
import { tableIcons, data, columns } from './POtable';
import PO_Summary from './PO_Summary';


export default function POpageComp(pProps) {
    // const router = useRouter();

    const [modalState, setModalState] = useState({
        addForm: { state: false, data: null },
        editForm: { state: false, data: null },
        summaryDialog: { state: false, data: null },
    })
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
            onClick: (event, rowData) => setModalState((prevState) => ({
                ...prevState,
                addForm: {
                    ...prevState.addForm,
                    state: true
                }
            })),
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
            onClick: (event, rowData) => setModalState((prevState) => ({
                ...prevState,
                editForm: {
                    ...prevState.editForm,
                    state: true,
                    data: rowData
                }
            })),
        },
        {
            icon: tableIcons.Summary,
            tooltip: 'View Summary',
            onClick: (event, rowData) => setModalState((prevState) => ({
                ...prevState,
                summaryDialog: {
                    ...prevState.summaryDialog,
                    state: true,
                    data: rowData
                }
            })),
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

    return (
        <>
            {modalState.addForm.state &&
                <Source_Form
                    sourceType='po'
                    closer={() => setModalState(
                        (prevState) => (
                            {
                                ...prevState,
                                addForm: {
                                    ...prevState.addForm,
                                    state: false,
                                }
                            }))}
                />
            }
            {modalState.editForm.state &&
                <Source_Form
                    sourceType='po'
                    data={modalState.editForm.data}
                    closer={() => setModalState(
                        (prevState) => (
                            {
                                ...prevState,
                                editForm: {
                                    ...prevState.editForm,
                                    state: false,
                                }
                            }))}
                />
            }
            {modalState.summaryDialog.state &&
                // ! Delete or use the summarizer function to pass in only the key-value pairs ... or create a new function
                <PO_Summary
                    poData={modalState.summaryDialog.data}
                    closer={() => setModalState(
                        (prevState) => (
                            {
                                ...prevState,
                                summaryDialog: {
                                    ...prevState.summaryDialog,
                                    state: false,
                                }
                            }))}
                />
            }

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
        </>

    )
}

function populatePOlist(POList, ModuleList) {

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



function ModalButton({ caption = 'Show Modal', ModalComponent, outerClasses = [], tooltip = '', disabled, children, ...rest }) {


    const [modalState, setModalState] = useState(false)
    return (
        <>
            {/* <Button
                outerClasses={outerClasses}
                click={() => setModalState(true)}
                caption={caption && caption}
                tooltip={tooltip}
                disabled={disabled}
            >
                {children}
            </Button> */}

            <Tooltip title={tooltip || caption}>

                <Button
                    variant="text"
                    color="primary"
                    click={() => setModalState(true)}
                >
                    {caption}

                </Button>
            </Tooltip>

            {modalState && <ModalComponent {...rest} closer={() => setModalState(false)} />}

        </>
    )
}
