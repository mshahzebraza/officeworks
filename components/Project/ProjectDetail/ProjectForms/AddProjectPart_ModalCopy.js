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



// Extract the following
// labelStyles, errorStyles, inputStyles, controlStyles



export default function AddProjectPart_Modal({ closer, projectCatName, projectId, assemblies = [] }) {
  const dispatch = useDispatch();

  const assemblyOptionsList = assemblies.map(
    (assemblyObj) => {
      return { key: `${assemblyObj.nomenclature}`, value: `${assemblyObj.id}` }
    }
  )

  const assemblyDropdownOptions = [
    { key: 'Select an option', value: '' },
    ...assemblyOptionsList
  ]

  const partTypeRadioOptions = [
    { key: 'Purchased', value: 'purchased' },
    { key: 'manufactured', value: 'manufactured' },
    { key: 'Standard', value: 'standard' }
  ]



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
    dispatch(projectActions.addProjectPart([projectCatName, projectId, values]));
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
                label='Parent Assembly Id'
                name='parentAssemblyId'
                control='select'
                options={assemblyDropdownOptions}
              />

              <FormikControl
                label='Part Type'
                name='type'
                control='radio'
                options={partTypeRadioOptions}
              />
              <FormikControl
                label='Nomenclature'
                name='nomenclature'
                control='input'
                type='text'
              />
              {/* Custom validation component using render props */}
              {/* Prefix inserted if part is 'manufactured' && 'assemblyId' provided */}
              <FormikControl
                label='Part ID'
                name='id' // needs prefixed project ID
                control='input'
                type='text'
              />
              <FormikControl
                control='input'
                type='number'
                label='Qty / Assembly'
                name='qty'
              />
              <FormikControl
                control='textarea'
                type='text'
                label='Part Description'
                placeholder='The Part has a very good surface finish'
                name='remarks'
              />

              <button type='submit'>Submit</button>
            </Form>
          )}
        </Formik>
      </Modal>
    </Portal>
  )
}
// Project Type
// Project ID

// Part Type
// Part Details
// Part Remarks
