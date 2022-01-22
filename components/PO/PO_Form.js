// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'


// Store & Styles
import { addPO_Thunk, poActions } from '../../store/po/po-slice'

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
    totalCost: '',
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
    totalCost: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    supplier: Yup.string().required('Required'),
    remarks: Yup.string(),
  })


  const onSubmit = (values) => {
    console.log(`values`, values);
    // isNewSubmission ? dispatch(poActions.addPO(values)) : dispatch(poActions.updatePO([values]));
    isNewSubmission ? dispatch(addPO_Thunk(values)) : dispatch(poActions.updatePO([values]));
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
                { key: 'Closed', value: 'Closed' },
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


/* 
[
            {
              field: 'refType',
              req: true,
              defaultValue: oldPOdata.refType && oldPOdata.refType,
              dataList: ['CST', 'Bill', 'PO']
            },
            {
              field: 'refId',
              defaultValue: oldPOdata.refId && oldPOdata.refId,
              req: true,
              isFixed: true
            },
            {
              field: 'category',
              req: true,
              defaultValue: oldPOdata.category && oldPOdata.category,
            },
            {
              field: 'fulfillmentSource',
              req: true,
              defaultValue: oldPOdata.fulfillmentSource && oldPOdata.fulfillmentSource,
              dataList: ['Local', 'Foreign'],
            },
            {
              field: 'currency',
              req: true,
              defaultValue: oldPOdata.currency && oldPOdata.currency,
              dataList: ['PKR', 'USD', 'RMB'],
            },
            {
              field: 'totalCost',
              req: true,
              defaultValue: oldPOdata.totalCost && oldPOdata.totalCost,
            },
            {
              field: 'status',
              req: true,
              defaultValue: oldPOdata.status && oldPOdata.status,
              dataList: ['Closed', 'In Process', 'Delivered']
            },
            {
              field: 'supplier',
              defaultValue: oldPOdata.supplier && oldPOdata.supplier,
              dataList: ['Wuhan', 'E-Tech']
            },
            {
              field: 'remarks',
              defaultValue: oldPOdata.remarks && oldPOdata.remarks,
            }
          ]
 */