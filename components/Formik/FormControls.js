import React from 'react'
import TextField from './FormsUI/TextField'
import TextArea from './FormsUI/MUI_TextArea'
import Select from './FormsUI/Select'
import CheckboxGroup from './FormsUI/CheckboxGroup'
import FieldList from './FormsUI/MUI_FieldList'
import FieldListPair from './FormsUI/MUI_FieldListPair'
import DateTimePicker from './FormsUI/DateTimePicker'
import Checkbox from './FormsUI/Checkbox'
import Button from './FormsUI/Button'
import Radio from './FormsUI/Radio'
import RadioButtons from './FormsUI/MUI_RadioButtons'
import CheckboxList from './FormsUI/CheckboxList'
import FieldArray from './FormsUI/FieldArray'
import FieldArrayNested from './FormsUI/FieldArrayNested'

const FormControls = {
    TextField, // includes email, phone, text, text-area
    Select, // drop-down // TODO: can be extended for multiSelect etc.
    DateTimePicker,
    Checkbox, // Toggler // TODO: Multi-Checks functionality to add
    Radio,
    CheckboxList,
    Button,
    FieldArray, // customization plan: minFields, maxFields, Dividers, addButtonText, removeButtonText, addButtonIcon, removeButtonIcon
    FieldArrayNested,


    TextArea, // replaced by TextField multiline
    RadioButtons,
    CheckboxGroup,
    FieldList,
    FieldListPair
}

export default FormControls;



