// Dependency
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux'

// Store & Styles
import styles from '../../styles/poDirectory.module.scss'
import { useReactiveVar } from '@apollo/client';
import mwoApollo, { deleteMWOHandler } from '../../lib/apollo_client/mwoApollo';

// Components
import Source_Form from '../Procurement/Forms/Source_Form';
import { Paper, Button, Tooltip, TableCell } from '@mui/material'
import MaterialTable, { MTableHeader } from 'material-table';
import MWOentry from './MWOentry'
import Layout from '../Layout';
import { checkDataType, deepClone } from '../../helpers/reusable';
import ModalButton from '../UI/ModalButton';
import SearchInput from '../UI/SearchInput';
import moduleApollo from '../../lib/apollo_client/moduleApollo';
import { mapModulesToPO as populateLinkedModules } from '../../helpers/specific';
import Loader from '../Loader';
import { columns, tableIcons } from './MWOtable';
import MWO_Summary from './MWO_Summary';
export default function MWOPageComp(pProps) {



    const [modalState, setModalState] = useState({
        addForm: { state: false, data: null },
        editForm: { state: false, data: null },
        summaryDialog: { state: false, data: null },
    })
    const MWOstate = useReactiveVar(mwoApollo);
    const ModuleState = useReactiveVar(moduleApollo)
    // const [searchInput, setSearchInput] = useState(false)


    // Section: Component States
    const [MWOlist, setMWOlist] = useState(null)
    const [loading, setLoading] = useState(true);

    // Section: State Transforms
    useEffect(() => {
        // TODO: handle the case when loading state remains true for a long time. re-route to 404 page if stuck in loading state for a long time
        // const loadingTimeout = setTimeout(() => console.error('Loading failed'), 3000)
        if (MWOstate.fetched && ModuleState.fetched) {
            // clearTimeout(loadingTimeout);
            setLoading(false);
            // populate MWOstate.list and save it to MWOlist
            const populatedMWOlist = populateMWOlist(MWOstate.list, ModuleState.list)
            setMWOlist(populatedMWOlist)

        }
    }, [MWOstate, ModuleState])


    // Section: Fallback Rendering
    if (loading) return <Loader />

    // Section: Table Config
    const customActions = [
        // Add MWO
        {
            icon: tableIcons.Add,
            tooltip: 'Add Manufacturing Record',
            onClick: (event, rowData) => setModalState((prevState) => ({
                ...prevState,
                addForm: {
                    ...prevState.addForm,
                    state: true
                }
            })),
            isFreeAction: true,
        },
        // Delete MWO
        {
            icon: tableIcons.Delete,
            tooltip: 'Delete Manufacturing Record',
            onClick: (event, rowData) => deleteMWOHandler(rowData._id),
        },
        // Edit MWO
        {
            icon: tableIcons.Edit,
            tooltip: 'Edit Manufacturing Record',
            onClick: (event, rowData) => setModalState((prevState) => ({
                ...prevState,
                editForm: {
                    ...prevState.editForm,
                    state: true,
                    data: rowData
                }
            })),
        },
        // Summary MWO
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
    ]

    const tableOptions = {
        columnsButton: true,
        exportButton: true,
        actionsColumnIndex: -1, //? to position the actions column to the right
        addRowPosition: 'first', // | 'last' //? to add new rows to the top 
        grouping: true, // certain columns can be configured otherwise.
        headerStyle: {
            // backgroundColor: '#101f33',
            // color: 'white',
            borderBottom: "1px solid #101f33",
        },
    }

    const componentOverrides = {
        Header: props => {
            return (
                <div
                    style={{
                        display: 'contents',
                        textAlign: 'center',
                        color: 'white',
                        backgroundColor: '#000',
                    }}
                >
                    <MTableHeader {...props} />
                </div>
            )
        }
    }

    const tableConfig = {
        title: 'Work Orders',
        icons: tableIcons,
        data: MWOlist,
        columns,
        options: tableOptions,
        // editable: editableOptions, // add this to enable editing options (onRowAdd, onRowDelete, onRowUpdate, onBulkUpdate)
        actions: customActions,
        // detailPanel: tableDetailPanel,
        // ! Not working
        components: componentOverrides,
    }

    return (
        <>
            {/* Modal Logic */}
            {modalState.addForm.state &&
                <Source_Form
                    sourceType='mwo'
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
                    sourceType='mwo'
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
                <MWO_Summary
                    mwoData={modalState.summaryDialog.data}
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
                        // title='Purchase Cases'
                        // icons={tableIcons}
                        // data={POlist}
                        {...tableConfig}
                    />
                </Paper>
            </Layout>

            {/* <Layout pageClasses={[styles.container]} >

                <section className={`pageHeader`}>
                    <h1 className={`pageTitle`} > Mfg Work Orders</h1>
                    <ModalButton caption='Add MWO' ModalComponent={Source_Form} sourceType='mwo' />
                </section>

                <section className={`pageBody`} >
                    <MWOentry
                        header={true}
                    />
                    {
                        MWOlist.map((mwoData, idx) => {
                            return <MWOentry
                                key={idx}
                                mwoData={{ index: idx, ...mwoData }}
                            />
                        })
                    }
                </section>

            </Layout> */}
        </>
    )

}



function populateMWOlist(MWOList, ModuleList) {
    const populatedMWOlist = MWOList.map((currentRecord, idx) => {
        currentRecord = deepClone(currentRecord) // ?so that the original apollo state is not mutated
        // for each of moduleRefs, find the corresponding module data in the ModuleState
        currentRecord.linkedModules = populateLinkedModules(currentRecord.linkedModules, ModuleList)
        return { ...currentRecord, id: idx }
    })
    return populatedMWOlist;

}
