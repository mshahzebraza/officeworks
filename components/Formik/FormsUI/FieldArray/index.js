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
        <Grid item xs={12}>
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
        <Grid item xs={10} >
            <TextField
                name={name} // is a substitute for value, onChange, onBlur, etc.
                {...rest}
                label={label}
                helperText={helperText} // to avoid the button from getting full height due to custom styles
            />
        </Grid>
    )
}


// FormControl
// |-- FormLabel
// |-- FormGroup (stack)
//     |-- FormControl (row)
//     |-- FormLabel
//     |-- TextField
//     |-- FormHelperText




function FieldList({
    legend,
    name,
    options,
    showHelper = false,
    // showDivider = false,
    structure = "",
    dividerText = '',
    fieldName = 'Unnamed Field',
    AddIcon,
    addText,
    RemoveIcon,
    removeText,
    ...rest
}) {
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
                                valuesOfThisFieldArray.map((curValue, index) => {

                                    const thisField = `${name}[${index}]`;
                                    const touchedThisField = getIn(touched, thisField);
                                    const errorThisField = getIn(errors, thisField);
                                    const errorText = touchedThisField && errorThisField;


                                    return (
                                        // {Input + Button} + Helper // collection
                                        <Grid item direction='row' container  /* spacing={1}  */ key={index} >

                                            {/* Input + Button */}
                                            <Grid item container xs={12} spacing={1} >
                                                {/* Input */}
                                                <FAtextField
                                                    rest={rest}
                                                    name={thisField}
                                                    label={`${fieldName} ${index + 1}`}
                                                    helperText={false} // to avoid the button from getting full height due to custom styles
                                                />

                                                {/* Button */}
                                                <FAcancelButton remove={remove} index={index}>Remove</FAcancelButton>
                                            </Grid>


                                            {/* Helper */}
                                            {showHelper && <FAhelperText errorText={errorText} />}


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

