import React from 'react'
import { FieldArray, Field, ErrorMessage } from 'formik'
import styles from './formik.module.scss'

function FieldListPair(props) {


  let { label, name, options, placeholders, inputFieldType, ...rest } = props
  placeholders = !placeholders ? ['key', 'value'] : placeholders
  inputFieldType = !inputFieldType ? null : inputFieldType;

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

                  <Field name={`${name}[${index}][0]`} placeholder={placeholders[0]} type='text' {...rest} className={styles.formFieldPairArrayItemLabel} />
                  <Field name={`${name}[${index}][1]`} placeholder={placeholders[1]} as={inputFieldType} {...rest} className={styles.formFieldPairArrayItemInput} />

                  {index > 0 && <Button click={() => remove(index)} className={styles.formFieldPairArrayItemButton} > Remove </Button>
                  }

                </div>
              ))}

              <Button click={() => push(['', ''])} className={styles.formFieldPairArrayButton} > Add </Button>

            </div>
          )
        }}
      </FieldArray>
    </div>
  )
}

export default FieldListPair


export function Button({ type = 'button', click = () => { console.log('clicked me!') }, children, ...rest }) {

  return <button type={type} onClick={click} {...rest} >
    {children}
  </button>
}