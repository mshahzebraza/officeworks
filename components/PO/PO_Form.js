// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'


// Store & Styles
// import { addPO_Thunk, poActions, updatePO_Thunk } from '../../store/po/po-slice'
import { poActions } from '../../store/po/po-slice'
import { addPO_Thunk, updatePO_Thunk } from '../../store/po/po-thunks'


// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
// import Form from '../Form/Form'
import FormikControl from '../Formik/FormikControl'
import FormikForm from '../Formik/FormikForm'
import FormikSubmit from '../Formik/FormikSubmit'
import { isObjEmpty } from '../../helpers/reusable'



export default function PO_Form({ closer, oldPOdata = {} }) {

  const dispatch = useDispatch();
  const isNewSubmission = isObjEmpty(oldPOdata);

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
    ...oldPOdata
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


  const onSubmit = (values) => {
    // isNewSubmission ? dispatch(poActions.addPO(values)) : dispatch(poActions.updatePO([values]));
    isNewSubmission ? dispatch(addPO_Thunk(values)) : dispatch(updatePO_Thunk(values));
    closer();
  }

  return (
    <Portal>
      <Modal
        title={`${isNewSubmission ? 'Add' : 'Update'} Purchase Details`}
        closer={closer}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
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
              options={[
                { key: 'Select One ...', value: '' },
                { key: 'Active', value: 'Active' },
                { key: 'Delivered', value: 'Delivered' },
                !isNewSubmission && { key: 'Closed', value: 'Closed' },
                // New POs are not allowed to mark themselves Closed. This is done to avoid adding it to the transactions.
              ]}
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
            <FormikSubmit />

          </FormikForm>

        </Formik>
      </Modal>
    </Portal>
  )
}
