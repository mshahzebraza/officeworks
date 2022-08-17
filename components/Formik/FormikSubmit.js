import { Button } from '@mui/material'
import React, { Children } from 'react'
import { concatStrings } from '../../helpers/reusable'
import styles from './formik.module.scss'


function FormikSubmit({ disabled = false, children = 'Submit', outerClasses = [] }) {
    return (
        <Button type="submit" variant='contained' disabled={disabled} /*  className={concatStrings([styles.formSubmit, ...outerClasses])} */ >{children}</Button>
    )
}

export default FormikSubmit
