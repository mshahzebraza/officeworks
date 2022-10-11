import React from 'react'
import { Field, useField } from 'formik'
import TextField from '@mui/material/TextField'

// checkIt :
/**
 * @param  {boolean} props.resetHelperStyles - style the helper-text as anerror only if the "reset-helper-style" is "Falsy" AND "error-text" is "Truthy" - should be called as noErrorStyles
 */
function TextFieldWrapper(props) {

    // fetching props from the parent component and field input
    const { name, showHelper = false, customHelperText = null, ...restProps } = props
    const [__, meta] = useField(name);
    const { touched, error } = meta;
    const isError = !!touched && !!error; // apply error styles in case the input in not valid
    const errorText = !!touched && error; // apply error styles in case the input in not valid
    const helperText = customHelperText || errorText; // prioritize the customHelperText over the default error-text

    // config for TextField props
    const configTextField = {
        name,
        fullWidth: true,
        variant: 'outlined',
        size: 'small',
        error: isError, // show error only if showHelper is true && field is touched
        helperText: showHelper && (helperText || ' '),
        ...restProps,
    }


    return (
        <Field
            as={TextField} // which is basically an input (so props are passed to input tag)
            {...configTextField}
        />
    )

}

export default TextFieldWrapper;

// ${formik.errors[name] && styles.formFieldError}
