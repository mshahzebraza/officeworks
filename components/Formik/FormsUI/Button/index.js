import { Button } from '@mui/material'
import { useFormikContext } from 'formik'
import React from 'react'

function ButtonWrapper(props) {

    // fetching props from the parent component
    const { children, ...restProps } = props

    // to manually submit the form
    const { submitForm } = useFormikContext()
    function handleSubmit() {
        submitForm()
    }

    const configButton = {
        variant: 'contained',
        color: 'primary',
        fullWidth: true,
        color: 'warning',
        // size: 'small',

        onClick: handleSubmit,
        ...restProps,
    }

    return (
        <Button
            {...configButton}
            onClick={handleSubmit}
        >
            {children}
        </Button>
    )
}

export default ButtonWrapper    