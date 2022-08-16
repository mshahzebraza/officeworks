import React from 'react'
import { Field, useField } from 'formik'
import { MenuItem, TextField/* , Select */ } from '@mui/material'

function SelectWrapper(props) {
    // fetching props from the parent component and field input
    const { name, options = [], ...restProps } = props

    const [_, meta] = useField(name);
    const errorText = meta?.touched && meta?.error;


    // config for SelectWrappper props
    const configSelect = {
        name,
        select: true,

        error: !!errorText,
        helperText: errorText || ' ',
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


