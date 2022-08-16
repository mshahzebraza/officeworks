import React from 'react'
import { Field, useField } from 'formik'
import TextField from '@mui/material/TextField'


function TextFieldWrapper(props) {

    // fetching props from the parent component and field input
    const { name, ...restProps } = props
    const [__, meta] = useField(name);
    const errorText = meta?.touched && meta?.error;

    // config for TextField props
    const configTextField = {

        name,
        // ? passing the name directly to the Field component is an alternative of passing
        // ? name + { ...useField().field } 
        // ? as a prop to any input (TextField in this case) component

        fullWidth: true,
        variant: 'outlined',
        size: 'small',
        error: Boolean(errorText),
        helperText: errorText || ' ', //? empty string is a default to leave space below

        ...restProps,
        // restProps can override hardcoded default props
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
