import React from 'react'
import NavBar from './NavBar'
import Head from 'next/head';
import { Box, Container, Grid, Paper } from '@mui/material';
import { concatStrings } from '../../helpers/reusable';


// TODO: Implement Lazy Loading using "Next/Dynamic" and Dynamic Imports 
export default function Layout({ children }) {
    const navType = 'drawer'; // change to 'appBar' to use the appBar navbar
    const contentStyles = navType === 'appBar' ? {
        mt: 12,
    } : {
        mt: 15,
        ml: 34,
        border: '1px solid red',
    };


    return (
        <>
            <Head>
                <title>Office Works</title>
                <meta name="description" content="created for record keeping of inventory and tracking product history" />
                <meta name="author" content="M Shahzeb Raza" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Grid container /* sx={contentStyles} */ /*  disableGutters */ >
                <NavBar navType={navType} />
                <Grid item xs>
                    <Container disableGutters>
                        {children}
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}
