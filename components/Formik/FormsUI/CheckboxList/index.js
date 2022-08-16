import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel
} from '@mui/material'
import { Field, useField, useFormikContext } from 'formik';
import React, { useState } from 'react'

import { Favorite, FavoriteBorder, Bookmark, BookmarkBorder } from '@mui/icons-material';


function CheckboxListWrapper({
    name,
    legend,
    options = [],
    row = false,
    showSelectAll = false,
    showHelper = false,
    ...restProps
}) {


    const [field, meta, helpers] = useField(name);
    const errorText = meta?.touched && meta?.error;

    // config Array for Checkboxes' props
    const configArray = options.map(({ value, label, icon, checkedIcon }) => { //TODO: change the format of options

        return {
            name,
            ...restProps,
            as: FormControlLabel, //just a container for FormControlLabel
            label,
            value,
            checked: field?.value?.includes(value),
            control: <Checkbox /* icon={????} */ /* checkedIcon={?????} */ />,
        }
    })

    // config for FormControl - useful for error handling of checkboxes
    const configFormControl = {
        error: !!errorText,
    };

    return (
        <FormControl {...configFormControl} component='fieldset' >
            <FormLabel component="legend" >{legend}</FormLabel>

            <FormGroup row={row}  >
                {
                    configArray.map((config, idx) => (
                        <Field key={idx} {...config} />
                    ))
                }

                {/* comment this out if "Select All" Checkbox is not required */}
                {showSelectAll && (
                    <FormControlLabel
                        label="Select All"
                        control={
                            <Checkbox
                                onChange={(e) => {
                                    const allValues = options.map(({ value }) => value);
                                    // if selected, check all checkboxes
                                    const checkedValues = e.target.checked ? allValues : [];
                                    helpers.setValue(checkedValues);
                                }}
                            />
                        }
                    />
                )}

            </FormGroup>

            {showHelper && <FormHelperText>{errorText || ' '}</FormHelperText>}


        </FormControl>
    )
}

export default CheckboxListWrapper;
