// Dependency
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles

// Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'
import FormikControl from '../../Formik/FormikControl'
import FormikForm from '../../Formik/FormikForm'
import FormikSubmit from '../../Formik/FormikSubmit'
import { isObjEmpty } from '../../../helpers/reusable'
import { updatePOitemSpecHandler } from '../../../lib/apollo_client/poApollo'


export default function POitemSpecs_Form({ closer, activePOid, activeItemIndex, activePOitemSpecs: oldPOitemSpecs = {} }) {

  // console.log();
  const isNewSubmission = isObjEmpty(oldPOitemSpecs);
  const oldSpecsArray = Object.entries(oldPOitemSpecs)

  const initialValues = {
    specifications: !isNewSubmission ? oldSpecsArray : [['', '']],
  }

  const validationSchema = Yup.object().shape({
    specifications: Yup.array()/* .min(1, 'At least 01 entry Required') */
  })

  const onSubmit = (values, { resetForm }) => {
    console.log('values', values);
    const valuesObject = Object.fromEntries(values.specifications)
    updatePOitemSpecHandler([activePOid, activeItemIndex, valuesObject])
    resetForm();
    closer()
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
            {/* Only One Control because all the specifications are registered as values to a single field (specifications) in FORMIK */}
            {/* The separation of the specs is done manually (outside of formik) and then stored as pairs */}
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

