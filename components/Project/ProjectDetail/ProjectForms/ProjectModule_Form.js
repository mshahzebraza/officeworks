// Dependency
import React from 'react'
// import { useDispatch } from 'react-redux'

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
import { addProjModHandler, updateProjModHandler } from '../../../../lib/apollo_client/projectApollo'


export default function ProjectModule_Form({ closer: modalCloser, projectState = [], oldModuleData = {}, assemblies = [] }) {
     const [projectCatName, projectId] = projectState

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
          { key: 'Standard', value: 'std' },
          { key: 'Standard - Special', value: 'specStd' },
          { key: 'Manufactured', value: 'mfg' },
     ]

     // On Submit
     const onSubmit = (values, { resetForm }) => {
          isNewSubmission
               ? addProjModHandler([projectCatName, projectId, values])
               : updateProjModHandler([projectCatName, projectId, values]);
          resetForm();
          modalCloser()
     }



     return (
          <Portal>

               <Modal title={`${isNewSubmission ? 'Add' : 'Update'} Project Module`} closer={modalCloser}>

                    <Formik
                         initialValues={initialValues}
                         validationSchema={validationSchema}
                         onSubmit={onSubmit}
                    >
                         {({ isValid, dirty, isSubmitting }) => (
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
                                        disabled={!isNewSubmission}
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

                                   <FormikSubmit disabled={(!isValid || !dirty || isSubmitting)} >
                                        {
                                             isValid ?
                                                  dirty
                                                       ? `Submit ${isNewSubmission ? '(Add)' : '(Update)'}`
                                                       : 'No edits made'
                                                  : 'Incomplete/Invalid Data'
                                        }
                                   </FormikSubmit>
                              </FormikForm>
                         )}
                    </Formik>
               </Modal>
          </Portal>
     )
}