import { forwardRef } from 'react';
import Source_Form from "../Procurement/Forms/Source_Form";
import PO_Summary from './PO_Summary';

// TODO: This file is a 99% copy of modalHandler in MWO folder. Except the name of component for Summary Dialog everything is same. Even the props for the Summary component
export default function getActiveModals(modalState, setModalState) {
    const activeModals = [];

    if (modalState.addForm.state) activeModals.push(
        <AddForm setModalState={setModalState} key={'Modal_Add'} />)

    if (modalState.editForm.state) activeModals.push(
        <EditForm setModalState={setModalState} modalState={modalState} key={'Modal_Edit'} />)

    if (modalState.summaryDialog.state) activeModals.push(
        <SummaryDialog setModalState={setModalState} key={'Modal_Summary'} />)

    return activeModals;
}


const AddForm = ({ setModalState }) => (
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
)

const EditForm = ({ modalState, setModalState }) => (
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
)

const SummaryDialog = ({ modalState, setModalState }) => (

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
)
