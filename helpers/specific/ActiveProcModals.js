import MWO_Summary from "../../client/components/MWO/MWO_Summary";
import PO_Summary from "../../client/components/PO/PO_Summary";
import Proc_Form from "../../client/components/Forms/Proc_Form";
import { actionTypes } from "./poModalReducer";

/**
 * Modal Logic controlled from within the MT-action-buttons
 * @param {*} activeModalsState 
 * @param {*} procurementType 
 * @param {*} dispatchModal 
 * @returns 
 */
export function ActiveProcModals({ procurementType, activeModalsState, dispatchModal }) {
    if (!procurementType) throw new Error('procurementType is not Defined for getActiveModals');

    const SummaryComponent = procurementType === 'po'
        ? PO_Summary
        : MWO_Summary;

    return [
        <Proc_Form
            key={procurementType + '_create_form'}
            sourceType={procurementType}
            open={activeModalsState.createForm.show}
            handleClose={() => dispatchModal({ type: actionTypes.CLOSE_CREATE_PO_ENTRY_FORM })}
        />,
        <Proc_Form
            key={procurementType + '_update_form'}
            sourceType={procurementType}
            data={activeModalsState.updateForm.data}
            open={activeModalsState.updateForm.show}
            handleClose={() => dispatchModal({ type: actionTypes.CLOSE_UPDATE_PO_ENTRY_FORM })}
        />,
        <SummaryComponent
            key={procurementType + '_summary'}
            data={activeModalsState.summary.data}
            open={activeModalsState.summary.show}
            handleClose={() => dispatchModal({ type: actionTypes.CLOSE_PO_ENTRY_SUMMARY })}
        />
    ]
}


