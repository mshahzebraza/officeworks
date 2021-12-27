import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import { concatStrings } from '../../helpers/reusable'

function Input(props) {
  // Extract the following
  // labelStyles, errorStyles, inputStyles, controlStyles
  const { label, name, labelStyles, errorStyles, inputStyles, controlStyles, ...rest } = props
  return (
    <div className={concatStrings(['form-control', ...concatStrings(errorStyles)])}>
      <label htmlFor={name} className={concatStrings(labelStyles)}>{label}</label>
      <Field id={name} name={name} {...rest} className={concatStrings(inputStyles)} />
      <ErrorMessage component={TextError} name={name} className={concatStrings(errorStyles)} />
    </div>
  )
}

export default Input
