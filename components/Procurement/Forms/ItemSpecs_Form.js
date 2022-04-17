// Dependency
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles

// Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'
import FormikControl from '../../Formik/FormikControl'
import FormikForm from '../../Formik/FormikForm'
import FormikSubmit from '../../Formik/FormikSubmit'
import { cloneAndPluck, deepClone, isObjEmpty } from '../../../helpers/reusable'
import moduleApollo, { updateItemSpecHandler } from '../../../lib/apollo_client/poItemApollo'
import { getObjectWithValuesAt, moduleSpecificKeys, renderComponentWithProps, sourceSpecificKeys } from '../../../helpers/specific'


export default function ItemSpecs_Form({ closer, data: activeModuleSpecs = {} }) {

     const moduleStateList = [...moduleApollo().list];

     // Clone the previously added data
     activeModuleSpecs = deepClone(activeModuleSpecs) // the deletion was moving up in the state to parent components
     const isNewSubmission = isObjEmpty(activeModuleSpecs);

     { //? Delete unnecessary keys
          delete activeModuleSpecs._id
          for (const key in activeModuleSpecs) {
               if (sourceSpecificKeys().includes(key)) delete activeModuleSpecs[key]
          }
     }

     const formData = {
          title: 'Item Specifications',
          fields: {
               id: ['', Yup.string().required('Required'), {
                    control: 'input',
                    type: 'text',
                    label: 'Item Id',
                    name: 'id',
                    disabled: !isNewSubmission
               }],
               name: ['', Yup.string().required('Required'), {
                    control: 'input',
                    type: 'text',
                    label: 'Item Name',
                    name: 'name',
                    datalist: [
                         ...moduleStateList.map(module => {
                              return module.name
                         })
                    ]
               }],
               type: ['', Yup.string().required('Required'), {
                    control: 'select',
                    label: 'Item Type',
                    name: 'type',
                    options: [
                         { key: 'Select One...', value: '' },
                         { key: 'Special Standard', value: 'Special' },
                         { key: 'Standard', value: 'Standard' },
                         { key: 'Manufactured', value: 'Manufactured' }, // either internally or externally
                    ]
               }],
               application: ['', Yup.string().required('Required'), {
                    control: 'select',
                    name: 'application',
                    label: 'Application / Use',
                    options: [
                         { key: 'Select One ...', value: '' },
                         { key: 'Make most of the list dynamically load from projects - or even better, get this data from the project directory automatically and remove the field from here altogether', value: 'Dynamic' },
                         { key: '3K', value: 'PEMA-L3K-BD' },
                         { key: 'Lab Use', value: 'LU' },
                         { key: 'R&D', value: 'R&D' },
                         { key: 'Miscellaneous', value: 'MISC' },
                    ]
               }],
               specifications: [[], Yup.array(), {
                    control: 'fieldListPair',
                    label: 'Add the Specifications in pairs',
                    name: 'specifications',
                    placeholders: ['Shelf Life', '10 years']
               }],
          }
     }

     const { id, name, type, application, ...restModuleSpecs } = activeModuleSpecs;

     const initialValuesReplacement = {
          id, name, type, application,
          specifications: Object.entries(restModuleSpecs)
     }
     const initialValues = {
          ...getObjectWithValuesAt(0, formData.fields),
          ...initialValuesReplacement
     }

     const validationSchema = Yup.object().shape({
          ...getObjectWithValuesAt(1, formData.fields),
     })

     const onSubmit = (values, { resetForm }) => {
          const { specifications: nestedSpecs, ...mainSpecFields } = values;
          // transforming the nested "specifications" fields into top-level keys
          const nestedSpecsTransformed = Object.fromEntries(nestedSpecs)
          // append the remaining mainSpecFields to valuesObject
          const completeSpecs = { ...nestedSpecsTransformed, ...mainSpecFields }

          // TODO: The Handler function needs to be renamed
          updateItemSpecHandler([completeSpecs])
          resetForm();
          closer()
     }


     return (
          <Portal>

               <Modal title={`${isNewSubmission ? 'Add' : 'Update'} ${formData.title}`} closer={closer}>

                    <Formik
                         initialValues={initialValues}
                         validationSchema={validationSchema}
                         onSubmit={onSubmit}
                    >
                         {
                              ({ isValid, dirty, isSubmitting }) => (
                                   <FormikForm>
                                        {
                                             renderComponentWithProps(
                                                  FormikControl,
                                                  getObjectWithValuesAt(2, formData.fields)
                                             )
                                        }

                                        <FormikSubmit />

                                        {/* <FormikSubmit disabled={(!isValid || !dirty || isSubmitting)} >
                                             {
                                                  isValid ?
                                                       dirty
                                                            ? `Submit ${isNewSubmission ? '(Add)' : '(Update)'}`
                                                            : 'No edits made'
                                                       : 'Incomplete/Invalid Data'
                                             }
                                        </FormikSubmit> */}
                                   </FormikForm>
                              )
                         }
                    </Formik>

               </Modal>
          </Portal>
     )
}

