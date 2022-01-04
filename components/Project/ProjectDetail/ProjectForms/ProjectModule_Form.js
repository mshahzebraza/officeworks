// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

import { Formik } from 'formik'
import * as Yup from 'yup'

// Store & Styles
import { projectActions } from '../../../../store/project/project-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
import FormikControl from '../../../Formik/FormikControl'
import FormikForm from '../../../Formik/FormikForm'
import FormikSubmit from '../../../Formik/FormikSubmit'
import { isObjEmpty } from '../../../../helpers/reusable'


export default function ProjectModule_Form({ closer, projectState = [], oldModuleData = {}, assemblies = [] }) {
  const [projectCatName, projectId] = projectState

  const dispatch = useDispatch();

  const isNewSubmission = isObjEmpty(oldModuleData);


  // Initial Values
  const initialValues = {
    parentAssemblyId: '',
    type: '',
    nomenclature: '',
    id: '',
    qty: '',
    remarks: '',
    ...oldModuleData
  }

  // Validation Schema
  const validationSchema = Yup.object({
    parentAssemblyId: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    nomenclature: Yup.string().required('Required'),
    id: Yup.string().required('Required'),
    qty: Yup.number().required('Required'),
    remarks: Yup.string()
  })

  // Options (Radio,Checkboxes,Dropdown) 

  const assemblyOptionsList = assemblies.map(
    (assemblyObj) => {
      return { key: `${assemblyObj.nomenclature}`, value: `${assemblyObj.id}` }
    }
  )

  const assemblyDropdownOptions = [
    { key: 'Select an option', value: '' },
    ...assemblyOptionsList
  ]

  const partTypeOptions = [
    { key: 'Select One ...', value: '' },
    { key: 'Purchased', value: 'purchased' },
    { key: 'manufactured', value: 'manufactured' },
    { key: 'Standard', value: 'standard' }
  ]

  // On Submit
  const onSubmit = values => {
    isNewSubmission ?
      dispatch(projectActions.addProjectPart([projectCatName, projectId, values]))
      : dispatch(projectActions.updateProjectPart([projectCatName, projectId, values]));

  }



  return (
    <Portal>

      <Modal title={`${isNewSubmission ? 'Add' : 'Update'} Project Module`} closer={closer}>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => (
            <FormikForm>
              <FormikControl
                label='Parent Assembly Id'
                name='parentAssemblyId'
                control='select'
                options={assemblyDropdownOptions}
              />

              <FormikControl
                label='Part Type'
                name='type'
                control='select'
                options={partTypeOptions}
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

              <FormikSubmit />
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </Portal>
  )
}