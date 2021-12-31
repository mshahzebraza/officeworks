import React from 'react'
import { FieldArray, Field, ErrorMessage } from 'formik'
import styles from './formik.module.scss'

function KeyFieldList(props) {
  const { label, name, options, ...rest } = props
  return (
    <div className={styles.formControl}>

      <label className={styles.formKey} htmlFor={name} > {label} </label>

      <FieldArray name={name}>
        {(fieldArrayProps) => {

          const { push, remove, form } = fieldArrayProps
          const { values } = form
          const fieldListData = values[name]

          return (
            <div className={`${styles.formField} ${styles.formFieldPairArray}`}  >
              {fieldListData.map((curValue, index) => (

                <div key={index} className={styles.formFieldPairArrayItem}>

                  <Field name={`${name}[${index}][0]`} placeholder='key' {...rest} className={styles.formFieldPairArrayItemLabel} />
                  <Field name={`${name}[${index}][1]`} placeholder='value' {...rest} className={styles.formFieldPairArrayItemInput} />

                  {index > 0 && <Button click={() => remove(index)} className={styles.formFieldPairArrayItemButton} > - </Button>
                  }

                </div>
              ))}

              <Button click={() => push(['', ''])} className={styles.formFieldPairArrayButton} > + </Button>

            </div>
          )
        }}
      </FieldArray>
    </div>
  )
}

export default KeyFieldList


export function Button({ type = 'button', click = () => { console.log('clicked me!') }, children, ...rest }) {

  return <button type={type} onClick={click} {...rest} >
    {children}
  </button>
}