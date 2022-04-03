import React from 'react'
import { Field, ErrorMessage } from 'formik'
import styles from './formik.module.scss'

function Input(props) {
     const { label, name, datalist = null, ...rest } = props
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
                                        list={datalist?.length > 0 ? 'datalist' : null}
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
               {
                    datalist &&
                    <datalist id={'datalist'} >
                         {
                              datalist.map((item, index) => {
                                   return (
                                        <option key={index} value={item} />
                                   )
                              })
                         }
                    </datalist>
               }

               <ErrorMessage component='div' name={name} className={styles.formError} />

          </div>
     )
}

export default Input

// ${formik.errors[name] && styles.formFieldError}

