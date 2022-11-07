import React from 'react'
import Modal from '../UI/Modal'
import LoginForm from './Login_Form.js'

function Login() {
    const formId = 'login_form'
    return (
        <Modal
            title={`Login Form`}
            // handleClose={(modalCloser)}
            submitProps={{
                form: formId, // to link the form with the submit-button in the Modal-Actions
            }}
        >
            <LoginForm />
        </Modal>
    )
}

export default Login