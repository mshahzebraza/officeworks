import React from 'react'
import FormControls from './FormControls'
import { Grid } from '@mui/material'


function GridWrapper({ children, gridSpan = 6 }) {
    return <Grid item xs={gridSpan} >{children}</Grid>
}

function FormikControl(props) {
    const { control = 'text', gridSpan, ...rest } = props

    switch (control) {
        case 'text':
            return <GridWrapper gridSpan={gridSpan} ><FormControls.TextField {...rest} /></GridWrapper>
        //   return <Input {...rest} />
        case 'textarea':
            return <GridWrapper gridSpan={gridSpan} ><FormControls.TextField  {...rest} /></GridWrapper>
        // return <Textarea {...rest} />
        case 'select':
            return <GridWrapper gridSpan={gridSpan} ><FormControls.Select {...rest} /></GridWrapper>
        case 'comboBox':
            return <GridWrapper gridSpan={gridSpan} ><FormControls.ComboBox {...rest} /></GridWrapper>
        case 'radio':
            return <GridWrapper gridSpan={gridSpan} ><FormControls.Radio {...rest} /></GridWrapper> // legend, name, options <[array of objects]>
        case 'dateTimePicker':
            return <GridWrapper gridSpan={gridSpan} ><FormControls.DateTimePicker {...rest} /></GridWrapper> // legend, name, options <[array of objects]>
        case 'checkBox':
            return <GridWrapper gridSpan={gridSpan} ><FormControls.Checkbox {...rest} /></GridWrapper> // legend, name, options <[array of objects]>
        case 'checkBoxList':
            return <GridWrapper gridSpan={gridSpan} ><FormControls.CheckboxList  {...rest} /></GridWrapper> // legend, name, options <[array of objects]>
        case 'fieldArray':
            return <GridWrapper gridSpan={gridSpan} ><FormControls.FieldArray  {...rest} /></GridWrapper> // legend, name, options <[array of objects]>
        case 'nestedFieldArray':
            return <GridWrapper gridSpan={gridSpan} ><FormControls.FieldArrayNested {...rest} /></GridWrapper> // legend, name, fieldName, structure
        case 'submit':
            return <GridWrapper gridSpan={gridSpan} ><FormControls.Submit {...rest} /></GridWrapper> // legend, name, fieldName, structure
        // return <FieldListPair {...rest} />
        default:
            return null
    }
}

export default FormikControl;
