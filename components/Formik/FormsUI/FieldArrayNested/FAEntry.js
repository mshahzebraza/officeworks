import React from 'react'
import { FAControl } from './FAControl'

const FAEntry = ({
    fieldAddress = {},
    fieldConfigArr,
}) => {


    return (
        // Map through each entry and transform the entry config data into props for corresponding form control
        fieldConfigArr.map((fieldConfig, idx) => {

            // Update field address
            const { name: fieldName, ...restFieldConfig } = fieldConfig

            fieldAddress = { ...fieldAddress, field: fieldName }

            return <FAControl
                key={idx}
                fieldAddress={fieldAddress}
                fieldConfig={restFieldConfig}
            />
        })
    )
}

export default FAEntry