import { Form } from 'formik'
import React from 'react'
import { concatStrings } from '../../helpers/reusable'
import styles from './formik.module.scss';

function FormikForm({ children, outerClasses = [] }) {
  return (
    <Form className={concatStrings([styles.form, ...outerClasses])} >
      {children}
    </Form>
  )
}

export default FormikForm
