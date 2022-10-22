import { tableIcons } from "../../../constants/tableIcons"

/**
 * 
 * @param  {Function} setModalState - used for toggling the Modals for add, edit, summary forms
 * @param  {Function} deleteHandler - used for deletion for a particular MWO
 * @returns {[{},{},{},{}]} - an array containing config-object of each MT-action
 */
export function getAllMTactions(setModalState, deleteHandler, router) {
    return [
        getMTactionAdd(setModalState),
        getMTactionDelete(deleteHandler),
        getMTactionEdit(setModalState),
        getMTactionSummary(setModalState),
        getMTactionDetails(router)
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
    tooltip = "Add Purchase Record",
    isFreeAction = true,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, rowData) => setModalState((prevState) => ({
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
    tooltip = "Delete Purchase Record",
    isFreeAction = false,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, rowData) => deleteHandler(rowData._id),
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
    tooltip = "Edit Purchase Record",
    isFreeAction = false,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, rowData) => setModalState((prevState) => ({
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
 * ? This object tells the MUI-table to create an action button with the configuration  
 * @param  {Function} setModalState=()=>{}
 * @param  {JSX.element} icon=tableIcons.Summary
 * @param  {string} tooltip="SummaryManufacturingRecord"
 * @param  {boolean} isFreeAction=false
 */
const getMTactionSummary = (
    setModalState = () => { },
    icon = tableIcons.Summary,
    tooltip = "Summary Purchase Record",
    isFreeAction = false,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, rowData) => setModalState((prevState) => ({
            ...prevState,
            summaryDialog: {
                ...prevState.summaryDialog,
                state: true,
                data: rowData
            }
        })),
    }
)


/**
 * ? Details Action Getter 
 * @param  {Function} router=()=>{}
 * @param  {JSX.element} icon=tableIcons.Summary
 * @param  {string} tooltip="SummaryManufacturingRecord"
 * @param  {boolean} isFreeAction=false
 */
const getMTactionDetails = (
    router = () => { },
    icon = tableIcons.Details,
    tooltip = "Go to Purchase Details",
    isFreeAction = false,
) => (
    {
        icon,
        tooltip,
        isFreeAction,
        onClick: (event, rowData) => {
            const { refType, refId } = rowData;
            router.push(`po/${refType}__${refId}`)
        },
    }
)



