import TextField from './FormsUI/TextField'
import Select from './FormsUI/Select'
import DateTimePicker from './FormsUI/DateTimePicker'
import Checkbox from './FormsUI/Checkbox'
import Submit from './FormsUI/Submit'
import Radio from './FormsUI/Radio'
import CheckboxList from './FormsUI/CheckboxList'
import FieldArray from './FormsUI/FieldArray'
import FieldArrayNested from './FormsUI/FieldArrayNested'
import ComboBox from './FormsUI/ComboBox'

const FormControls = {
    TextField, // includes email, phone, text, text-area
    Select, // drop-down // TODO: can be extended for multiSelect etc.
    ComboBox,
    DateTimePicker,
    Checkbox, // Toggler // TODO: Multi-Checks functionality to add
    Radio,
    CheckboxList,
    Submit,
    FieldArray, // customization plan: minFields, maxFields, Dividers, addButtonText, removeButtonText, addButtonIcon, removeButtonIcon
    FieldArrayNested,
}

export default FormControls;



