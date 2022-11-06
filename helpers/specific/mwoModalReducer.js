export function modalReducer(prevState, action) {
    switch (action.type) {
        case actionTypes.SHOW_CREATE_MWO_ENTRY_FORM:
            return {
                ...prevState, createForm: {
                    show: true,
                    data: null
                }
            };
        case actionTypes.CLOSE_CREATE_MWO_ENTRY_FORM:
            return {
                ...prevState, createForm: {
                    show: false,
                    data: null
                }
            };
        case actionTypes.SHOW_UPDATE_MWO_ENTRY_FORM:
            return {
                ...prevState, updateForm: {
                    show: true,
                    data: action.payload
                }
            };
        case actionTypes.CLOSE_UPDATE_MWO_ENTRY_FORM:
            return {
                ...prevState, updateForm: {
                    show: false,
                    data: null
                }
            };
        case actionTypes.SHOW_MWO_ENTRY_SUMMARY:
            return {
                ...prevState, summary: {
                    show: true,
                    data: action.payload
                }
            };
        case actionTypes.CLOSE_MWO_ENTRY_SUMMARY:
            return {
                ...prevState, summary: {
                    show: false,
                    data: null
                }
            };
        default:
            throw new Error('No Matching Action dispatched!');
    }
}
export const actionTypes = {
    SHOW_CREATE_MWO_ENTRY_FORM: "SHOW_CREATE_MWO_ENTRY_FORM",
    CLOSE_CREATE_MWO_ENTRY_FORM: "CLOSE_CREATE_MWO_ENTRY_FORM",
    SHOW_UPDATE_MWO_ENTRY_FORM: "SHOW_UPDATE_MWO_ENTRY_FORM",
    CLOSE_UPDATE_MWO_ENTRY_FORM: "CLOSE_UPDATE_MWO_ENTRY_FORM",
    SHOW_MWO_ENTRY_SUMMARY: "SHOW_MWO_ENTRY_SUMMARY",
    CLOSE_MWO_ENTRY_SUMMARY: "CLOSE_MWO_ENTRY_SUMMARY"
};
