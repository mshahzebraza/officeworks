import { forwardRef } from 'react';
import Source_Form from "../Procurement/Forms/Source_Form";
import MWO_Summary from "./MWO_Summary";

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
)


const EditForm = ({ modalState, setModalState }) => (
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
)

const SummaryDialog = ({ modalState, setModalState }) => (

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
)
