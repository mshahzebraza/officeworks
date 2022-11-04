import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Field, useField, useFormikContext } from 'formik';
import React from 'react'


function RadioWrapper({
    name,
    legend,
    options = [],
    row = false,
    showHelper = false,
    customHelperText = null,
    ...restProps
}) {
    // fetching props from the parent component and field input
    const [_, meta] = useField(name);
    const { touched, error } = meta;

    const isError = !!touched && !!error; // apply error styles in case the input in not valid
    const errorText = !!touched && error; // apply error styles in case the input in not valid
    const helperText = customHelperText || errorText; // prioritize the customHelperText over the default error-text

    // config Array for Radios' props
    const configArray = options.map(({ value, label }) => { //TODO: change the format of options

        return {
            name,
            ...restProps,
            as: FormControlLabel, //just a container for FormControlLabel
            label,
            value,
            control: <Radio />,
        }
    })

    // config for FormControl - useful for error handling of radios
    const configFormControl = {
        error: isError,
    };

    return (
        <FormControl {...configFormControl} component='fieldset' >
            <FormLabel component="legend">{legend}</FormLabel>

            <RadioGroup row={row}  >
                {
                    configArray.map((config, index) => {
                        return (
                            <Field
                                key={index}
                                {...config}
                            />
                        )
                    })
                }
            </RadioGroup>

            {showHelper && <FormHelperText>{helperText || ' '}</FormHelperText>}

        </FormControl>
    )
}

export default RadioWrapper;
