import React from 'react'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import RadioButtons from './RadioButtons'
import CheckboxGroup from './CheckboxGroup'
import FieldList from './FieldList.js'
import FieldListPair from './FieldListPair.js'

import FormControls from './FormControls'
import { Grid } from '@mui/material'


function GridWrapper({ children, size = 6 }) {
    return <Grid item xs={size} >{children}</Grid>
}


function FormikControl(props) {
    const { control, ...rest } = props

    switch (control) {
        case 'input':
            return <GridWrapper><FormControls.TextField {...rest} /></GridWrapper>
        //   return <Input {...rest} />
        case 'textarea':
            return <GridWrapper size={12} ><FormControls.TextField multiline rows={4} {...rest} /></GridWrapper>
        // return <Textarea {...rest} />
        case 'select':
            return <GridWrapper><FormControls.Select {...rest} /></GridWrapper>
        case 'radio':
            return <GridWrapper><FormControls.Radio row {...rest} /></GridWrapper> // legend, name, options <[array of objects]>
        case 'checkbox':
            return <GridWrapper><FormControls.CheckboxList row {...rest} /></GridWrapper> // legend, name, options <[array of objects]>
        // case 'fieldList':
        //     return <FieldList {...rest} /> 
        case 'fieldListPair':
            return <GridWrapper><FormControls.FieldArrayNested {...rest} /></GridWrapper> // legend, name, fieldName, structure
        // return <FieldListPair {...rest} />
        default:
            return null
    }
}

export default FormikControl;
