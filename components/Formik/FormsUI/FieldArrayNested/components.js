import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Grid, FormHelperText, FormLabel, IconButton } from '@mui/material';
import TextField from '../TextField';
import Button from '@mui/material/Button';



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
    index,
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
                        onClick={() => removeEntry(index)}
                        startIcon={MyRemoveIcon && <MyRemoveIcon />}
                        // disabled={index === 0}
                        fullWidth
                    >
                        {removeText}
                    </Button>
                    :
                    <IconButton
                        onClick={() => removeEntry(index)}
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