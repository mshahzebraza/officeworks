import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'
import styles from './formik.module.scss';

function FormikContainer() {
  const dropdownOptions = [
    { key: 'Select an option', value: '' },
    { key: 'Option 1', value: 'option1' },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option3' }
  ]
  const radioOptions = [
    { key: 'Option 1', value: 'rOption1' },
    { key: 'Option 2', value: 'rOption2' },
    { key: 'Option 3', value: 'rOption3' }
  ]
  const checkboxOptions = [
    { key: 'Option 1', value: 'cOption1' },
    { key: 'Option 2', value: 'cOption2' },
    { key: 'Option 3', value: 'cOption3' }
  ]
  const initialValues = {
    email: '',
    description: '',
    selectOption: '',
    radioOption: '',
    checkboxOption: [],
    fieldArr: [''],
    fieldArrPair: [['', '']],
  }
  const validationSchema = Yup.object({
    email: Yup.string().email('Must be a valid email').required('Required'),
    description: Yup.string().required('Required'),
    selectOption: Yup.string().required('Required'),
    radioOption: Yup.string().required('Required'),
    checkboxOption: Yup.array().min(1, 'Select at-least 01 option').max(2, 'Select 02 options at max'),
    fieldArr: Yup.array().min(1, 'Cannot be empty'),
    fieldArrPair: Yup.array().min(1, 'Cannot be empty'),
  }
  )
  const onSubmit = values => {
    console.log('Form data', values)
    // console.log('Saved data', JSON.parse(JSON.stringify(values)))
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => (

        <Form className={styles.form} >
          <FormikControl
            control='input'
            type='email'
            label='Email'
            name='email'
          />
          <FormikControl
            control='textarea' // type of textarea is 'text' by default
            label='Description'
            name='description'
          />
          <FormikControl
            control='select'
            label='Select a topic'
            name='selectOption'
            options={dropdownOptions}
          />
          <FormikControl
            control='radio'
            label='Radio topic'
            name='radioOption'
            options={radioOptions}
          />
          <FormikControl
            control='checkbox'
            label='Checkbox topics'
            name='checkboxOption'
            options={checkboxOptions}
          />
          <FormikControl
            control='fieldList'
            label='Field Array'
            name='fieldArr'
            type='text'
          />
          <FormikControl
            control='fieldListPair'
            label='Field Array Pair'
            name='fieldArrPair'
            type='text'
          />
          <button type='submit' className={styles.formSubmit} >Submit</button>
        </Form>
      )}
    </Formik>
  )
}

export default FormikContainer
