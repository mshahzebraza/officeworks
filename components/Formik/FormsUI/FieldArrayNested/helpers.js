

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
