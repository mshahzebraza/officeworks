import { Grid } from "@mui/material";
import { RemoveFAentry } from './components';
import FAEntry from './FAEntry';

/**
 * Renders the set of all form-fields for a field-array along with the button to cancel insertion/ delete field-array. 
 * @param  {{}} fieldAddress an object containing the "name" attributes of the parent form-elements. This is updated on each new nested level to create a unique name for each of the form-element present in the lowest level. At this level, field-name is "null"
 * @example {collection:"collectionName", entry:"indexOfEntry", field:"nameOfNestedField"}  
 * @param  {[]} fieldConfigArr=[] an array with each object corresponding to a set of renderProps for each of the nestedFields
 * @param  {String} removeText The text for the cancel button. The IconButton Will be rendered if no removeText is provided
 * @param  {ReactJSXElement} removeIcon Icon to be used for remove button. In absence of removeText, this will be used in IconButton, otherwise it will be placed at the start of the Button. 
 * @param  {Function} removeEntry function to remove the current entry.
 */
export default function FAEntryContainer({
    fieldAddress = {},
    fieldConfigArr,
    removeEntry,
    removeIcon,
    removeText,
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
                removeEntry={removeEntry}
                removeIcon={removeIcon}
                removeText={removeText}
            />
        </Grid>);
}

