import React from 'react'
import { FieldArray, Field, ErrorMessage } from 'formik'
import styles from '../formik.module.scss'

function FieldList(props) {
     const { label, name, options, ...rest } = props;
     return (
          <div className={styles.formControl}>

               <label className={styles.formKey} htmlFor={name} > {label} </label>

               <FieldArray name={name}>
                    {(fieldArrayProps) => {

                         const { push, remove, form } = fieldArrayProps
                         const { values } = form
                         const fieldListData = values[name]
                         // console.log('Form errors', form.errors)
                         // console.log('Field Array Props', fieldArrayProps)

                         return (
                              <div className={`${styles.formField} ${styles.formFieldArray}`}  >
                                   {fieldListData.map((curValue, index) => (

                                        <div key={index} className={styles.formFieldArrayItem}>

                                             <Field name={`${name}[${index}]`} {...rest} className={styles.formFieldArrayItemInput} />

                                             {index > 0 && <Button click={() => remove(index)} className={styles.formFieldArrayItemButton} > - </Button>
                                             }

                                        </div>
                                   ))}

                                   <Button click={() => push('')} className={styles.formFieldArrayButton} > + </Button>

                              </div>
                         )
                    }}
               </FieldArray>
          </div>
     )
}

export default FieldList


export function Button({ type = 'button', click = () => { console.log('clicked me!') }, children, ...rest }) {

     return <button type={type} onClick={click} {...rest} >
          {children}
     </button>
}