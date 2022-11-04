
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    FormHelperText
} from '@mui/material'
import { Field, useField } from 'formik';
import React from 'react'




// ? For a Single Checkbox:
// 1. name (of checkbox field) should correspond to the name of the ONE INPUT (checkbox) ONLY
// 2. there should be no "value" attribute passed on checkboxes (formik will automatically set it to a boolean)
// 3. initial value of the checkbox should must not be a boolean
function CheckboxWrapper(props) {

    // fetching props from the parent component and field input
    const { name, showHelper = false, customHelperText = null, label, legend, icon, checkedIcon, ...restProps } = props;

    const [__, meta] = useField(name);
    const { touched, error } = meta;
    const isError = !!touched && !!error; // apply error styles in case the input in not valid
    const errorText = !!touched && error; // apply error styles in case the input in not valid
    const helperText = customHelperText || errorText; // prioritize the customHelperText over the default error-text




    // config for Checkbox props
    const configCheckbox = {
        name,
        label,
        control: <Checkbox icon={icon} checkedIcon={checkedIcon} />,
        ...restProps
    }

    // config for FormControl - useful for error handling of checkboxes
    const configFormControl = {
        error: !!isError,
        // helperText doesn't work with FormControl
        // using FormControl means all the sub-components of FormControl must be used like:
        // FormLabel, FormGroup, FormControlLabel, FormControl, FormHelperText etc.
    }

    return (
        <FormControl {...configFormControl} >
            <FormLabel component="legend" >{legend} </FormLabel>

            <FormGroup >
                <Field
                    as={FormControlLabel}
                    {...configCheckbox}
                />
            </FormGroup>

            {showHelper && <FormHelperText>{helperText || ' '}</FormHelperText>}

        </FormControl>
    )
}

export default CheckboxWrapper;
