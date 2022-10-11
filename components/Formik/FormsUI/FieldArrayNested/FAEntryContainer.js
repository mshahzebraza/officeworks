import { Grid } from "@mui/material";
import { RemoveFAentry } from './components';
import FAEntry from './FAEntry';


export default function FAEntryContainer({
    fieldAddress = {},
    fieldConfigArr,
    removeText,
    removeIcon,
    FAentryIdx,
    removeEntry
}) {

    // form states for phones[0], phones[1] etc.
    return (
        <Grid item direction='row' container xs={12} spacing={2} >

            {/* FA Entry - An Array of fields (inputs) */}
            <FAEntry
                fieldAddress={fieldAddress}
                fieldConfigArr={fieldConfigArr}
            />

            {/* Delete FA Entry */}
            <RemoveFAentry
                index={FAentryIdx}
                removeEntry={removeEntry}
                removeText={removeText}
                removeIcon={removeIcon}
            />

        </Grid>);
}

