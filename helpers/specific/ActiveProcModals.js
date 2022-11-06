import MWO_Summary from "../../client/components/MWO/MWO_Summary";
import PO_Summary from "../../client/components/PO/PO_Summary";
import Proc_Form from "../../client/components/Forms/Proc_Form";
import { actionTypes as POactionTypes } from "./poModalReducer";
import { actionTypes as MWOactionTypes } from "./mwoModalReducer";

/**
 * Modal Logic controlled from within the MT-action-buttons
 * @param {*} activeModalsState 
 * @param {*} procurementType 
 * @param {*} dispatchModal 
 * @returns 
 */
export function ActiveProcModals({ procurementType, activeModalsState, dispatchModal }) {
    if (!procurementType) throw new Error('procurementType is not Defined for getActiveModals');

    let SummaryComponent = PO_Summary,
        closingActions = {
            createForm: POactionTypes.CLOSE_CREATE_PO_ENTRY_FORM,
            updateForm: POactionTypes.CLOSE_UPDATE_PO_ENTRY_FORM,
            summary: POactionTypes.CLOSE_PO_ENTRY_SUMMARY,
        };
    if (procurementType === 'mwo') {
        SummaryComponent = MWO_Summary
        closingActions = {
            createForm: MWOactionTypes.CLOSE_CREATE_MWO_ENTRY_FORM,
            updateForm: MWOactionTypes.CLOSE_UPDATE_MWO_ENTRY_FORM,
            summary: MWOactionTypes.CLOSE_MWO_ENTRY_SUMMARY,
        };
    }

    return [
        <Proc_Form
            key={procurementType + '_create_form'}
            sourceType={procurementType}
            open={activeModalsState.createForm.show}
            handleClose={() => dispatchModal({ type: closingActions.createForm })}
        />,
        <Proc_Form
            key={procurementType + '_update_form'}
            sourceType={procurementType}
            data={activeModalsState.updateForm.data}
            open={activeModalsState.updateForm.show}
            handleClose={() => dispatchModal({ type: closingActions.updateForm })}
        />,
        <SummaryComponent
            key={procurementType + '_summary'}
            data={activeModalsState.summary.data}
            open={activeModalsState.summary.show}
            handleClose={() => dispatchModal({ type: closingActions.summary })}
        />
    ]
}


