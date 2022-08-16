import React, { Children } from 'react'
import { concatStrings } from '../../helpers/reusable'
import styles from '../formik.module.scss'

function FormikSubmit({ children = 'Submit', outerClasses = [] }) {
     return (
          <button type="submit" className={concatStrings([styles.formSubmit, ...outerClasses])} >{children}</button>
     )
}

export default FormikSubmit
