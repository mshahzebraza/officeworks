import React from 'react'
import { Field, useField } from 'formik'
import { Autocomplete, MenuItem, TextField/* , Select */ } from '@mui/material'



// ! Under Process - Not Working Yet
function GroupedDDWrapper(props) {
    // fetching props from the parent component and field input
    const { label, name, options = [], ...restProps } = props
    console.log('Group DD props', props)

    const [_, meta] = useField(name);
    const errorText = meta?.touched && meta?.error;


    // config for SelectWrappper props
    const configAutoComplete = {
        // name,
        // select: true,
        error: !!errorText,
        helperText: errorText || ' ',
        options: options.sort((a, b) => -b.groupBy.localeCompare(a.groupBy)),
        groupBy: (option) => option.groupBy,
        getOptionLabel: (option) => option.label,

        // ...field,
        ...restProps,
        // restProps can override hardcoded default props

        fullWidth: true,
        variant: 'outlined',
        size: 'small',
    }

    const myAutoComplete = (props) => <Autocomplete

        renderInput={
            (params) => <TextField
                {...params}
                label={label}
                name={name}
            />
        }
    />


    return (

        <>
            <Field
                as={myAutoComplete} // ! create a select component as well
                // https://www.youtube.com/watch?v=wAvkbSYdyRU&t=367s
                // 20 min - time to create a select component (tags)
                {...configAutoComplete}



            />
        </>

    )


}

export default GroupedDDWrapper;




