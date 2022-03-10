// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'


// Store & Styles
import { addPOHandler, updatePOHandler } from '../../lib/apollo_client/poApollo'

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
import FormikControl from '../Formik/FormikControl'
import FormikForm from '../Formik/FormikForm'
import FormikSubmit from '../Formik/FormikSubmit'
import { cloneAndPluck, isObjEmpty } from '../../helpers/reusable'


export default function PO_Form({ closer: modalCloser, oldPOdata = {} }) {

  const isNewSubmission = isObjEmpty(oldPOdata);

  // Making sure that the forms are not getting the data that is not needed
  // ? deleting 'index' and 'items' keys from the oldPOdata would cause difficulties in accessing the detail page which needs the 'index' key. POentry needs to update once, so that the index is available for page transition if we delete it.
  const oldDataFiltered = cloneAndPluck(
    oldPOdata,
    ['refType', 'refId', 'category', 'fulfillmentSource', 'currency', 'totalCost', 'status', 'supplier', 'remarks']
  )

  console.log('PO_Form -> oldPOdata', oldDataFiltered)


  const initialValues = {
    refType: '',
    refId: '',
    category: '',
    fulfillmentSource: '',
    currency: '',
    totalCost: 0,
    status: '',
    supplier: '',
    remarks: '',
    ...oldDataFiltered
  }

  const validationSchema = Yup.object({
    refType: Yup.string().required('Required'),
    refId: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    fulfillmentSource: Yup.string().required('Required'),
    currency: Yup.string().required('Required'),
    totalCost: Yup.number().required('Required'),
    status: Yup.string().required('Required'),
    supplier: Yup.string().required('Required'),
    remarks: Yup.string(),
  })


  const onSubmit = (values, { resetForm }) => {
    isNewSubmission ? addPOHandler(values) : updatePOHandler(values);
    resetForm()
    modalCloser();
  }

  // The array is defined HERE to add the last options conditionally.
  let statusOptions = [
    { key: 'Select One ...', value: '' },
    { key: 'Active', value: 'Active' },
    { key: 'Delivered', value: 'Delivered' },
    // New POs are not allowed to mark themselves Closed. This is done to avoid adding it to the transactions.
  ]
  !isNewSubmission && statusOptions.push({ key: 'Closed', value: 'Closed' })
  return (
    <Portal>
      <Modal
        title={`${isNewSubmission ? 'Add' : 'Update'} Purchase Details`}
        closer={modalCloser}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, isValid, dirty, getFieldHelpers, touched, getFieldMeta, registerField, getFieldProps }) => {
            // 1. Make the form multistage
            // 2. Make the Don't go to send stage before confirming the status of refId entered.
            return (
              <FormikForm>

                {/* refType */}
                <FormikControl
                  control='select'
                  name='refType'
                  label='Data Reference'
                  options={[
                    { key: 'Select One...', value: '' },
                    { key: 'CST', value: 'CST' },
                    { key: 'Bill', value: 'Bill' },
                    { key: 'PO', value: 'PO' },
                    { key: 'Requisition', value: 'REQ' },
                  ]}
                />
                {/* refId */}
                <FormikControl
                  control='input'
                  type='text'
                  name='refId'
                  disabled={!isNewSubmission}
                  label='Data Reference ID'
                />
                {/* category */}
                <FormikControl
                  control='select'
                  name='category'
                  label='PO Category'
                  options={[
                    { key: 'Select One ...', value: '' },
                    { key: 'Limited Tender', value: 'Limited Tender' },
                    { key: 'Single Quotation', value: 'Single Quotation' },
                    { key: 'Repeat Order', value: 'Repeat Order' },
                    { key: 'Spot Purchase', value: 'Spot Purchase' },
                    { key: 'Imprest', value: 'Imprest' },
                  ]}
                />
                {/* fulfillmentSource */}
                <FormikControl
                  control='select'
                  name='fulfillmentSource'
                  label='Source of Fulfillment'
                  options={[
                    { key: 'Select One', value: '' },
                    { key: 'Local Purchase', value: 'Local' },
                    { key: 'Foreign Purchase', value: 'Foreign' },
                  ]}
                />
                {/* currency */}
                <FormikControl
                  control='select'
                  name='currency'
                  label='Currency of Payment'
                  options={[
                    { key: 'Select One', value: '' },
                    { key: 'RMB', value: 'RMB' },
                    { key: 'USD', value: 'USD' },
                    { key: 'PKR', value: 'PKR' },
                  ]}
                />
                {/* totalCost */}
                <FormikControl
                  control='input'
                  type='number'
                  name='totalCost'
                  label='Total Cost'
                />
                {/* status */}
                <FormikControl
                  control='select'
                  name='status'
                  label='Current Status'
                  options={statusOptions}
                />
                {/* supplier */}
                <FormikControl
                  control='select'
                  name='supplier'
                  label='Supplier'
                  options={[
                    { key: 'Select One...', value: '' },
                    { key: 'Wuhan', value: 'Wuhan' },
                    { key: 'Chengdu', value: 'Chengdu' },
                    { key: 'E-Tech', value: 'E-Tech' },
                  ]}
                />
                {/* remarks */}
                <FormikControl
                  control='input'
                  type='text'
                  name='remarks'
                  label='Remarks/Description'
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

              </FormikForm>
            )
          }
          }

        </Formik>
      </Modal>
    </Portal>
  )
}
