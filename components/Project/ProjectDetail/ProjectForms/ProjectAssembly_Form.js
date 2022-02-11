// Dependency
import React from 'react'
// import { useDispatch } from 'react-redux'
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
import { deepClone, isObjEmpty } from '../../../../helpers/reusable'
import { addProjAssyHandler, updateProjAssyHandler } from '../../../../lib/apollo_client/projectApollo'


// showUpdateModal, setShowUpdateModal, dispatch, data
export default function ProjectAssembly_Form(
  {
    closer: modalCloser,
    activeProjectType,
    activeProjectId,
    activeAssembliesData: oldAssembliesData = [],
    activeAssemblyData: oldAssemblyData = {}
  }
) {

  // const dispatch = useDispatch();
  let assemblyOptions;

  const isNewSubmission = isObjEmpty(oldAssemblyData);
  isNewSubmission
    ? assemblyOptions = getAssemblyOptions(oldAssembliesData)
    : assemblyOptions = getAssemblyOptions(oldAssembliesData, oldAssemblyData.id)
  // Initial Values
  const initialValues = {
    nomenclature: '',
    id: '',
    parent: '',
    ...oldAssemblyData
  }

  // Validation Schema
  const validationSchema = Yup.object({
    nomenclature: Yup.string().required('Assembly needs to have a name'),
    id: Yup.string()
      .test('len', 'Must be exactly 4 characters', val => val && val.length === 4)
      .required('Please assign an ID to assemble'), //.min('Select at least one Application')
    parent: Yup.string().when(['id'], {
      is: (id) => id !== '0000',
      then: Yup.string().required('Please assign a parent assembly')
    })
  })

  const onSubmit = (values) => {
    isNewSubmission ?
      addProjAssyHandler([activeProjectType, activeProjectId, values])
      : updateProjAssyHandler([activeProjectType, activeProjectId, values]);
    modalCloser()
  }

  return (
    <Portal>
      <Modal title={`${isNewSubmission ? 'Add' : 'Update'} Assembly`} closer={modalCloser} >

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}

          onSubmit={onSubmit}
        >
          {(formik) => (
            <FormikForm>
              {/* Nomenclature */}
              <FormikControl
                label='Nomenclature'
                name='nomenclature'
                control='input'
                type='text'
              />

              {/* ID */}
              <FormikControl
                label='Assembly ID'
                name='id'
                control='input'
                type='text'
                disabled={!isNewSubmission}
              />
              {/* Parent */}
              <FormikControl
                label='Parent'
                name='parent'
                control='select'
                options={[
                  { key: 'Select One ...', value: '' },
                  ...assemblyOptions
                ]}
              />


              <FormikSubmit />
            </FormikForm>
          )}
        </Formik>
      </Modal>
    </Portal>
  )
}


function getAssemblyOptions(assemblyListData, removeAssemblyItemId = false) {

  assemblyListData = deepClone(assemblyListData);
  if (removeAssemblyItemId) {
    const removeItemIndex = assemblyListData.findIndex(curAssemblyItem => curAssemblyItem.id === removeAssemblyItemId)
    assemblyListData.splice(removeItemIndex, 1) // WHY!!
  }

  return assemblyListData.map(assemblyItem => {
    return {
      key: assemblyItem.nomenclature,
      value: assemblyItem.id
    }
  })

}
