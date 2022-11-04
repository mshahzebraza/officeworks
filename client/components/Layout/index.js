import React from 'react'
import { useRouter } from "next/router"
import Head from 'next/head';
import NavBar from './NavBar'
import { Container, Grid } from '@mui/material';
import Header from './Header';

// TODO: Implement Lazy Loading using "Next/Dynamic" and Dynamic Imports 
export default function Layout({ children, pageTitle = null }) {

    const router = useRouter()
    const theme = 'light';
    const faviconPathPrefix = `/favicons/AIMS/${theme}`;

    return (
        <>
            <Head>
                <title>AIMS - Assembly's Inventory Management System</title>
                <meta name="description" content="created for record keeping of inventory and tracking product history" />
                <meta name="author" content="M Shahzeb Raza" />
                {/* Favicon */}
                <link rel="apple-touch-icon" sizes="180x180" href={`${faviconPathPrefix}/apple-touch-icon.png`} />
                <link rel="icon" type="image/png" sizes="32x32" href={`${faviconPathPrefix}/favicon-32x32.png`} />
                <link rel="icon" type="image/png" sizes="16x16" href={`${faviconPathPrefix}/favicon-16x16.png`} />
                <link rel="manifest" href={`${faviconPathPrefix}/site.webmanifest`} />
                {/* Fonts */}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,600,700&display=swap"
                />
            </Head>

            <Grid container  >
                <Grid item >
                    <NavBar />
                </Grid>
                <Grid item xs>
                    <Container maxWidth="xl" disableGutters>
                        <Header title={pageTitle || getRouteName(router.pathname)} />
                        <Container
                            sx={{
                                backgroundColor: 'white.main',
                                p: 2
                            }}
                            maxWidth="xl"
                            disableGutters>
                            {children}
                        </Container>

                    </Container>
                </Grid>
            </Grid>
        </>
    )
}


function getRouteName(route) {
    switch (route) {
        case '/':
            return 'Home'
        case '/po':
            return 'Purchase Orders'
        case '/wo':
            return 'Work Orders'
        case '/module':
            return 'Modules'
        case '/project':
            return 'Projects'
        case '/transaction':
            return 'Transactions'
        case '/about':
            return 'About'
        case '/contact':
            return 'Contact'
        default:
            return '404'
    }
}