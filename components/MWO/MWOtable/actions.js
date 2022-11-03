import { tableIcons } from "../../../constants/tableIcons"

/**
 * 
 * @param  {Function} setModalState - used for toggling the Modals for add, edit, summary forms
 * @param  {Function} deleteHandler - used for deletion for a particular MWO
 * @returns {[{},{},{},{}]} - an array containing config-object of each MT-action
 */
export function getAllMTactions(setModalState, deleteHandler) {
    return [
        getMTactionAdd(setModalState),
        getMTactionDelete(deleteHandler),
        getMTactionEdit(setModalState),
        getMTactionSummary(setModalState),
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
    setModalState = () => { },
    icon = tableIcons.Add,
    tooltip = "Add Manufacturing Record",
    isFreeAction = true,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, { tableData, ...rowData }) => setModalState((prevState) => ({
            ...prevState,
            addForm: {
                ...prevState.addForm,
                state: true
            }
        })),
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
const getMTactionEdit = (
    setModalState = () => { },
    icon = tableIcons.Edit,
    tooltip = "Edit Manufacturing Record",
    isFreeAction = false,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, { tableData, ...rowData }) => setModalState((prevState) => ({
            ...prevState,
            editForm: {
                ...prevState.editForm,
                state: true,
                data: rowData
            }
        })),
    }
)


/**
 * ? Summary Action Getter 
 * @param  {Function} setModalState=()=>{}
 * @param  {JSX.element} icon=tableIcons.Summary
 * @param  {string} tooltip="SummaryManufacturingRecord"
 * @param  {boolean} isFreeAction=false
 */
const getMTactionSummary = (
    setModalState = () => { },
    icon = tableIcons.Summary,
    tooltip = "Summary Manufacturing Record",
    isFreeAction = false,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, { tableData, ...rowData }) => setModalState((prevState) => ({
            ...prevState,
            summaryDialog: {
                ...prevState.summaryDialog,
                state: true,
                data: rowData
            }
        })),
    }
)



