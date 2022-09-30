import { Button } from '@mui/material'
import React from 'react'


function FormikSubmit({ disabled = false, children = 'Submit', outerClasses = [] }) {
    return (
        <Button type="submit" variant='contained' disabled={disabled} /*  className={concatStrings([styles.formSubmit, ...outerClasses])} */ >{children}</Button>
    )
}

export default FormikSubmit
