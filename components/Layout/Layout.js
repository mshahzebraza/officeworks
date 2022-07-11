import React from 'react'
import NavBar from './NavBar'
import Head from 'next/head';
import { Box, Container, Grid, Paper } from '@mui/material';
import { concatStrings } from '../../helpers/reusable';
import Header from './Header';

import { useRouter } from "next/router"

// TODO: Implement Lazy Loading using "Next/Dynamic" and Dynamic Imports 
export default function Layout({ children }) {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Office Works</title>
                <meta name="description" content="created for record keeping of inventory and tracking product history" />
                <meta name="author" content="M Shahzeb Raza" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
                {/* Favicon */}
                <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
                <link rel="manifest" href="/favicons/site.webmanifest" />
            </Head>

            <Grid container  >
                <NavBar />
                <Grid item xs>
                    <Container maxWidth="xl" disableGutters>
                        <Header title={router.pathname} />
                        {children}
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}
