// Dependency & Helpers
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Components
import FormikControl from "../Formik/FormikControl";
import FormikForm from "../Formik/FormikForm";
import FormikSubmit from "../Formik/FormsUI/Submit";


function Login_Form({ formId }) {

    const initialValues = {
        username: '',
        // email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        // email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    })

    const onSubmit = (values, { resetForm }) => {
        console.log(values);
        resetForm()
        // modalCloser();
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <FormikForm id={formId} >
                <h1>Login Form</h1>
                <br />
                <FormikControl
                    control="input"
                    type="text"
                    label="Username"
                    name="username"
                    placeholder="Username"
                />
                {/* <FormikControl
  control="input"
  type="email"
  label="Email"
  name="email"
  placeholder="Email"
/> */}
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
    )
}

export default Login_Form
