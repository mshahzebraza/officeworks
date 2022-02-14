// Dependency & Helpers
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'


// Store
// Styles

// Components
import FormikControl from "../Formik/FormikControl";
import FormikForm from "../Formik/FormikForm";
import FormikSubmit from "../Formik/FormikSubmit";
import Modal from "../UI/Modal";
import Portal from "../UI/Portal";


function Login_Form() {

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  })

  const onSubmit = (values) => {
    console.log(values);
    // modalCloser();
  }

  return (
    // <Portal>
    // <Modal
    // title={'Login Form'}
    // closer={modalCloser}
    // >
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormikForm>
        <FormikControl
          control="input"
          type="email"
          label="Email"
          name="email"
          placeholder="Email"
        />
        <FormikControl
          control="input"
          type="password"
          label="Password"
          name="password"
          placeholder="Password"
        />
        <FormikSubmit />
      </FormikForm>
    </Formik>
    // </Modal>
    // </Portal>
  )
}

export default Login_Form
