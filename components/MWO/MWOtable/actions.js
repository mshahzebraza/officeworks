import { tableIcons } from "../../../constants/tableIcons"

/**
 * 
 * @param  {Function} stateSetter - used for toggling the Modals for add, edit, summary forms
 * @param  {Function} deleteHandler - used for deletion for a particular MWO
 * @returns {[{},{},{},{}]} - an array containing config-object of each MT-action
 */
export function getAllMTactions(stateSetter, deleteHandler) {
    return [
        getMTaction.add(stateSetter),
        getMTaction.delete(deleteHandler),
        getMTaction.edit(stateSetter),
        getMTaction.summary(stateSetter),
    ]
}


/**
 * An object containing individual template-configs for Material-Table action-buttons
 */
const getMTaction = {
    /**
     * Add Action Getter
     * @param  {Function} stateSetter=() => { }
     * @param  {JSX.element} [icon]=tableIcons.Add
     * @param  {string} [tooltip]="AddManufacturingRecord"
     * @param  {boolean} [isFreeAction]=true
     */
    add: (
        stateSetter = () => { }, // setModalState
        icon = tableIcons.Add,
        tooltip = "Add Manufacturing Record",
        isFreeAction = true,
    ) => (
        {
            icon,
            tooltip,
            isFreeAction,
            onClick: (event, rowData) => stateSetter((prevState) => ({
                ...prevState,
                addForm: {
                    ...prevState.addForm,
                    state: true
                }
            })),
        }
    ),
    /**
     * Delete Action Getter
     * @param  {Function} deleteHandler
     * @param  {JSX.element} [icon]=tableIcons.Delete
     * @param  {string} [tooltip]="DeleteManufacturingRecord"
     * @param  {false} [isFreeAction]=false
     */
    delete: (
        deleteHandler = () => { }, // deleteMWOHandler
        icon = tableIcons.Delete,
        tooltip = "Delete Manufacturing Record",
        isFreeAction = false,
    ) => (
        {
            icon,
            tooltip,
            isFreeAction,
            onClick: (event, rowData) => deleteHandler(rowData._id),
        }
    ),
    /**
     * Edit Action Getter
     * @param  {Function} stateSetter=()=>{}
     * @param  {JSX.element} icon=tableIcons.Edit
     * @param  {string} tooltip="EditManufacturingRecord"
     * @param  {boolean} isFreeAction=false
     */
    edit: (
        stateSetter = () => { }, // setModalState
        icon = tableIcons.Edit,
        tooltip = "Edit Manufacturing Record",
        isFreeAction = false,
    ) => (
        {
            icon,
            tooltip,
            isFreeAction,
            onClick: (event, rowData) => stateSetter((prevState) => ({
                ...prevState,
                editForm: {
                    ...prevState.editForm,
                    state: true,
                    data: rowData
                }
            })),
        }
    ),
    /**
     * ? Summary Action Getter 
     * @param  {Function} stateSetter=()=>{}
     * @param  {JSX.element} icon=tableIcons.Summary
     * @param  {string} tooltip="SummaryManufacturingRecord"
     * @param  {boolean} isFreeAction=false
     */
    summary: (
        stateSetter = () => { }, // setModalState
        icon = tableIcons.Summary,
        tooltip = "Summary Manufacturing Record",
        isFreeAction = false,
    ) => (
        {
            icon,
            tooltip,
            isFreeAction,
            onClick: (event, rowData) => stateSetter((prevState) => ({
                ...prevState,
                summaryForm: {
                    ...prevState.summaryDialog,
                    state: true,
                    data: rowData
                }
            })),
        }
    ),

}


