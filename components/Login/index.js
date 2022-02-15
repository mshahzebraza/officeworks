import React from 'react'
import Layout from '../Layout/Layout'
import styles from '../../styles/poDirectory.module.scss'
import LoginForm from './Login_Form.js'

function LoginPageComp(pageProps) {
  return (
    // <Layout pageClasses={[styles.container]} >
    <LoginForm />
    // </Layout>
  )
}

export default LoginPageComp