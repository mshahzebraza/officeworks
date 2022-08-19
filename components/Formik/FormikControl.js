import React from 'react'
import FormControls from './FormControls'
import { Grid } from '@mui/material'


function GridWrapper({ children, gridSize = 6 }) {
    return <Grid item xs={gridSize} >{children}</Grid>
}

function FormikControl(props) {
    const { control, gridSize, ...rest } = props

    switch (control) {
        case 'input':
            return <GridWrapper gridSize={gridSize} ><FormControls.TextField {...rest} /></GridWrapper>
        //   return <Input {...rest} />
        case 'textarea':
            return <GridWrapper gridSize={gridSize} ><FormControls.TextField multiline rows={4} {...rest} /></GridWrapper>
        // return <Textarea {...rest} />
        case 'select':
            return <GridWrapper gridSize={gridSize} ><FormControls.Select {...rest} /></GridWrapper>
        case 'combobox':
            return <GridWrapper gridSize={gridSize} ><FormControls.ComboBox {...rest} /></GridWrapper>
        case 'radio':
            return <GridWrapper gridSize={gridSize} ><FormControls.Radio row {...rest} /></GridWrapper> // legend, name, options <[array of objects]>
        case 'checkbox':
            return <GridWrapper gridSize={gridSize} ><FormControls.CheckboxList row {...rest} /></GridWrapper> // legend, name, options <[array of objects]>
        // case 'fieldList':
        //     return <FieldList {...rest} /> 
        case 'fieldListPair':
            return <GridWrapper gridSize={gridSize} ><FormControls.FieldArrayNested {...rest} /></GridWrapper> // legend, name, fieldName, structure
        // return <FieldListPair {...rest} />
        default:
            return null
    }
}

export default FormikControl;
