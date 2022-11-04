import React from 'react'
import TextField from '@mui/material/TextField'
import { Field, useField } from 'formik';


function DateTimePicker(props) {

    // fetching props from the parent component and field input
    const { name, ...restProps } = props;
    const [__, meta] = useField(name);
    const errorText = meta?.touched && meta.error;

    // config for DateTimePicker props
    const configDateTimePicker = {
        name,
        type: 'date',


        error: errorText,
        helperText: errorText || " ",

        ...restProps,
        // ? this is something that you have to do with time/date pickers
        InputLabelProps: {
            shrink: true,
        },


        fullWidth: true,
        variant: 'outlined',
        size: 'small',
    }


    return (
        <Field as={TextField} {...configDateTimePicker} />
    )
}

export default DateTimePicker;
