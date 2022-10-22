import MWO_Summary from "../MWO/MWO_Summary";
import PO_Summary from "../PO/PO_Summary";
import Source_Form from "./Forms/Source_Form";

export default function getActiveProcurementModals(allModalState, setAllModalState, procurementType) {
    if (!procurementType) throw new Error('procurementType is not Defined for getActiveModals');

    return [
        <AddForm
            allModalState={allModalState}
            setAllModalState={setAllModalState}
            procurementType={procurementType}
            key={procurementType + 'Modal_Add'}
        />
        ,
        <EditForm
            allModalState={allModalState}
            setAllModalState={setAllModalState}
            procurementType={procurementType}
            key={procurementType + 'Modal_Edit'}
        />
        ,
        <SummaryDialog
            allModalState={allModalState}
            setAllModalState={setAllModalState}
            procurementType={procurementType}
            key={procurementType + 'Modal_Summary'}
        />
    ];
}
``

const AddForm = ({ allModalState, setAllModalState, procurementType }) => {
    return (
        < Source_Form
            sourceType={procurementType}
            open={allModalState.addForm.state}
            handleClose={() => setAllModalState(
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
}

const EditForm = ({ allModalState, setAllModalState, procurementType }) => {
    // console.log('EditFormModalState: ', allModalState.editForm.data);

    return (

        <Source_Form
            sourceType={procurementType}
            data={allModalState.editForm.data}
            open={allModalState.editForm.state}
            handleClose={() => setAllModalState(
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
}

const SummaryDialog = ({ allModalState, setAllModalState, procurementType }) => {
    const SummaryComponent = procurementType === 'po'
        ? PO_Summary
        : MWO_Summary;

    return (
        // ! Delete or use the summarizer function to pass in only the key-value pairs ... or create a new function
        <SummaryComponent
            data={allModalState.summaryDialog.data}
            open={allModalState.summaryDialog.state}
            handleClose={() => setAllModalState(
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
}
