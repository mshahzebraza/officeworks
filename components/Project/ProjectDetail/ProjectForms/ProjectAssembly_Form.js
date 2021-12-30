// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles
import { projectActions } from '../../../../store/project/project-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
// import Form from '../../../Form/Form'
import FormikForm from '../../../Formik/FormikForm'
import FormikControl from '../../../Formik/FormikControl'
import FormikSubmit from '../../../Formik/FormikSubmit'
import { isObjEmpty } from '../../../../helpers/reusable'


// showUpdateModal, setShowUpdateModal, dispatch, data
export default function ProjectAssembly_Form({ closer, assemblyData: oldProjectData }) {

  const dispatch = useDispatch();

  const isNewSubmission = isObjEmpty(oldProjectData);

  // Initial Values
  const initialValues = {
    type: '', // EM-Linear (DropDown)
    nomenclature: '', // PEMA-L3K-BD (Input)
    application: [], // AbWS (Multiple Checkbox)
    status: '', // Production (Dropdown)
    stock: '', // fetched dynamically from inventory based on the project nomenclature
    target: '', // fetched dynamically from targets based on the project nomenclature
    ...oldProjectData
  }

  // Validation Schema
  const validationSchema = Yup.object({
    type: Yup.string().required('Required'),
    nomenclature: Yup.string().required('Required'),
    application: Yup.array().nullable(), //.min('Select at least one Application'), 
    status: Yup.string().required('Required'),
    stock: Yup.number().required('Required'),
    target: Yup.number().required('Required'),
  })

  const onSubmit = (values) => {
    isNewSubmission ?
      console.log('Adding values', values)
      : console.log('Editing values', values);
  }

  return (
    <Portal>
      <Modal title='Edit Entry' closer={closer} >

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}

          onSubmit={onSubmit}
        >
          {(formik) => (
            <FormikForm>
              {/* Type */}
              <FormikControl
                label='Type'
                name='type'
                control='select'
                options={[
                  { key: 'Select an option', value: '' },
                  { key: 'EM-Linear', value: 'EM-Linear' },
                  { key: 'EM-Rotary', value: 'EM-Rotary' }
                ]}
              />

              {/* nomenclature */}
              <FormikControl
                label='Nomenclature'
                name='nomenclature'
                control='input'
                type='text'
              />
              {/* application */}
              <FormikControl
                label='Application'
                name='application'
                control='checkbox'
                options={[
                  { key: 'R&D', value: 'R&D' },
                  { key: 'BWS', value: 'BWS' },
                  { key: 'HWS', value: 'HWS' }
                ]}
              />
              {/* status */}
              <FormikControl
                label='status'
                name='status'
                control='select'
                options={[
                  { key: 'R&D', value: 'R&D' },
                  { key: 'Production', value: 'Production' },
                  { key: 'Closed', value: 'Closed' }
                ]}
              />
              {/* stock */}
              <FormikControl
                label='stock'
                name='stock'
                control='input'
                type={'number'}
              />
              {/* target */}
              <FormikControl
                label='target'
                name='target'
                control='input'
                type={'number'}
              />



              <FormikSubmit />
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </Portal>
  )
}



/* 
[
  {
    field: 'type',
    req: true,
    defaultValue: projData.type && projData.type,
    dataList: ['EM-Linear', 'EM-Rotary']
  },
  {
    field: 'nomenclature',
    defaultValue: projData.nomenclature && projData.nomenclature,
    req: true,
    isFixed: projData.status !== 'R&D' && true // Workaround
  },
  {
    field: 'application',
    // req: true,
    defaultValue: projData.application && projData.application,
    dataList: ['B-1', 'B-2', 'B-3'], // ['AbWS', 'HWS', 'Abdali-NG']
  },
  {
    field: 'status',
    req: true,
    defaultValue: projData.status && projData.status,
    dataList: ['R&D', 'Production', 'Discontinued'],
  },
  {
    field: 'stock',
    req: true,
    defaultValue: projData.stock && projData.stock || '0',
  },
  {
    field: 'target',
    req: true,
    defaultValue: projData.target && projData.target || '0',
  },

]
 */