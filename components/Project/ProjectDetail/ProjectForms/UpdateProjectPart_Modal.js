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


export default function updateProjectPart_Modal({ closer, projectCatName, projectId, assemblies = [], oldModuleData }) {
  const dispatch = useDispatch();

  const assemblyOptionsList = assemblies.map(
    (assemblyObj) => {
      return { key: `${assemblyObj.nomenclature}`, value: `${assemblyObj.id}` }
    }
  )

  const assemblyDropdownOptions = [
    { key: 'Select an option', value: '' }, // default value
    ...assemblyOptionsList // populated values
  ]

  const partTypeRadioOptions = [
    { key: 'Purchased', value: 'purchased' },
    { key: 'manufactured', value: 'manufactured' },
    { key: 'Standard', value: 'standard' }
  ]



  const initialValues = {
    parentAssemblyId: '',
    type: 'purchased',
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
    remarks: Yup.string()
  })

  const onSubmit = values => {
    console.log('submitted values', values);
    // dispatch(projectActions.updateProjectPart([projectCatName, projectId, values]));
  }

  return (
    <Portal>

      <Modal title='Update Project Module Entry' closer={closer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formik => (
            <FormikForm
            // submit={formData => {
            //   dispatch(projectActions.updateProjectPart([projectCatName, projectId, formData]));
            // }}
            // fields={[{
            //   field: 'parentAssemblyId',
            //   defaultValue: oldModuleData.parentAssemblyId,
            //   req: true
            // }, {
            //   field: 'type',
            //   defaultValue: oldModuleData.type,
            //   dataList: ['purchased', 'manufactured', 'standard'],
            //   req: true
            // }, {
            //   field: 'nomenclature',
            //   defaultValue: oldModuleData.nomenclature,
            //   req: true
            // }, {
            //   field: 'id',
            //   defaultValue: oldModuleData.id,
            //   dataList: [`${projectId}-`],
            //   isFixed: true,
            //   req: true
            // }, {
            //   field: 'qty',
            //   defaultValue: oldModuleData.qty,
            //   req: true
            // },
            // {
            //   field: 'remarks',
            //   defaultValue: oldModuleData.remarks,
            // }]
            // }
            >
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

              <FormikSubmit />
            </FormikForm>
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
