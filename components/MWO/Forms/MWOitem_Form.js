// Dependency
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles
// TODO: moduleApollo must be located in moduleApollo file
import moduleApollo from '../../../lib/apollo_client/poItemApollo'
import { addMWOitemHandler, updateMWOitemHandler } from '../../../lib/apollo_client/mwoItemApollo'

// Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'
import FormikForm from '../../Formik/FormikForm'
import FormikControl from '../../Formik/FormikControl'
import FormikSubmit from '../../Formik/FormikSubmit'
import { isObjEmpty, cloneAndPluck, request } from '../../../helpers/reusable'

export default function MWOitem_Form({ closer: modalCloser, activeMWOid, activeMWOindex, activeMWOitemData: oldMWOitemData = {} }) {

     const moduleState = moduleApollo();
     const nameOptions = moduleState.list.map(module => {
          return module.name
     })

     const oldMWOitemDataFiltered = cloneAndPluck(oldMWOitemData, ['id', 'name', 'type', 'application', 'qty', 'unitPrice', 'remarks'])

     const isNewSubmission = isObjEmpty(oldMWOitemData); // is item a non-empty object


     const initialValues = {
          id: '',
          name: '',
          // type: '',
          // application: '',
          // unitPrice: '',
          qty: '',
          remarks: '',
          ...oldMWOitemDataFiltered,
     }

     const validationSchema = Yup.object({
          id: Yup.string().required('Required'),
          name: Yup.string().required('Required'),
          //      .test(
          //      // test if the value is the one that matches the module with the values.id
          //      'is-module-name',
          //      '${path} is not a valid module name',
          //      value => value === moduleState.find(module => module.id === initialValues.id).name
          // ),
          // type: Yup.string().required('Required'),
          // application: Yup.string().required('Required'),
          qty: Yup.number().required('Required'),
          // unitPrice: Yup.number().required('Required'),
          // specification: Yup.array()/* .min(1, 'At least 01 entry Required') */,  // Refactoring the Specification Form - 3/5
          remarks: Yup.string(),
     })


     const onSubmit = (values, { resetForm }) => {
          isNewSubmission
               ? addMWOitemHandler([activeMWOid, values])
               : updateMWOitemHandler([activeMWOid, values]);
          resetForm();
          modalCloser()
     }

     // TODO: remove this if multi-stage form is not needed
     // let stageTwoCriteria = (values) => {

     //      // ID must not be empty or null
     //      if (!values.id) return false

     //      // find duplicate ID in current moduleList
     //      const duplicateModule = moduleState.find(module => module.id === values.id)
     //      if (!duplicateModule) return true // if no duplicate module found, then proceed to next form stage

     //      // if duplicate module found, then ask user to confirm if they want to proceed
     //      const confirmSubmission = window.confirm(`Id matches an existing module.
     //      \nClick Confirm to continue?
     //      \nClick Cancel to refill the form.`)
     //      if (!confirmSubmission) return false // if user clicks cancel, then stop the form submission

     //      return true
     // }

     return (
          <Portal>
               <Modal
                    title={`${isNewSubmission ? 'Add' : 'Update'} MWO Item`}
                    closer={modalCloser}
               >
                    <Formik
                         initialValues={initialValues}
                         validationSchema={validationSchema}
                         onSubmit={onSubmit}
                    >
                         {

                              (formik) => {
                                   const { values, dirty, isValid, isSubmitting, setFieldValue, setFieldTouched, handleBlur, validateField, touched } = formik

                                   return (

                                        <FormikForm
                                        // multiStage
                                        // stepOptions={[ //? One options object for each step
                                        //      { goToNext: () => stageTwoCriteria(values, setFieldValue, validateField, errors) },
                                        //      {}
                                        // ]}
                                        >

                                             <>

                                                  {/* id */}
                                                  <FormikControl
                                                       control='input'
                                                       type='text'
                                                       label='Item ID'
                                                       name='id'
                                                       onBlur={handleBlur}
                                                       disabled={!isNewSubmission}
                                                  />
                                             </>
                                             <>

                                                  {/* 
                                                                                                         control='select'
                                                       label='Item Name'
                                                       name='name'
                                                       options={[
                                                            { key: 'Select One...', value: '' },
                                                            ...nameOptions
                                                       ]}

                                                       */}
                                                  {/* name */}
                                                  {/* //TODO: Load Dynamically for an existing Module */}
                                                  <FormikControl
                                                       control='input'
                                                       type='text'
                                                       label='Item Name'
                                                       name='name'
                                                       disabled={!isNewSubmission}
                                                       datalist={[
                                                            ...nameOptions
                                                       ]}
                                                  />
                                                  {/* qty */}
                                                  <FormikControl
                                                       control='input'
                                                       type='number'
                                                       label='Order Quantity'
                                                       name='qty'
                                                  />
                                                  {/* unitPrice */}
                                                  {/* <FormikControl
                                                       control='input'
                                                       type='number'
                                                       label='Unit Price'
                                                       name='unitPrice'
                                                  /> */}
                                                  {/* remarks */}
                                                  <FormikControl
                                                       control='input'
                                                       type='text'
                                                       label='Remarks / Description'
                                                       name='remarks'
                                                  />

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
                                             </>

                                        </FormikForm>)

                              }}
                    </Formik>
               </Modal>
          </Portal >
     )
}
// 'id'
// 'name'
// 'type'
// 'qty'
// 'unitPrice'
// 'remarks'

