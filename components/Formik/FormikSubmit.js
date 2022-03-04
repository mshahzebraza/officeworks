import React, { Children } from 'react'
import { concatStrings } from '../../helpers/reusable'
import styles from './formik.module.scss'

function FormikSubmit({ disabled = false, children = 'Submit', outerClasses = [] }) {
  return (
    <button type="submit" disabled={disabled} className={concatStrings([styles.formSubmit, ...outerClasses])} >{children}</button>
  )
}

export default FormikSubmit
