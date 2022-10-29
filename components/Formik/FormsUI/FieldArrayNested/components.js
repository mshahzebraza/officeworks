import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Grid, FormHelperText, FormLabel, IconButton } from '@mui/material';
import TextField from '../TextField';
import Button from '@mui/material/Button';
import { getActiveFAentryHelperText } from './helpers';


/**
 * Renders the Helper Text for each of the Field-Array-Entry in the Field-Array-Collection.
 * The Helper Text will be a single string to address the errors of all fields contained inside a Field-Array-Entry.
 * This is done by rendering a single concatenated errorText for all the fields in the Field-Array-Entry.
 * In case, none of the field of the Field-Array-Entry has an error then a default text will be shown.  
 * NOTE: DO NOT SET DEFAULTS for the parameters OTHERWISE HELPER TEXT WON'T WORK
 * @param  {Boolean} showHelper decides if the line-space must be provided for helperText or not. If showHelper is true, a value (be it a placeholder) must be set to errorText. The value may be set (and hence space provided) with a fallback/placeholder helper if there is no error or fields are untouched.
 * @param  {{}} FAentryTouchedState the touched state data for the the FAentry. Each Property of the data corresponds the to a form-field and  will be have a Boolean Value
 * @param  {{}} FAentryErrorsState the errors state data for the the FAentry. Each Property of the data corresponds the to a form-field and will be have an errorText-string value based on the validation defined in the form
 */
export function FAEntryHelperText({ showHelper, FAentryTouchedState, FAentryErrorsState }) {
    if (!showHelper) return null; // don't leave the errorText space if showHelper is FALSY

    // create an error or a placeholder/fallback text for the errorText (fallback/placeholder must not be error styled)  
    const [helperText, isErrorActive] = getActiveFAentryHelperText(FAentryTouchedState, FAentryErrorsState)

    return (<Grid item xs={12} >
        <FormHelperText error={isErrorActive} sx={{
            m: 0
        }}>
            {helperText}
        </FormHelperText>
    </Grid>);
}

export function AddFAentry({
    pushEntry,
    defaultFieldValues = {},
    addText = 'Entry',
    addIcon: MyAddIcon = AddIcon,
    // children,
    ...rest
}) {
    return (
        <Grid item >
            <Button
                {...rest}
                variant="contained"
                onClick={() => pushEntry(defaultFieldValues)}
                startIcon={MyAddIcon && <MyAddIcon />}
            >
                Add {addText}
            </Button>
        </Grid>
    );
}

export function RemoveFAentry({
    removeEntry,
    removeText = null,
    removeIcon: MyRemoveIcon = CloseIcon,
}) {
    return (
        <Grid item xs={2}>


            {
                removeText ?
                    <Button
                        variant="outlined"
                        sx={{
                            py: .75
                        }}
                        onClick={removeEntry}
                        startIcon={MyRemoveIcon && <MyRemoveIcon />}
                        // disabled={index === 0}
                        fullWidth
                    >
                        {removeText}
                    </Button>
                    :
                    <IconButton
                        onClick={removeEntry}
                        size='small'
                        sx={{
                            border: "1.5px solid #999",
                            backgroundColor: '#eee',
                            my: .35,
                            "&:hover": {
                                backgroundColor: '#ffcfcf',
                                borderColor: "#9f2b2b",
                                color: "#9f2b2b",
                            }
                        }}
                    >
                        <MyRemoveIcon />
                    </IconButton>
            }


        </Grid>
    );
}

// ! REMOVE if un-used 
export function FAtextField({ name, label, helperText, ...rest }) {
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

export function FALegend({ legend }) {
    return (
        <FormLabel
            component="legend"
            sx={{
                marginBottom: 1.5
            }}
        >
            {legend}
        </FormLabel>);
}