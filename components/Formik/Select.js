import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styles from './formik.module.scss'

function Select(props) {
  const { label, name, options, ...rest } = props
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
            return <select
              id={name}
              name={name}
              {...rest}
              {...field}
              className={`
              ${styles.formField}
              ${styles.formFieldList}
              ${meta.touched && meta.error ? styles.formFieldError : ''}
              `}
            >
              {
                options.map(option => {
                  return (
                    <option
                      key={option.value}
                      value={option.value}
                      className={styles.formFieldListItem}
                    >
                      {option.key}
                    </option>
                  )
                })
              }
            </select>
          }
        }
      </Field>

      <ErrorMessage component='div' name={name} className={styles.formError} />

    </div>
  )
}

export default Select
