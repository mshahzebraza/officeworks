// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

// Store & Styles
import { projectActions } from '../../../../store/project/project-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
// import Form from '../../../Form/Form'
import FormikControl from '../../../Formik/FormikControl'







export default function AddProjectPart_Modal({ closer, projectCatName, projectId }) {
  const dispatch = useDispatch();

  // const dropdownOptions = [
  //   { key: 'Select an option', value: '' },
  //   { key: 'Option 1', value: 'option1' },
  //   { key: 'Option 2', value: 'option2' },
  //   { key: 'Option 3', value: 'option3' }
  // ]
  // const radioOptions = [
  //   { key: 'Option 1', value: 'rOption1' },
  //   { key: 'Option 2', value: 'rOption2' },
  //   { key: 'Option 3', value: 'rOption3' }
  // ]
  // const checkboxOptions = [
  //   { key: 'Option 1', value: 'cOption1' },
  //   { key: 'Option 2', value: 'cOption2' },
  //   { key: 'Option 3', value: 'cOption3' }
  // ]

  const initialValues = {
    parentAssemblyId: '',
    type: '',
    nomenclature: '',
    id: '',
    qty: '',
    remarks: ''
  }
  const validationSchema = Yup.object({
    parentAssemblyId: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    nomenclature: Yup.string().required('Required'),
    id: Yup.string().required('Required'),
    qty: Yup.number().required('Required'),
    remarks: Yup.string().required('Required')
  })

  const onSubmit = values => {
    console.log('Form data', values)
    // console.log('Saved data', JSON.parse(JSON.stringify(values)))
  }



  return (
    <Portal>

      <Modal title='Copy New Project Module Entry' closer={closer}>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => (
            <Form>
              <FormikControl
                control='input'
                type='text'
                // label='Parent Assembly Id'
                name='parentAssemblyId'
              />
              <FormikControl
                control='input'
                type='text'
                // label='Parent Assembly Id'
                name='type'
              />
              <FormikControl
                control='input'
                type='text'
                // label='Parent Assembly Id'
                name='nomenclature'
              />
              <FormikControl
                control='input'
                type='text'
                // label='Parent Assembly Id'
                name='id'
              />
              <FormikControl
                control='input'
                type='text'
                // label='Parent Assembly Id'
                name='qty'
              />
              <FormikControl
                control='input'
                type='text'
                // label='Parent Assembly Id'
                name='remarks'
              />


              <button type='submit'>Submit</button>
            </Form>
          )}
        </Formik>
        {/*         
        <Form
          submit={formData => {
            dispatch(projectActions.addProjectPart([projectCatName, projectId, formData]));
          }}
          fields={[{
            field: 'parentAssemblyId',
            defaultValue: '0000',
            req: true
          }, {
            field: 'type',
            dataList: ['purchased', 'manufactured', 'standard'],
            req: true
          }, {
            field: 'nomenclature',
            req: true
          }, {
            field: 'id',
            dataList: [`${projectId}-`],
            req: true
          }, {
            field: 'qty',
            req: true
          },
          {
            field: 'remarks'
          }]}
        /> */}
      </Modal>
    </Portal>
  )
}
// Project Type
// Project ID

// Part Type
// Part Details
// Part Remarks
