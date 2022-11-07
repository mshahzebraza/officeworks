// Dependency & Helpers
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Components
import FormikControl from "../Formik/FormikControl";
import FormikForm from "../Formik/FormikForm";
import Modal from '../UI/Modal';
import Grid from '@mui/material/Grid'


function Login_Form() {
    const formId = 'login_form';
    /* -------- Formik Dependencies -------- */
    const initialValues = {
        username: loginFormConfig.fields.username.initialValue,
        email: loginFormConfig.fields.email.initialValue,
        password: loginFormConfig.fields.password.initialValue,
    }

    const validationSchema = Yup.object({
        username: loginFormConfig.fields.username.validation,
        email: loginFormConfig.fields.email.validation,
        password: loginFormConfig.fields.password.validation,
    })

    const submitFormHandler = (values, formHelpers) => {
        const { resetForm } = formHelpers
        loginFormConfig.submitHandlers.login(values)
        resetForm()
        modalCloser();
    }


    return (
        <Modal
            title={`Login Form`}
            handleClose={() => { console.log('not working...') }}
            submitProps={{
                form: formId, // links the "form-element" with the "submit-button" in the Modal-Actions
            }}
            maxWidth='sm'
        >

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitFormHandler}
            >
                <FormikForm id={formId} >
                    <Grid container spacing={2}>
                        <FormikControl {...loginFormConfig.fields.username.config} />
                        <FormikControl {...loginFormConfig.fields.email.config} />
                        <FormikControl {...loginFormConfig.fields.password.config} />
                    </Grid>
                </FormikForm>
            </Formik>
        </Modal>

    )
}
export default Login_Form


const loginFormConfig = {
    title: `Login Form`,
    fields: {
        username: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                gridSpan: 12,
                control: 'text',
                type: 'text',
                name: 'username',
                label: 'Enter Your Name',
            }
        },
        email: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                control: 'text',
                type: 'email',
                name: 'email',
                label: 'Enter Your Email',
            }
        },
        password: {
            initialValue: '',
            validation: Yup.string().required('Required'),
            config: {
                control: 'text',
                type: 'password',
                name: 'password',
                label: 'Enter Your Password',
            }
        },

    },
    submitHandlers: {
        login: (v) => { console.log('Login form submission logic not implemented!', v) },
        signup: (v) => { console.log('Signup form submission logic not implemented!', v) },
    }
}