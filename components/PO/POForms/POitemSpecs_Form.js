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
// import Form from '../../Form/Form'
import FormikControl from '../../Formik/FormikControl'
import FormikForm from '../../Formik/FormikForm'
import FormikSubmit from '../../Formik/FormikSubmit'
import { isObjEmpty } from '../../../helpers/reusable'


export default function AddPOitemSpec_Modal({ closer, activePOid, activeItemIndex, activePOitemSpecs: oldPOitemSpecs = {} }) {
  const dispatch = useDispatch();

  // console.log();
  const isNewSubmission = isObjEmpty(oldPOitemSpecs);
  const oldSpecsArray = Object.entries(oldPOitemSpecs)

  const initialValues = {
    specifications: !isNewSubmission ? oldSpecsArray : [['', '']],
  }

  const validationSchema = Yup.object().shape({
    specifications: Yup.array().min(1, 'At least 01 entry Required')
  })

  const onSubmit = (values) => {
    const valuesObject = Object.fromEntries(values.specifications)
    dispatch(poActions.updatePOitemSpec([activePOid, activeItemIndex, valuesObject]))
  }


  return (
    <Portal>

      <Modal title={`${isNewSubmission ? 'Add' : 'Update'} Item Specifications`} closer={closer}>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <FormikForm>
            <FormikControl
              control='fieldListPair'
              label='Add the Specifications in pairs'
              name='specifications'
              placeholders={['E.g Shelf Life', 'E.g 10 years']}
            />
            <FormikSubmit />
          </FormikForm>
        </Formik>

      </Modal>
    </Portal>
  )
}

