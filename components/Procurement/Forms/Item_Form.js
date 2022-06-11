// Dependency
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles
import moduleApollo, { addMWOmoduleHandler, addPOmoduleHandler, updateMWOmoduleHandler, updatePOmoduleHandler } from '../../../lib/apollo_client/moduleApollo'

// Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'
import FormikForm from '../../Formik/FormikForm'
import FormikControl from '../../Formik/FormikControl'
import FormikSubmit from '../../Formik/FormikSubmit'
import { isObjEmpty, cloneAndPluck, request } from '../../../helpers/reusable'
import { getObjectWithValuesAt, renderComponentWithProps } from '../../../helpers/specific'


export default function Item_Form({ closer: modalCloser, activeSourceId, data: activeItemData = {}, sourceType = 'po' }) {

     const moduleState = moduleApollo();
     const moduleStateList = [...moduleState.list]
     const isNewSubmission = isObjEmpty(activeItemData); // is item a non-empty object

     const formData = (sourceType === 'po')
          ? {
               title: 'PO Item',
               fields: {
                    id: ['', Yup.string().required('Required'), {
                         control: 'input',
                         type: 'text',
                         label: 'Item ID',
                         name: 'id',
                         disabled: !isNewSubmission
                    }],
                    name: ['', Yup.string().required('Required'), {
                         control: 'input',
                         type: 'text',
                         label: 'Item Name',
                         name: 'name',
                         disabled: !isNewSubmission,
                         datalist: moduleStateList.reduce((prev, { name: moduleName }) => {
                              if (!prev.includes(moduleName)) prev.push(moduleName)
                              return prev
                         }, [])
                    }],
                    qty: ['', Yup.number().required('Required'), {
                         control: 'input',
                         type: 'number',
                         label: 'Purchase Quantity',
                         name: 'qty'
                    }],
                    unitPrice: ['', Yup.number().required('Required'), {
                         control: 'input',
                         type: 'number',
                         label: 'Unit Price',
                         name: 'unitPrice'
                    }],
                    remarks: ['', Yup.string(), {
                         control: 'input',
                         type: 'text',
                         label: 'Remarks / Description',
                         name: 'remarks'
                    }],
               },
               submitHandlers: {
                    add: addPOmoduleHandler,
                    update: updatePOmoduleHandler,
               }
          }
          : {
               title: 'MWO Item',
               fields: {
                    id: ['', Yup.string().required('Required'), {
                         control: 'input',
                         type: 'text',
                         label: 'Item ID',
                         name: 'id',
                         disabled: !isNewSubmission
                    }],
                    name: ['', Yup.string().required('Required'), {
                         control: 'input',
                         type: 'text',
                         label: 'Item Name',
                         name: 'name',
                         disabled: !isNewSubmission,
                         datalist: moduleStateList.reduce((prev, { name: moduleName }) => {
                              if (!prev.includes(moduleName)) prev.push(moduleName)
                              return prev
                         }, [])
                    }],
                    qty: ['', Yup.number().required('Required'), {
                         control: 'input',
                         type: 'number',
                         label: 'Order Quantity',
                         name: 'qty'
                    }],
                    remarks: ['', Yup.string(), {
                         control: 'input',
                         type: 'text',
                         label: 'Remarks / Description',
                         name: 'remarks'
                    }],
               },
               submitHandlers: {
                    add: addMWOmoduleHandler,
                    update: updateMWOmoduleHandler,
               }
          }

     // TODO: Here the other specs like application etc. must be concatenated with the values
     // TODO : OR fine tune the handler function
     const initialValuesReplacement = cloneAndPluck(
          activeItemData, // empty
          Object.keys(formData.fields)
     )

     const initialValues = {
          ...getObjectWithValuesAt(0, formData.fields),
          ...initialValuesReplacement
     }

     const validationSchema = Yup.object({
          ...getObjectWithValuesAt(0, formData.fields)
     })


     const onSubmit = (values, { resetForm }) => {
          // ? The values contain the fields that are explicitly fetched. Hence we have no way of passing in the flexible fields...
          isNewSubmission
               ? formData.submitHandlers.add([activeSourceId, values])
               : formData.submitHandlers.update([activeSourceId, values]);
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
                                             multiStage
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
