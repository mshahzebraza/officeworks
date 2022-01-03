// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles
import { mwoActions } from '../../store/mwo/mwo-slice'

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
import Form from '../Form/Form'
import FormikControl from '../Formik/FormikControl'
import FormikForm from '../Formik/FormikForm'
import FormikSubmit from '../Formik/FormikSubmit'
import { isObjEmpty } from '../../helpers/reusable'



export default function MWO_Form({ closer, activeMWOdata: oldMWOdata = {} }) {

  const dispatch = useDispatch();

  const isNewSubmission = isObjEmpty(oldMWOdata);

  const initialValues = {
    mwoId: '',
    application: '',
    itemId: '',
    itemName: '',
    qty: '',
    status: '',
    title: '',
    remarks: '',
    ...oldMWOdata
  }

  const validationSchema = Yup.object().shape({
    mwoId: Yup.string().required('Required'),
    application: Yup.string().required('Required'),
    itemId: Yup.string().required('Required'),
    itemName: Yup.string().required('Required'),
    qty: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    title: Yup.string().required('Required'),
    remarks: Yup.string(),
  })

  function onSubmit(values) {
    isNewSubmission &&
      dispatch(mwoActions.addMWO(values))
      || dispatch(mwoActions.updateMWO(values))

  }

  return (
    <Portal>

      <Modal title={`${isNewSubmission ? 'New' : 'Update'} MWO`} closer={closer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <FormikForm>
            {/* 'title' */}
            <FormikControl
              control='input'
              type='text'
              name='title'
              label='Title / Description'
            />
            {/* 'mwoId' */}
            <FormikControl
              control='input'
              type='text'
              name='mwoId'
              label='MWO ID'
              disabled={!isNewSubmission}
            />
            {/* 'application' */}
            <FormikControl
              control='select'
              name='application'
              label='Application / Use'
              options={[
                { key: 'Select One ...', value: '' },
                { key: 'Make it dynamic 3K', value: 'PEMA-L3K-BD' },
                { key: 'Lab Use', value: 'LU' },
                { key: 'R&D', value: 'R&D' },
                { key: 'Miscellaneous', value: 'MISC' },
              ]}
            />
            {/* 'itemId' */}
            <FormikControl
              control='input'
              type='text'
              name='itemId'
              label='Item ID'
              placeholder='LU-20211212 OR R&D-20211212 OR PEMA-L3K-BD-0200-01'
            />
            {/* 'itemName' */}
            <FormikControl
              control='input'
              type='text'
              placeholder='Should be dependant on the Item Id field'
              name='itemName'
              label='Item Name'
            />
            {/* 'qty' */}
            <FormikControl
              control='input'
              type='number'
              name='qty'
              label='Order Quantity'
            />
            {/* 'status' */}
            <FormikControl
              control='select'
              name='status'
              label='Status'
              options={[
                { key: 'Select One ...', value: '' },
                { key: 'Not Started', value: 'Not Started' },
                { key: 'Active', value: 'Active' },
                { key: 'Delivered', value: 'Delivered' },
              ]}
            />
            {/* 'remarks' */}
            <FormikControl
              control='input'
              type='text'
              name='remarks'
              label='Remarks'
            />

            <FormikSubmit />

          </FormikForm>
        </Formik>
      </Modal>
    </Portal>
  )
}

/* 
'mwoId'
'application'
'itemId'
'itemName'
'qty'
'status'
'title'
'remarks'
 */

/* 
<Form submit={formData => {
  dispatch(mwoActions.addMWO(formData));
}} fields={[
  { // MWO ID
    field: 'mwoId',
    req: true
  }, { // Source
    field: 'application',
    dataList: ['Project', 'R&D', 'LAB', 'MISC'],
    req: true
  }, { // Category
    field: 'itemId',
    req: true
  }, { // Currency
    field: 'itemName',
    req: true
  }, { // Total Cost
    field: 'qty',
    req: true
  }, { // Status
    field: 'status',
    dataList: ['Not Started', 'Active', 'Delivered'],
    req: true
  }, { // Title
    field: 'title',
    req: true
  }, { // Remarks
    field: 'remarks'
  }]} />
 */