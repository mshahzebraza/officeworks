import React from 'react'
import { FormHelperText, Grid } from '@mui/material';
import { AddFAentry } from './components';
import FAEntryContainer from './FAEntryContainer';


function FAErrorText({ showHelper, touched, error }) {

    if (!showHelper) return null; // Do not reserve any empty line until there is any entry
    if (!touched?.length) return null; // Do not reserve any empty line until there is any entry
    if (typeof error !== "string") error = " "; // Reserve an empty line until the error is present


    return (<Grid item xs={12} >
        <FormHelperText error={true} sx={{
            m: 0
        }}>
            {error}
        </FormHelperText>
    </Grid>);
}


/**
 * renders the collection of nested fields (based on initial-data and fields' config) and button to add or removeEntry nested-fields  
 * @param  {string} name
 * @param  {Function} pushEntry
 * @param  {Function} removeEntry
 * @param  {{}} touched
 * @param  {{}} errors
 * @param  {{}} collectionValues
 * @param  {{}} collectionTouched
 * @param  {{}} collectionErrors
 * @param  {{}} fieldConfigArr
 * @param  {Boolean} showHelper
 * @param  {string} label
 * @param  {{}} defaultFAfieldValues - the default values for the newly created nested-fields upon clicking the new-entry-btn
 */
export default function InnerForm({
    fieldAddress = {},
    name,
    pushEntry = () => { },
    removeEntry = () => { },
    addText,
    removeText,
    removeIcon,
    addIcon,
    collectionState = {},
    fieldConfigArr,
    showHelper,
    defaultFAfieldValues,

}) {
    const { values: collectionValues, touched: collectionTouched, errors: collectionErrors } = collectionState

    return (// Fields + Add Button
        <Grid container spacing={1.5}>
            {
                !!collectionValues?.length &&
                collectionValues.map(
                    (_, FAentryIdx) => {

                        // Update field address
                        fieldAddress = { ...fieldAddress, entry: FAentryIdx }

                        return (// {Input + Button} + CollectionHelper // FieldArrayCollectionContainer
                            <FAEntryContainer
                                key={FAentryIdx}
                                fieldAddress={fieldAddress}
                                removeText={removeText}
                                removeIcon={removeIcon}
                                // collectionState={collectionState}
                                name={name}
                                removeEntry={removeEntry}
                                fieldConfigArr={fieldConfigArr}
                                FAentryIdx={FAentryIdx}
                            />
                        );
                    })}
            <FAErrorText showHelper={showHelper} error={collectionErrors} touched={collectionTouched} />
            <AddFAentry
                pushEntry={pushEntry}
                defaultFieldValues={defaultFAfieldValues}
                addText={addText}
                addIcon={addIcon}
            />

        </Grid >);
}

