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
import moduleApollo, { updatePOitemSpecHandler } from '../../../lib/apollo_client/poItemApollo'
import { sourceSpecificKeys } from '../../../helpers/specific'


export default function POitemSpecs_Form({ closer, activePOid, activeItemId, activePOitemSpecs: oldPOitemSpecs = {} }) {

     // TODO: 'clone & pluck' would have been a better option but specification keys can be very different and unpredictable for each item. hence deletion is used here. '_id' is not used in the state of the application anyways, so it won't affect app performance. Nevertheless, it is not ideal. 

     oldPOitemSpecs = deepClone(oldPOitemSpecs) // the deletion was moving up in the state to parent components


     delete oldPOitemSpecs._id;
     delete oldPOitemSpecs.linkedPOs;
     delete oldPOitemSpecs.linkedMWOs;
     sourceSpecificKeys().forEach(key => {
          delete oldPOitemSpecs[key]
     });
     // delete oldPOitemSpecs.id;

     const moduleStateList = [...moduleApollo().list];
     const nameOptions = moduleStateList.map(module => {
          return module.name
     })

     const isNewSubmission = isObjEmpty(oldPOitemSpecs);
     const { id: moduleId, name: moduleName, type: moduleType, application: moduleApplication, ...restModuleSpecs } = oldPOitemSpecs;
     const oldSpecsArray = Object.entries(restModuleSpecs)

     const initialValues = {
          id: moduleId || '',
          name: moduleName || '',
          type: moduleType || '',
          application: moduleApplication || '',
          specifications:
               !isNewSubmission
                    ? oldSpecsArray
                    : [
                         // ['', '']
                    ],
     }

     const validationSchema = Yup.object().shape({
          id: Yup.string().required('Required'),
          name: Yup.string().required('Required'),
          type: Yup.string().required('Required'),
          application: Yup.string().required('Required'),
          specifications: Yup.array()/* .min(1, 'At least 01 entry Required') */
     })

     const onSubmit = (values, { resetForm }) => {
          const { specifications, ...restValues } = values;
          // transforming the nested "specifications" fields into top-level keys
          const otherSpecs = Object.fromEntries(values.specifications)
          // append the remaining restValues to valuesObject
          const completeSpecs = { ...otherSpecs, ...restValues }

          updatePOitemSpecHandler([completeSpecs])
          resetForm();
          closer()
     }


     return (
          <Portal>

               <Modal title={`${isNewSubmission ? 'Add' : 'Update'} Item Specifications`} closer={closer}>

                    <Formik
                         initialValues={initialValues}
                         validationSchema={validationSchema}
                         onSubmit={onSubmit}
                    >
                         {
                              ({ isValid, dirty, isSubmitting }) => (
                                   <FormikForm>

                                        {/* id */}
                                        <FormikControl
                                             control='input'
                                             type='text'
                                             label='Item Id'
                                             name='id'
                                             disabled={!isNewSubmission}

                                        />
                                        {/* name */}
                                        <FormikControl
                                             control='input'
                                             type='text'
                                             label='Item Name'
                                             name='name'
                                             datalist={[
                                                  ...nameOptions
                                             ]}
                                        />

                                        {/* type */}
                                        <FormikControl
                                             control='select'
                                             label='Item Type'
                                             name='type'
                                             options={[
                                                  { key: 'Select One...', value: '' },
                                                  { key: 'Special Standard', value: 'Special' },
                                                  { key: 'Standard', value: 'Standard' },
                                                  { key: 'Manufactured', value: 'Manufactured' }, // either internally or externally
                                             ]}
                                        />
                                        {/* 'application' */}
                                        <FormikControl
                                             control='select'
                                             name='application'
                                             label='Application / Use'
                                             options={[
                                                  { key: 'Select One ...', value: '' },
                                                  { key: 'Make most of the list dynamically load from projects - or even better, get this data from the project directory automatically and remove the field from here altogether', value: 'Dynamic' },
                                                  { key: '3K', value: 'PEMA-L3K-BD' },
                                                  { key: 'Lab Use', value: 'LU' },
                                                  { key: 'R&D', value: 'R&D' },
                                                  { key: 'Miscellaneous', value: 'MISC' },
                                             ]}
                                        />



                                        {/* Only One Control because all the specifications are registered as values to a single field (specifications) in FORMIK */}
                                        {/* The separation of the specs is done manually (outside of formik) and then stored as pairs */}
                                        <FormikControl
                                             control='fieldListPair'
                                             label='Add the Specifications in pairs'
                                             name='specifications'
                                             placeholders={['Shelf Life', '10 years']}
                                        />
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

