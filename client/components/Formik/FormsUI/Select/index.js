import React from 'react'
import { Field, useField } from 'formik'
import { MenuItem, TextField/* , Select */ } from '@mui/material'

function SelectWrapper(props) {
    // fetching props from the parent component and field input
    const { name, options = [], showHelper = false, customHelperText = null, ...restProps } = props

    const [__, meta] = useField(name);
    const { touched, error } = meta;
    const isError = !!touched && !!error; // apply error styles in case the input in not valid
    const errorText = !!touched && error; // apply error styles in case the input in not valid
    const helperText = customHelperText || errorText; // prioritize the customHelperText over the default error-text


    // config for SelectWrappper props
    const configSelect = {
        name,
        select: true,

        error: isError,
        helperText: showHelper && (helperText || ' '),
        // ...field,
        ...restProps,
        // restProps can override hardcoded default props

        fullWidth: true,
        variant: 'outlined',
        size: 'small',
    }


    return (

        <>
            <Field
                as={TextField} // ! create a select component as well
                // https://www.youtube.com/watch?v=wAvkbSYdyRU&t=367s
                // 20 min - time to create a select component (tags)
                {...configSelect}
            >

                {
                    options.map(({ label, value }, idx) => (
                        <MenuItem key={idx} value={value} >
                            {label}
                        </MenuItem>
                    ))
                }
            </Field>
        </>

    )


}

export default SelectWrapper;


