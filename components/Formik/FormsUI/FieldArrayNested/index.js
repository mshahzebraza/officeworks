import React from 'react'
import { FieldArray, getIn } from 'formik'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { FormControl, FormLabel, Grid, FormHelperText } from '@mui/material';
import TextField from '../TextField';
import Button from '@mui/material/Button';



function FAaddButton(props) {
    return (
        <Grid item xs={4}>
            <Button variant="contained" onClick={() => props.push(props.structure)} startIcon={<AddIcon />}>{props.children}</Button>
        </Grid>
    );
}



function FAhelperText(props) {
    return (
        <Grid item xs={5}>
            <FormHelperText error={Boolean(props.errorText)}>
                {props.errorText || ' '}
            </FormHelperText>
        </Grid>
    );
}



function FAcancelButton(props) {
    return (
        <Grid item xs={2}>
            <Button
                variant="contained"
                sx={{
                    height: '100%'
                }}
                onClick={() => props.remove(props.index)}
                startIcon={<CloseIcon />}
                // disabled={index === 0}
                fullWidth
            >
                {props.children}
            </Button>
        </Grid>
    );
}


function FAtextField({ name, label, helperText, rest }) {
    return (
        <Grid item xs={5} >
            <TextField
                name={name} // is a substitute for value, onChange, onBlur, etc.
                {...rest}
                label={label}
                helperText={helperText} // to avoid the button from getting full height due to custom styles
            />
        </Grid>
    )
}



function FieldList({
    legend,
    name,
    options,
    showHelper = false,
    // showDivider = false,
    structure = {},
    dividerText = '',
    fieldName = 'Unnamed Field',
    AddIcon,
    addText,
    RemoveIcon,
    removeText,
    ...rest
}) {

    if (!Object.keys(structure).length) throw new Error('No Structure is defined for the nested-fields');


    return (
        <FormControl component="fieldset" fullWidth>

            <FormLabel component="legend" sx={{ marginBottom: 1.5 }} >{`${legend}(s)`}</FormLabel>

            <FieldArray name={name} >
                {(fieldArrayProps) => {

                    const { push, remove, form } = fieldArrayProps
                    const { values, touched, errors } = form
                    const valuesOfThisFieldArray = values[name] // gets the values of this field (field-array)

                    return (
                        // Fields + Add Button
                        <Grid container spacing={1.5} >

                            {!!valuesOfThisFieldArray?.length &&
                                valuesOfThisFieldArray.map((arrayItem, index) => {

                                    const structureKeys = Object.keys(structure)
                                    const thisParentField = `${name}[${index}]`; // ? name of parent of this field



                                    return (
                                        // {Input + Button} + Helper // collection
                                        <Grid item direction='row' container  /* spacing={1}  */ key={index} >

                                            {/* Input + Button */}
                                            <Grid item container xs={12} spacing={1} >
                                                {/* NestedInputs */}
                                                {
                                                    structureKeys.map((nestedName, nestedIndex) => {

                                                        const thisField = `${thisParentField}.${nestedName}`; // ? name of this field
                                                        const label = `${nestedName} ${index + 1}`;
                                                        return (
                                                            <FAtextField
                                                                name={thisField}
                                                                label={label}
                                                                helperText={false}
                                                                key={nestedIndex}
                                                            />
                                                        )
                                                    })
                                                }

                                                {/* Helpers */}
                                                <FAcancelButton remove={remove} index={index}>Remove</FAcancelButton>
                                                {
                                                    structureKeys.map((nestedName, nestedIndex) => {

                                                        const thisField = `${thisParentField}.${nestedName}`; // ? name of this field
                                                        const touchedThisField = getIn(touched, thisField);
                                                        const errorThisField = getIn(errors, thisField);
                                                        const errorText = touchedThisField && errorThisField;

                                                        // const label = `${nestedName} ${index + 1}`;
                                                        if (!showHelper) return null;

                                                        return (
                                                            <FAhelperText errorText={errorText} key={nestedIndex} />
                                                        )
                                                    })
                                                }
                                            </Grid>


                                        </Grid>
                                    )
                                })}
                            {/* Add Button */}
                            <FAaddButton push={push} structure={structure} >Add {fieldName}</FAaddButton>
                        </Grid>
                    );

                }}
            </FieldArray>
        </FormControl >
    )
}

export default FieldList;

