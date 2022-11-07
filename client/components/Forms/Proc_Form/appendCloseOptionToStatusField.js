/**
 * Allow the Dropdown to have the "Closed" option only if submission-mode is "Update"
 * @param {boolean} isNewSubmission checks the form is ["edit" OR "new"]
 * @param {Object} formData An Object containing the configs(initialValues,validationSchema,props) for each of the fields
 */
export function appendCloseOptionToStatusField(isNewSubmission, formData) {
    !isNewSubmission && formData.fields.status.config.options.push({ key: 'Closed', value: 'Closed' });
}
