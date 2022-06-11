// Dependency
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles
import moduleApollo, { addModuleHandler, updateModuleHandler } from '../../../lib/apollo_client/moduleApollo'

// Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'
import FormikForm from '../../Formik/FormikForm'
import FormikControl from '../../Formik/FormikControl'
import FormikSubmit from '../../Formik/FormikSubmit'
import { isObjEmpty, cloneAndPluck } from '../../../helpers/reusable'
import { getObjectWithValuesAt, renderComponentWithProps } from '../../../helpers/specific'


export default function Module_Form({ closer: modalCloser, data: activeModuleData = {} }) {

     console.log("activeModuleData", activeModuleData);
     const moduleState = moduleApollo();
     const moduleStateList = [...moduleState.list]
     const isNewSubmission = isObjEmpty(activeModuleData); // is item a non-empty object

     const formData = {
          title: 'Module',
          fields: {
               id: ['', Yup.string().required('Required'), {
                    control: 'input',
                    type: 'text',
                    label: 'Module ID',
                    name: 'id',
                    disabled: !isNewSubmission
               }],
               name: ['', Yup.string().required('Required'), {
                    control: 'input',
                    type: 'text',
                    label: 'Module Name',
                    name: 'name',
                    disabled: !isNewSubmission,
                    // ? Dropdown is given to keep the same category of modules exactly match w.r.t spelling and case and to avoid scenarios like 'gLAS', 'Glass', 'glass' etc.
                    datalist: moduleStateList.reduce((prev, { name: moduleName }) => {
                         if (!prev.includes(moduleName)) prev.push(moduleName)
                         return prev
                    }, [])
               }],
               type: ['', Yup.string().required('Required'), {
                    control: 'select',
                    options: [
                         { key: 'Select One...', value: '' },
                         { key: 'Special Standard', value: 'Special' },
                         { key: 'Manufactured', value: 'Manufactured' }, // either internally or externally
                         { key: 'Standard', value: 'Standard' },
                    ],
                    label: 'Module Type',
                    name: 'type',
               }],
               totalInventory: [0, Yup.number().required('Required'), {
                    control: 'input',
                    type: 'number',
                    label: 'Total Inventory',
                    name: 'totalInventory'
               }],
               // ! Must not be greater than totalInventory
               qualifiedInventory: [0, Yup.number().required('Required'), {
                    control: 'input',
                    type: 'number',
                    label: 'Qualified Inventory',
                    name: 'qualifiedInventory'
               }],
               application: ['', Yup.string(), {
                    control: 'checkbox',
                    options: [
                         { key: 'R&D', value: 'R&D' },
                         { key: 'R1', value: 'Regular 1' }, // either internally or externally
                         { key: 'R2', value: 'Regular 2' }
                    ],
                    label: 'Remarks / Description',
                    name: 'application'
               }],
               specs: [[], Yup.array(), {
                    control: 'fieldListPair',
                    label: 'Add the Specifications in pairs',
                    name: 'specs',
                    placeholders: ['Shelf Life', '10 years']
               }],
          },
          submitHandlers: {
               add: addModuleHandler,
               update: updateModuleHandler,
          }
     }



     const initialValuesReplacement = cloneAndPluck(
          activeModuleData,
          [
               'id',
               'name',
               'inv',
               'application',
               'type',
               'specs',
          ]
     )
     const { id, name, inv: { total: totalInventory, qualified: qualifiedInventory }, application, type, specs = {} } = initialValuesReplacement

     const initialValues = {
          ...getObjectWithValuesAt(0, formData.fields),
          // ...initialValuesReplacement
          id,
          name,
          totalInventory,
          qualifiedInventory,
          application,
          type,
          specs: Object.entries(initialValuesReplacement.specs || {})
     }

     const validationSchema = Yup.object({
          ...getObjectWithValuesAt(0, formData.fields)
     })


     const onSubmit = (values, { resetForm }) => {
          // ? The values contain the fields that are explicitly fetched. Hence we have no way of passing in the flexible fields...
          isNewSubmission
               ? formData.submitHandlers.add(values)
               : formData.submitHandlers.update(values);
          resetForm();
          modalCloser()
     }

     return (
          <Portal>
               <Modal
                    title={`${isNewSubmission ? 'Add' : 'Update'} ${formData.title}`}
                    closer={modalCloser}
               >
                    <Formik
                         initialValues={initialValues}
                         validationSchema={validationSchema}
                         onSubmit={onSubmit}
                    >
                         {

                              (formik) => {
                                   const { dirty, isValid, isSubmitting } = formik

                                   return (

                                        <FormikForm
                                        // multiStage
                                        >
                                             {
                                                  renderComponentWithProps(FormikControl,
                                                       getObjectWithValuesAt(2, formData.fields)
                                                  )
                                             }


                                             <FormikSubmit disabled={(!isValid || !dirty || isSubmitting)} >
                                                  {/* all 3 must be false to disable */}
                                                  {
                                                       isValid ?
                                                            dirty
                                                                 ? `Submit ${isNewSubmission ? '(Add)' : '(Update)'}`
                                                                 : 'No edits made'
                                                            : 'Incomplete/Invalid Data'
                                                  }
                                             </FormikSubmit>


                                        </FormikForm>)

                              }}
                    </Formik>
               </Modal>
          </Portal >
     )
}
