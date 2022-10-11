import React, { useState } from 'react'
import { Field, useField } from 'formik'
import { Autocomplete, TextField } from '@mui/material'



function ComboBoxWrapper(props) {
    // fetching props from the parent component and field input
    // ? [focalValue] can be adjusted to use the entire object as the storage value. However, the validation must also be set appropriately.
    const {
        inputSize = 'small',
        groupBy = null,
        focalValue = 'title',
        getOptionLabel = (option) => option[focalValue],
        label, name,
        options = [],
        showHelper = false,
        customHelperText = null,
        ...restProps
    } = props
    //? getOptionDisplay() can be passed in by the user to display a custom value in the dropdown
    // For Instance // const getOptionDisplay = (option) => `${option[focalValue]} | ${option.year}`

    const [__, meta] = useField(name);
    const { touched, error } = meta;
    const isError = !!touched && !!error; // apply error styles in case the input in not valid
    const errorText = !!touched && error; // apply error styles in case the input in not valid
    const helperText = customHelperText || errorText; // prioritize the customHelperText over the default error-text

    const [comboBoxValue, setComboBoxValue] = useState(null);
    const [comboBoxInputValue, setComboBoxInputValue] = useState('');


    // config for ComboBoxWrapper props
    const configComboBox = {
        name,

        error: isError,
        helperText: showHelper && (helperText || ' '),
        // ...field,
        ...restProps,
        // restProps can override hardcoded default props

        fullWidth: true,
        variant: 'outlined',
        // size: 'small',
    }


    function MyAutoComplete({/*  options, config  */ }) {
        return (
            <Autocomplete
                disablePortal
                options={options}
                getOptionLabel={getOptionLabel} //? decides which property of the option to display
                // isOptionEqualToValue={(option, value) => option[focalValue] === value[focalValue]}
                groupBy={groupBy && (option => option[groupBy])}

                value={comboBoxValue}
                onChange={(event, value) => {
                    helpers.setValue(value?.[focalValue]) // can also be set the link with the FORMIK
                    setComboBoxValue(value) // can also be set to store the entire object
                }}

                inputValue={comboBoxInputValue}
                onInputChange={(event, newInputValue) => {
                    setComboBoxInputValue(newInputValue[focalValue])
                }}
                /*  //! Setting it to only newInputValue disables the writing feature in the input */

                renderInput={(params) => <TextField {...params} label={label} size={inputSize} />}
            />
        )
    }
    return (
        <Field
            as={MyAutoComplete} // ! create a select component as well
            // value,inputValue props passed here do not get passed down to AutoComplete
            {...configComboBox}
        />
    )


}

export default ComboBoxWrapper;


