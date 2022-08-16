import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styles from '../formik.module.scss'

function AutoComplete(props) {
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
                                   <input
                                        id={name}
                                        name={name}
                                        className={`
              ${styles.formField}
              ${meta.touched && meta.error ? styles.formFieldError : ''}
              `}
                                        {...rest} // type attribute
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

export default Input

// ${formik.errors[name] && styles.formFieldError}

