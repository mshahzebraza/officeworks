import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styles from './formik.module.scss'

function Textarea(props) {
  const { label, name, ...rest } = props

  return (

    <div className={styles.formControl}>

      <label
        htmlFor={name}
        className={styles.formKey}
      >
        {label}
      </label>


      <Field
        name={name}
      >
        {
          ({ field, form, meta }) => {
            return (
              <textarea
                id={name}
                name={name}
                className={`
                  ${styles.formField}
                  ${styles.formFieldArea}
                  ${meta.touched && meta.error ? styles.formFieldError : ''}
                  `}
                {...rest}
                {...field}
              />
            )
          }
        }
      </Field>

      <ErrorMessage component='div' name={name} className={styles.formError} />

    </div>
  )
}

export default Textarea
