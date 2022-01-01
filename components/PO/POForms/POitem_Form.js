// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles
import { poActions } from '../../../store/po/po-slice'

// Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'
import FormikForm from '../../Formik/FormikForm'
import FormikControl from '../../Formik/FormikControl'
import FormikSubmit from '../../Formik/FormikSubmit'
import { checkDataType, isObjEmpty } from '../../../helpers/reusable'
// import { genLog } from '../../../../helpers/reusable'

// showUpdateModal, setShowUpdateModal, dispatch, data
export default function POitem_Form({ closer, activePOid, activePOindex, activePOitemData: oldPOitemData = {} }) {

  const dispatch = useDispatch();

  console.log(' ');
  console.log('PO Item Form');

  // is item an object - ASSUMED
  const isNewSubmission = isObjEmpty(oldPOitemData); // is item a non-empty object

  const oldItemSpecs = oldPOitemData.specification; // may or may not be defined
  console.log('oldItemSpecs', oldItemSpecs);
  /* 
    // Refactoring the Specification Form - 1/5
  
    const validItemSpecs = oldItemSpecs // is item.specs defined
      && checkDataType(oldItemSpecs) === 'object' // is item.specs an object
      && !isObjEmpty(oldItemSpecs) // is item.specs is non-empty object
      && oldItemSpecs
      || { '': '' }
  
      const validItemSpecsArray = Object.entries(validItemSpecs)
      console.log('validItemSpecsArray', validItemSpecsArray);
   */


  const initialValues = {
    id: '',
    name: '',
    type: '',
    qty: '',
    unitPrice: '',
    remarks: '',
    ...oldPOitemData,
    // specification: isNewSubmission ? [['', '']] : validItemSpecsArray, // Refactoring the Specification Form - 2/5
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


  const onSubmit = (values) => {
    console.log(`Form values`, values);
    /* 
      // Refactoring the Specification Form - 4/5
        const specsObject = Object.fromEntries(values.specification)
        values.specification = specsObject
        console.log(`Dispatched values`, values);
     */
    isNewSubmission ? dispatch(poActions.addPOitem([activePOid, values])) : dispatch(poActions.updatePOitem([activePOid, values]));
  }

  return (
    <Portal>
      <Modal
        title={`${isNewSubmission ? 'Add' : 'Update'} PO Item`}
        closer={closer}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
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
            {/* // Refactoring the Specification Form - 5/5 */}

            {/* 
                <FormikControl
                  control='fieldListPair'
                  label='Add the Specification in pairs'
                  name='specification'
                  placeholders={['E.g Shelf Life', 'E.g 10 years']}
                />
            */}
            <FormikSubmit />

          </FormikForm>
        </Formik>
      </Modal>
    </Portal>
  )
}
// 'id'
// 'name'
// 'type'
// 'qty'
// 'unitPrice'
// 'remarks'

