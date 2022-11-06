export function modalReducer(prevState, action) {
    switch (action.type) {
        case actionTypes.SHOW_CREATE_PO_ENTRY_FORM:
            return {
                ...prevState, createForm: {
                    show: true,
                    data: null
                }
            };
        case actionTypes.CLOSE_CREATE_PO_ENTRY_FORM:
            return {
                ...prevState, createForm: {
                    show: false,
                    data: null
                }
            };
        case actionTypes.SHOW_UPDATE_PO_ENTRY_FORM:
            return {
                ...prevState, updateForm: {
                    show: true,
                    data: action.payload
                }
            };
        case actionTypes.CLOSE_UPDATE_PO_ENTRY_FORM:
            return {
                ...prevState, updateForm: {
                    show: false,
                    data: null
                }
            };
        case actionTypes.SHOW_PO_ENTRY_SUMMARY:
            return {
                ...prevState, summary: {
                    show: true,
                    data: action.payload
                }
            };
        case actionTypes.CLOSE_PO_ENTRY_SUMMARY:
            return {
                ...prevState, summary: {
                    show: false,
                    data: null
                }
            };
        default:
            throw new Error();
    }
}
export const actionTypes = {
    SHOW_CREATE_PO_ENTRY_FORM: "SHOW_CREATE_PO_ENTRY_FORM",
    CLOSE_CREATE_PO_ENTRY_FORM: "CLOSE_CREATE_PO_ENTRY_FORM",
    SHOW_UPDATE_PO_ENTRY_FORM: "SHOW_UPDATE_PO_ENTRY_FORM",
    CLOSE_UPDATE_PO_ENTRY_FORM: "CLOSE_UPDATE_PO_ENTRY_FORM",
    SHOW_PO_ENTRY_SUMMARY: "SHOW_PO_ENTRY_SUMMARY",
    CLOSE_PO_ENTRY_SUMMARY: "CLOSE_PO_ENTRY_SUMMARY"
};
