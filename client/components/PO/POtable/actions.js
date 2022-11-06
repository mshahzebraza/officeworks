import { actionTypes } from "../../../../helpers/specific/poModalReducer"
import { tableIcons } from "../../../constants/tableIcons"

/**
 * 
 * @param  {Function} setModalState - used for toggling the Modals for add, edit, summary forms
 * @param  {Function} deleteHandler - used for deletion for a particular MWO
 * @returns {[{},{},{},{}]} - an array containing config-object of each MT-action
 */
export function getAllMTactions(dispatchModal, deleteHandler) {
    return [
        getMTactionAdd(dispatchModal),
        getMTactionDelete(deleteHandler),
        getMTactionEdit(dispatchModal),
        getMTactionSummary(dispatchModal),
    ]
}


/**
 * Add Action Getter
 * @param  {Function} setModalState=() => { }
 * @param  {JSX.element} [icon]=tableIcons.Add
 * @param  {string} [tooltip]="AddManufacturingRecord"
 * @param  {boolean} [isFreeAction]=true
 */
const getMTactionAdd = (
    dispatchModal = () => { },
    icon = tableIcons.Add,
    tooltip = "Add Purchase Record",
    isFreeAction = true,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event) => {
            dispatchModal({ type: actionTypes.SHOW_CREATE_PO_ENTRY_FORM })
        },
    }
)


/**
 * Delete Action Getter
 * @param  {Function} deleteHandler
 * @param  {JSX.element} [icon]=tableIcons.Delete
 * @param  {string} [tooltip]="DeleteManufacturingRecord"
 * @param  {false} [isFreeAction]=false
 */
const getMTactionDelete = (
    deleteHandler = () => { }, // deleteMWOHandler
    icon = tableIcons.Delete,
    tooltip = "Delete Purchase Record",
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
const getMTactionEdit = (
    dispatchModal = () => { },
    icon = tableIcons.Edit,
    tooltip = "Edit Purchase Record",
    isFreeAction = false,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, { tableData, ...rowData }) => {
            dispatchModal({ type: actionTypes.SHOW_UPDATE_PO_ENTRY_FORM, payload: rowData })
        },
    }
)


/**
 * ? This object tells the MUI-table to create an action button with the configuration  
 * @param  {Function} setModalState=()=>{}
 * @param  {JSX.element} icon=tableIcons.Summary
 * @param  {string} tooltip="SummaryManufacturingRecord"
 * @param  {boolean} isFreeAction=false
 */
const getMTactionSummary = (
    dispatchModal = () => { },
    icon = tableIcons.Summary,
    tooltip = "Summary Purchase Record",
    isFreeAction = false,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, { tableData, ...rowData }) => {
            dispatchModal({ type: actionTypes.SHOW_PO_ENTRY_SUMMARY, payload: rowData })
        },
    }
)



