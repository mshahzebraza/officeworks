// Dependency
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles
import { addPOitemHandler, updatePOitemHandler } from '../../../lib/apollo_client/poApollo'

// Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'
import FormikForm from '../../Formik/FormikForm'
import FormikControl from '../../Formik/FormikControl'
import FormikSubmit from '../../Formik/FormikSubmit'
import { isObjEmpty, cloneAndPluck } from '../../../helpers/reusable'

export default function POitem_Form({ closer: modalCloser, activePOid, activePOindex, activePOitemData: oldPOitemData = {} }) {

  const oldPOitemDataFiltered = cloneAndPluck(oldPOitemData, ['id', 'name', 'type', 'qty', 'unitPrice', 'remarks'])
  // const dispatch = useDispatch();

  const isNewSubmission = isObjEmpty(oldPOitemData); // is item a non-empty object


  const initialValues = {
    id: '',
    name: '',
    type: '',
    qty: '',
    unitPrice: '',
    remarks: '',
    ...oldPOitemDataFiltered,
  }

  const validationSchema = Yup.object({
    id: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    qty: Yup.number().required('Required'),
    unitPrice: Yup.number().required('Required'),
    // specification: Yup.array()/* .min(1, 'At least 01 entry Required') */,  // Refactoring the Specification Form - 3/5
    remarks: Yup.string(),
  })


  const onSubmit = (values, { resetForm }) => {
    isNewSubmission
      ? addPOitemHandler([activePOid, values])
      : updatePOitemHandler([activePOid, values]);
    resetForm();
    modalCloser()
  }

  return (
    <Portal>
      <Modal
        title={`${isNewSubmission ? 'Add' : 'Update'} PO Item`}
        closer={modalCloser}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {
            ({ values, dirty, isValid, isSubmitting, setFieldValue, setFieldTouched }) => {
              // console.log('isValid', isValid)
              return (
                <FormikForm>
                  {/* id */}
                  <FormikControl
                    control='input'
                    type='text'
                    label='Item ID'
                    name='id'
                    disabled={!isNewSubmission}
                  />
                  {/* name */}
                  <FormikControl
                    control='input'
                    type='text'
                    label='Item Name'
                    name='name'
                  />
                  {/* type */}
                  <FormikControl
                    control='select'
                    label='Item Type'
                    name='type'
                    options={[
                      { key: 'Select One...', value: '' },
                      { key: 'Special Standard', value: 'Special' }, // change this
                      { key: 'Standard', value: 'Standard' },
                    ]}
                  />
                  {/* qty */}
                  <FormikControl
                    control='input'
                    type='number'
                    label='Purchased Quantity'
                    name='qty'
                  />
                  {/* unitPrice */}
                  <FormikControl
                    control='input'
                    type='number'
                    label='Unit Price'
                    name='unitPrice'
                  />
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

