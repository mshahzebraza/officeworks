import React from 'react'
import { Grid } from '@mui/material';
import { AddFAentry, FAEntryHelperText } from './components';
import FAEntryContainer from './FAEntryContainer';


/**
 * renders the collection of nested fields (based on initial-data and fields' config) and buttons for addition or removal of Field-Array-Entries
 * @param  {{}} fieldAddress={}
 * @param  {Function} pushEntry
 * @param  {Function} removeEntry function to remove the current entry. Requires FAentryIdx to work and remove the correct entry.
 * @param  {String} [addText] text for Button of Field-Array-Addition
 * @param  {} [addIcon] icon for Button of Field-Array-Addition
 * @param  {String} [removeText] text for Button of Field-Array-Removal
 * @param  {} [removeIcon] icon for Button of Field-Array-Removal
 * @param  {{{}}} collectionState={} combined state for the values,errors,touched states of each Field-Array Collection. Each of the 3 state is an array. Each array-item corresponds to the state (values,errors,touched) of each new entry of the Field Array.  
 * @param  {[{}]} fieldConfigArr An Array, each item of whose is a set of renderProps for the each of the nested-form-element
 * @param  {Boolean} showHelper - Should a helper be shown for the Field-Array ?
 * @param  {} defaultFAfieldValues the default values for the newly created nested-fields upon clicking the new-entry-btn
 */
export default function InnerForm({
    fieldAddress = {},
    pushEntry = () => { },
    removeEntry = () => { },
    addText,
    addIcon,
    removeText,
    removeIcon,
    collectionState = {},
    fieldConfigArr,
    showHelper,
    defaultFAfieldValues,

}) {
    const {
        values: collectionValues,
        touched: collectionTouched = [],
        errors: collectionErrors = []
    } = collectionState

    return (// Fields + Add Button
        <Grid container spacing={1.5}>
            {
                !!collectionValues?.length &&
                // creating the JSX elements for each of the available Field-Array-Entry. (the objects in  collectionValues correspond to the Field-Array-Entries available in the Field-Array)
                Array(collectionValues.length).fill(null).map(
                    (_, FAentryIdx) => {

                        // Update field address
                        fieldAddress = { ...fieldAddress, entry: FAentryIdx }
                        // collectionTouched will remain undefined until at-least 01 nested fields are touched after form opens
                        const FAentryTouchedState = collectionTouched?.[FAentryIdx]
                        // collectionErrors will remain undefined until at-least 01 nested fields are empty and invalid (after they are touched)
                        const FAentryErrorsState = collectionErrors?.[FAentryIdx]

                        return (// {Input + Button} + CollectionHelper // FieldArrayCollectionContainer
                            <React.Fragment key={FAentryIdx}>
                                <FAEntryContainer
                                    fieldAddress={fieldAddress}
                                    fieldConfigArr={fieldConfigArr}
                                    removeEntry={() => removeEntry(FAentryIdx)}
                                    removeIcon={removeIcon}
                                    removeText={removeText}
                                />
                                <FAEntryHelperText
                                    showHelper={showHelper}
                                    FAentryTouchedState={FAentryTouchedState}
                                    FAentryErrorsState={FAentryErrorsState}
                                />
                            </React.Fragment>
                        );
                    })}

            <AddFAentry
                pushEntry={pushEntry}
                defaultFieldValues={defaultFAfieldValues}
                addText={addText}
                addIcon={addIcon}
            />

        </Grid >);
}

