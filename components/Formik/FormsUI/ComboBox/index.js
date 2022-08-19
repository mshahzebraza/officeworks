import React, { useState } from 'react'
import { Field, useField } from 'formik'
import { Autocomplete, TextField } from '@mui/material'
// import TextField from '../TextField'



function ComboBoxWrapper(props) {
    // fetching props from the parent component and field input
    // ? [focalValue] can be adjusted to use the entire object as the storage value. However, the validation must also be set appropriately.
    const { inputSize = 'small', groupBy = null, focalValue = 'title', getOptionDisplay = (option) => option[focalValue], label, name, options = [], ...restProps } = props
    //? getOptionDisplay() can be passed in by the user to display a custom value in the dropdown
    // For Instance // const getOptionDisplay = (option) => `${option[focalValue]} | ${option.year}`


    const [_, meta, helpers] = useField(name);
    const errorText = meta?.touched && meta?.error;


    const [comboBoxValue, setComboBoxValue] = useState(null);
    const [comboBoxInputValue, setComboBoxInputValue] = useState('');


    // config for ComboBoxWrapper props
    const configComboBox = {
        name,

        error: Boolean(errorText),
        helperText: errorText || ' ',
        // ...field,
        ...restProps,
        // restProps can override hardcoded default props

        fullWidth: true,
        variant: 'outlined',
        // size: 'small', // doesn't get passed down
    }


    function MyAutoComplete({/*  options, config  */ }) {
        return (
            <Autocomplete
                // disablePortal
                options={options}
                getOptionLabel={getOptionDisplay} //? decides which property of the option to display
                isOptionEqualToValue={(option, value) => option[focalValue] === value[focalValue]}
                groupBy={groupBy && (option => option[groupBy])}

                value={comboBoxValue}
                onChange={(event, value) => {
                    helpers.setValue(value?.[focalValue]) // can also be set the link with the FORMIK
                    setComboBoxValue(value) // can also be set to store the entire object
                }}

                inputValue={comboBoxInputValue} // this value will be displayed in the input field
                onInputChange={(event, newInputValue) => setComboBoxInputValue(newInputValue)}
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


