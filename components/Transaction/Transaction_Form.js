

// Dependency
import React from 'react'
// import { useDispatch } from 'react-redux'
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
import { getIDseries, isObjEmpty } from '../../helpers/reusable'
import { addTxnHandler } from '../../lib/apollo_client/transactionApollo'

function Transaction_Form({ closer: modalCloser, oldTxnData = {} }) {

  // const dispatch = useDispatch()
  const isNewSubmission = isObjEmpty(oldTxnData);

  const initialValues = {
    // tid: '',
    txnType: '',
    productNomenclature: '',
    productId: '',
    partIDs: '',
    // qty: 0,
    intent: '',
    party: '',
    // date: '',
    remarks: '',
    // initiator: '',
    ...oldTxnData
  }

  const validationSchema = Yup.object({
    // tid: Yup.string().required('Required'),
    txnType: Yup.string().required('Required'),
    productNomenclature: Yup.string().required('Required'),
    productId: Yup.string().required('Required'),
    // partIDs: Yup/* .string() */.required('Required'),
    partIDs: Yup.mixed().required('Required'),

    // qty: Yup.number().required('Required'),
    intent: Yup.string().required('Required'),
    party: Yup.string().required('Required'),
    // date: Yup.string().required('Required'),
    remarks: Yup.string(),
    // initiator: Yup.string().required('Required'),
  })

  const onSubmit = (values, { resetForm }) => {

    const response = !values.partIDs.includes('-[') && prompt('No separator (-) before brackets. Press "Cancel" to stop?')
    if (response === null) return


    values.partIDs = getIDseries(values.partIDs)
    values.date = Date.now();
    console.log(`values: `, values)
    addTxnHandler(values)
    resetForm()
    modalCloser()
  };


  return <Portal>
    <Modal
      title={`${isNewSubmission ? 'Add' : 'Update'} Transaction Details`}
      closer={modalCloser}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {
          ({ values, dirty, isSubmitting }) => (
            <FormikForm>

              {/* type */}
              <FormikControl
                control='select'
                name='txnType'
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
                name='productNomenclature'
                label='Product Name'
                options={[
                  { key: 'Select One...', value: '' },
                  { key: 'Sliding Bearing', value: 's' },
                  { key: 'Ball Lead Screw', value: 'Ball Lead Screw' },
                ]}
              />
              {/* id */}
              <FormikControl
                control='select'
                name='productId'
                label='Product ID'
                options={[
                  { key: 'Select One...', value: '' },
                  { key: 'NRS BF 220x2 1502', value: 'NRS BF 220x2 1502' },
                  { key: 'NRS BF 220x4 1502', value: 'NRS BF 220x4 1502' },
                ]}
              />
              {/* partIDs */}
              <FormikControl
                control='input'
                type='text'
                name='partIDs'
                // disabled={!isNewSubmission}
                label='Part IDs'
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
              {/* remarks */}
              <FormikControl
                control='textarea'
                type='text'
                name='remarks'
                label='Remarks/Details'
                placeholder='Auto generated' // in case of purchase order and manufacture order
              />

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

      </Formik>

    </Modal>
  </Portal>;
}

export default Transaction_Form;


