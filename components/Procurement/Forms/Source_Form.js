// Dependency & Helpers
import React from 'react'
import * as Yup from 'yup'
import { cloneAndPluck, isObjEmpty } from '../../../helpers/reusable'
import { Formik } from 'formik'

// Store
import { addPOHandler, updatePOHandler } from '../../../lib/apollo_client/poApollo'
import { addMWOHandler, updateMWOHandler } from '../../../lib/apollo_client/mwoApollo'

// Styles

// UI Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'

// Major Components
import FormikControl from '../../Formik/FormikControl'
import FormikForm from '../../Formik/FormikForm'
import FormikSubmit from '../../Formik/FormikSubmit'
import { getObjectWithValuesAt, renderComponentWithProps } from '../../../helpers/specific'

export default function Source_Form({ closer: modalCloser, data: activeSourceData = {}, sourceType = 'mwo' }) {

     const isNewSubmission = isObjEmpty(activeSourceData);

     const formData = (sourceType === 'po')
          ? {
               title: `Purchase Details`,
               fields: {
                    /* fieldName: [initialValue, YUP-validation, controlProps] */
                    refType: ['', Yup.string().required('Required'), {
                         control: 'select',
                         name: 'refType',
                         label: 'Data Reference',
                         options: [
                              { key: 'Select One...', value: '' },
                              { key: 'CST', value: 'CST' },
                              { key: 'Bill', value: 'Bill' },
                              { key: 'PO', value: 'PO' },
                              { key: 'Requisition', value: 'REQ' },
                         ]
                    }],
                    refId: ['', Yup.string().required('Required'), {
                         control: 'input',
                         type: 'text',
                         name: 'refId',
                         disabled: !isNewSubmission,
                         label: 'Data Reference ID'
                    }],
                    category: ['', Yup.string().required('Required'), {
                         control: 'select',
                         name: 'category',
                         label: 'PO Category',
                         options: [
                              { key: 'Select One ...', value: '' },
                              { key: 'Limited Tender', value: 'Limited Tender' },
                              { key: 'Single Quotation', value: 'Single Quotation' },
                              { key: 'Repeat Order', value: 'Repeat Order' },
                              { key: 'Spot Purchase', value: 'Spot Purchase' },
                              { key: 'Imprest', value: 'Imprest' },
                         ]
                    }],
                    fulfillmentSource: ['', Yup.string().required('Required'), {
                         control: 'select',
                         name: 'fulfillmentSource',
                         label: 'Source of Fulfillment',
                         options: [
                              { key: 'Select One', value: '' },
                              { key: 'Local Purchase', value: 'Local' },
                              { key: 'Foreign Purchase', value: 'Foreign' },
                         ]
                    }],
                    currency: ['', Yup.string().required('Required'), {
                         control: 'select',
                         name: 'currency',
                         label: 'Currency of Payment',
                         options: [
                              { key: 'Select One', value: '' },
                              { key: 'RMB', value: 'RMB' },
                              { key: 'USD', value: 'USD' },
                              { key: 'PKR', value: 'PKR' },
                         ]
                    }],
                    totalCost: [0, Yup.number().required('Required'), {
                         control: 'input',
                         type: 'number',
                         name: 'totalCost',
                         label: 'Total Cost',
                    }],
                    status: ['', Yup.string().required('Required'), {
                         control: 'select',
                         name: 'status',
                         label: 'Current Status',
                         options: [
                              { key: 'Select One ...', value: '' },
                              { key: 'Active', value: 'Active' },
                              { key: 'Delivered', value: 'Delivered' },
                              // New POs are not allowed to mark themselves Closed. This is done to avoid adding it to the transactions.
                         ],
                    }],
                    supplier: ['', Yup.string().required('Required'), {
                         control: 'select',
                         name: 'supplier',
                         label: 'Supplier',
                         options: [
                              { key: 'Select One...', value: '' },
                              { key: 'Wuhan', value: 'Wuhan' },
                              { key: 'Chengdu', value: 'Chengdu' },
                              { key: 'E-Tech', value: 'E-Tech' },
                         ]
                    }],
                    remarks: ['', Yup.string(), {
                         control: 'textarea',
                         name: 'remarks',
                         label: 'Remarks/Description'
                    }],
               },
               submitHandlers: {
                    add: addPOHandler,
                    update: updatePOHandler
               }
          }
          : {
               title: `Work Order Details`,
               fields: {
                    /* fieldName: [initialValue, YUP-validation, controlProps] */
                    mwoId: ['', Yup.string().required('Required'), {
                         control: 'input',
                         type: 'text',
                         name: 'mwoId',
                         label: 'MWO ID',
                         disabled: !isNewSubmission
                    }],
                    status: ['', Yup.string().required('Required'), {
                         control: 'select',
                         name: 'status',
                         label: 'Status',
                         options: [
                              { key: 'Select One ...', value: '' },
                              { key: 'Not Started', value: 'Not Started' },
                              { key: 'Active', value: 'Active' },
                              { key: 'Delivered', value: 'Delivered' },
                         ]

                    }],
                    title: ['', Yup.string().required('Required'), {
                         control: 'input',
                         type: 'text',
                         name: 'title',
                         label: 'Title / Description'
                    }],
                    remarks: ['', Yup.string(), {
                         control: 'textarea',
                         name: 'remarks',
                         label: 'Remarks/Description'
                    }],

               },
               submitHandlers: {
                    add: addMWOHandler,
                    update: updateMWOHandler
               }
          }
     // Allow the Dropdown to have the "Closed" option only if submission-mode is "Update"
     !isNewSubmission && formData.fields.status[2].options.push({ key: 'Closed', value: 'Closed' })

     // if submission-mode: "UPDATE", replace the initial values with already present data 
     const initialValuesReplacement = cloneAndPluck(
          activeSourceData,
          // TODO: Isn't it better to remove the keys we don't need rather than pluck all the needed keys
          Object.keys(formData.fields)
     )

     /* -------- Formik Dependencies -------- */
     const initialValues = {
          ...getObjectWithValuesAt(0, formData.fields),
          ...initialValuesReplacement
     }
     const validationSchema = Yup.object({
          ...getObjectWithValuesAt(1, formData.fields),
     })
     const onSubmit = (values, { resetForm }) => {
          isNewSubmission ? formData.submitHandlers.add(values) : formData.submitHandlers.update(values);
          resetForm()
          modalCloser();
     }

     /* -------- Render Function -------- */
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
                         {({ isSubmitting, isValid, dirty }) => {
                              // 1. Make the form multistage
                              // 2. Make the Don't go to send stage before confirming the status of refId entered.
                              return (
                                   <FormikForm>
                                        {/* Render Form Inputs */}
                                        {
                                             renderComponentWithProps(
                                                  FormikControl,
                                                  getObjectWithValuesAt(2, formData.fields)
                                             )
                                        }
                                        {/* Render Form Submit */}
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
                              )
                         }
                         }

                    </Formik>
               </Modal>
          </Portal>
     )
}

