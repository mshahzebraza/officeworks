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


function GridWrapper(customComponent) {
    return <Grid item xs={12} >{customComponent}</Grid>
}


function FormikControl(props) {
    console.log('')
    const { control, ...rest } = props
    console.log(`FormikControl props: [${control}] `, rest)

    switch (control) {
        case 'input':
            return <FormControls.TextField {...rest} />
        //   return <Input {...rest} />
        case 'textarea':
            return <FormControls.TextField multiline rows={4} {...rest} />
        // return <Textarea {...rest} />
        case 'select':
            return <FormControls.Select {...rest} />
        case 'radio':
            return <FormControls.Radio row {...rest} /> // legend, name, options <[array of objects]>
        case 'checkbox':
            return <FormControls.CheckboxList row {...rest} /> // legend, name, options <[array of objects]>
        // case 'fieldList':
        //     return <FieldList {...rest} /> 
        case 'fieldListPair':
            return <FormControls.FieldArrayNested {...rest} /> // legend, name, fieldName, structure
        // return <FieldListPair {...rest} />
        default:
            return null
    }
}

export default FormikControl
