import React from 'react'
import { FieldArray } from 'formik'
import { FormControl } from '@mui/material';
import { FALegend } from './components';
import { getNestedInitVal } from './helpers';
import InnerForm from './InnerForm';
/**
 * @param  {} legend
 * @param  {} name
 * @param  {} label='UnnamedField'
 * @param  {} fieldConfigArr
 * @param  {} showHelper=false
 * @param  {AddIcon} addIcon
 * @param  {} addText
 * @param  {RemoveIcon} removeIcon
 * @param  {} removeText
 */

function FieldArrayNested({
    name,
    legend = 'Add the entries please.',
    showHelper = false,
    fieldConfigArr = [],

    addIcon,
    addText,
    removeIcon,
    removeText,
    ...rest
}) {

    const defaultFAfieldValues = getNestedInitVal(fieldConfigArr)
    if (!Object.keys(defaultFAfieldValues).length) throw new Error('No defaultFAfieldValues is defined for the nested-fields');

    return (
        <FormControl component="fieldset" fullWidth>

            <FALegend legend={legend} />

            <FieldArray name={name} >
                {(fieldArrayHelpers) => {

                    const { push: pushEntry, remove: removeEntry, form } = fieldArrayHelpers
                    // ? Form States for phones(field array of nested fields)
                    const { values, touched, errors } = form

                    // Update collectionState
                    const collectionState = { values: values[name], touched: touched[name], errors: errors[name] }

                    // create an object for storing the names of collection,entries,and fields
                    const fieldAddress = { collection: name, entry: null, field: null, }

                    // Render NestedFormCollection
                    return (
                        <InnerForm
                            fieldAddress={fieldAddress}
                            name={name}
                            pushEntry={pushEntry}
                            removeEntry={removeEntry}
                            addIcon={addIcon}
                            removeIcon={removeIcon}
                            addText={addText}
                            removeText={removeText}
                            collectionState={collectionState}
                            fieldConfigArr={fieldConfigArr}
                            showHelper={showHelper}
                            defaultFAfieldValues={defaultFAfieldValues}
                        />
                    );
                }}
            </FieldArray>

        </FormControl >
    )
}

export default FieldArrayNested;
