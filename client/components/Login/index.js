import { Box } from '@mui/material'
import React from 'react'
import LoginForm from './Login_Form.js'

function Login() {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                background: "#ffb503", // blue: 0e759e, green: 03ffbb
            }}
        >
            <LoginForm />
        </Box>
    )
}

export default Login