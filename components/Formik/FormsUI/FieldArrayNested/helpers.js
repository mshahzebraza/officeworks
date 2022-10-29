




/**
 * returns "a string - value of helper-text" and "a boolean - to represent if the helper is an error"
 * NOTE: DO NOT SET DEFAULTS for the parameters OTHERWISE HELPER TEXT WON'T WORK
 * @param  {{}} activeFAentryTouched=[] the touched object (for all nested item's properties) of each nested item
 * @param  {{}} activeFAentryErrors=[] the error object (for all nested item's properties) of each nested item
 * @returns [helperText, isHelperTextAnError]
 */
export function getActiveFAentryHelperText(activeFAentryTouched, activeFAentryErrors) {
    /* 
        1. Check if at-least one nested-field is touched. (touchedArrOfObj would not exist otherwise)
        2. Check if at-least one field has error (the error object would not exist otherwise)
        3. Combine the values of existing errors of nested-fields into one.
     */
    let isError = false;
    // const activeFAentryErrors = FAerrorArr[FAactiveEntryIdx];
    // const activeFAentryTouched = FAtouchedArr[FAactiveEntryIdx];
    if (!activeFAentryTouched) return ['Fields are un-touched for the entry', isError]
    if (!activeFAentryErrors) return ['No errors found for the entry', isError]
    // check for global errors
    // in case of a global error, the errorCollection is set to a string, therefore activeFAentryErrors, essentially equal to errorCollection[n] must be a single letter. therefore this condition can be checked to know if the global error is present or not
    if ((typeof activeFAentryErrors === "string") && activeFAentryErrors.length === 1) return ['No errors!', isError]

    isError = true;

    const activeFAentryErrorValues = Object.values(activeFAentryErrors);
    const activeFAentryErrorStr = activeFAentryErrorValues.reduce(
        (acc, errorVal) => {
            // Ensure that concatenation does not include separator before the first element (first element would be set to null and checked before concatenation) 
            acc = (!!acc) ? acc.concat(' | ', errorVal) : errorVal
            return acc;
        }
        , null
    )

    return [activeFAentryErrorStr, isError];

}

/**
 * Maps through configs of the fields and create a new object with names of respective fields 
 * @param  {[{ control, name, label, type, showHelper, customHelperText, default }]} nestedFieldConfig - Takes in an array of configs each containing name & default keys
 * @param nestedFieldConfig.control,
 * @param nestedFieldConfig.name: fieldName || ('field' + fieldIdx),
 * @param nestedFieldConfig.label: fieldLabel || ('field ' + fieldIdx + ' Label'),
 * @param nestedFieldConfig.type,
 * @param nestedFieldConfig.showHelper,
 * @param nestedFieldConfig.customHelperText,
 * @param nestedFieldConfig.default: initial or default value for the field input, 
 * 
 */
export function getNestedInitVal(nestedFieldConfig) {
    const namesAndDefaultsArr = nestedFieldConfig
        .reduce((prev, { name: fieldName, default: fieldDefault }) => {
            prev.push([fieldName, fieldDefault || ""])
            return prev;
        }, [])

    const initValObject = Object.fromEntries(namesAndDefaultsArr)

    return initValObject;
}




/**
 * Easily creates the config objects for nested fields in a field array
 * @param  {number} fieldIdx - 0
 * @param  {string} [control] - 'text'
 * @param  {string} [type] - 'text'
 * @param  {string} [label] - 'myLabel'
 * @param  {string} [name] - changing it would required change in the validation-schema as well
 * @param  {boolean} [showHelper] - true
 * @param  {string} [helperText] - 
 * @param  {boolean} [resetHelperStyles] - is not working
 * @return {Object}
 */
export function getFieldConfig({
    fieldIdx = 0,
    control = 'text',
    type = 'text',
    label,
    name,
    defaultValue,
    showHelper = true,
    customHelperText /* = 'customHelper defined in story-getFieldConfig' */,
}) {
    if (type === 'text') defaultValue = `I'm Field ${fieldIdx}`;
    if (type === 'number') defaultValue = 2;
    if (!label) label = `field ${fieldIdx} Label`;
    if (!name) name = `field${fieldIdx}`;

    return ({
        control,
        type,
        label,
        name,
        default: defaultValue, //! default value to for the nested field
        showHelper,
        customHelperText,
    })
}





export function getFinalConfig(fieldConfig, fieldAddress) {
    const name = getFieldName(fieldAddress) // movie into the getFinalConfig function


    //? Field Config
    const {
        label = `Label-for-${field}-of-${collection}[${entry}]`,
        gridSpan = 5,
        ...restEntryConfig
    } = fieldConfig;

    const finalConfig = {
        ...restEntryConfig,
        // key: fieldName,
        label,
        name,
        gridSpan,
    }

    return finalConfig
}

function getFieldName(address) {
    const { collection, entry, field } = address
    const fieldName = `${collection}[${entry}].${field}`
    return fieldName
}
