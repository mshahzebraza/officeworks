import { actionTypes } from "../../../../helpers/specific/mwoModalReducer"
import { tableIcons } from "../../../constants/tableIcons"

/**
 * 
 * @param  {Function} setModalState - used for toggling the Modals for add, edit, summary forms
 * @param  {Function} deleteHandler - used for deletion for a particular MWO
 * @returns {[{},{},{},{}]} - an array containing config-object of each MT-action
 */
export function getMWOentryActions(dispatchModal, deleteHandler) {
    return [
        createMWOaction(dispatchModal),
        deleteMWOaction(deleteHandler),
        updateMWOaction(dispatchModal),
        showMWOsummaryAction(dispatchModal),
    ]
}


/**
 * Add Action Getter
 * @param  {Function} setModalState=() => { }
 * @param  {JSX.element} [icon]=tableIcons.Add
 * @param  {string} [tooltip]="AddManufacturingRecord"
 * @param  {boolean} [isFreeAction]=true
 */
const createMWOaction = (
    dispatchModal = () => { },
    icon = tableIcons.Add,
    tooltip = "Add Manufacturing Record",
    isFreeAction = true,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event) => dispatchModal({ type: actionTypes.SHOW_CREATE_MWO_ENTRY_FORM }),
    }
)


/**
 * Delete Action Getter
 * @param  {Function} deleteHandler
 * @param  {JSX.element} [icon]=tableIcons.Delete
 * @param  {string} [tooltip]="DeleteManufacturingRecord"
 * @param  {false} [isFreeAction]=false
 */
const deleteMWOaction = (
    deleteHandler = () => { }, // deleteMWOHandler
    icon = tableIcons.Delete,
    tooltip = "Delete Manufacturing Record",
    isFreeAction = false,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, { tableData, ...rowData }) => deleteHandler(rowData._id),
    }
)


/**
 * Edit Action Getter
 * @param  {Function} setModalState=()=>{}
 * @param  {JSX.element} icon=tableIcons.Edit
 * @param  {string} tooltip="EditManufacturingRecord"
 * @param  {boolean} isFreeAction=false
 */
const updateMWOaction = (
    dispatchModal = () => { },
    icon = tableIcons.Edit,
    tooltip = "Edit Manufacturing Record",
    isFreeAction = false,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, { tableData, ...rowData }) => dispatchModal({ type: actionTypes.SHOW_UPDATE_MWO_ENTRY_FORM, payload: rowData }),
    }
)


/**
 * ? Summary Action Getter 
 * @param  {Function} setModalState=()=>{}
 * @param  {JSX.element} icon=tableIcons.Summary
 * @param  {string} tooltip="SummaryManufacturingRecord"
 * @param  {boolean} isFreeAction=false
 */
const showMWOsummaryAction = (
    dispatchModal = () => { },
    icon = tableIcons.Summary,
    tooltip = "Summary Manufacturing Record",
    isFreeAction = false,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, { tableData, ...rowData }) => dispatchModal({ type: actionTypes.SHOW_MWO_ENTRY_SUMMARY, payload: rowData }),
    }
)



