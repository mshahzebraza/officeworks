import React from 'react'
import FormikControl from '../../FormikControl';
import { getFinalConfig } from './helpers';



export const FAControl = ({
    fieldAddress = {},
    fieldConfig = {},
}) => {

    const finalConfig = getFinalConfig(fieldConfig, fieldAddress)

    return (
        <FormikControl
            {...finalConfig}
        />
    )
}

