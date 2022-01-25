

// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'


// Store
import { addPO_Thunk, poActions } from '../../store/po/po-slice'

// Styles

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
// import Form from '../Form/Form'
import FormikControl from '../Formik/FormikControl'
import FormikForm from '../Formik/FormikForm'
import FormikSubmit from '../Formik/FormikSubmit'
import { isObjEmpty } from '../../helpers/reusable'


function Transaction_Form({ closer, oldTxnData = {} }) {

  const dispatch = useDispatch()
  const isNewSubmission = isObjEmpty(oldTxnData);

  const initialValues = {
    // tid: '',
    type: '',
    product: '',
    id: '',
    qty: 0,
    intent: '',
    party: '',
    date: '',
    remarks: '',
    initiator: '',
    ...oldTxnData
  }

  const validationSchema = Yup.object({
    // tid: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    product: Yup.string().required('Required'),
    id: Yup.string().required('Required'),
    qty: Yup.number().required('Required'),
    intent: Yup.string().required('Required'),
    party: Yup.string().required('Required'),
    date: Yup.string().required('Required'),
    remarks: Yup.string().required('Required'),
    initiator: Yup.string().required('Required'),
  })

  const onSubmit = (values) => {
    // isNewSubmission ? dispatch(addPO_Thunk(values)) : dispatch(poActions.updatePO([values]));
  };


  return <Portal>
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

          {/* type */}
          <FormikControl
            control='select'
            name='type'
            label='Transaction Type'
            options={[
              { key: 'Select One...', value: '' },
              { key: 'Deposit', value: 'deposit' },
              { key: 'Withdrawal', value: 'withdrawal' },
            ]}
          />
          {/* product */}
          <FormikControl
            control='select'
            name='product'
            label='Product Name'
            options={[
              { key: 'Select One...', value: '' },
              { key: 'Sliding Bearing', value: '' },
              { key: 'Ball Lead Screw', value: 'Ball Lead Screw' },
            ]}
          />
          {/* id */}
          <FormikControl
            control='select'
            name='id'
            label='Product ID'
            options={[
              { key: 'Select One...', value: '' },
              { key: 'NRS BF 220x2 1502', value: 'NRS BF 220x2 1502' },
              { key: 'NRS BF 220x4 1502', value: 'NRS BF 220x4 1502' },
            ]}
          />
          {/* qty */}
          <FormikControl
            control='input'
            type='number'
            name='qty'
            // disabled={!isNewSubmission}
            label='Transaction Quantity'
          />

          {/* intent */}
          <FormikControl
            control='input'
            type='text'
            name='intent'
            label='Motive/Intent of Transaction'
            placeholder='E.g Rectification of sample'
          />
          {/* party */}
          <FormikControl
            control='input'
            type='text'
            name='party'
            label='Deposited/Withdrawn by'
            placeholder='E.g User 102331'
          />
          {/* date */}
          <FormikControl
            control='input'
            type='date'
            name='party'
            label='Date of Transaction'
            placeholder='Auto generated'
          />
          {/* remarks */}
          <FormikControl
            control='input'
            type='date'
            name='party'
            label='Date of Transaction'
            placeholder='Auto generated'
          />
          {/* initiator */}

          <FormikSubmit />
        </FormikForm>

      </Formik>

    </Modal>
  </Portal>;
}

export default Transaction_Form;


