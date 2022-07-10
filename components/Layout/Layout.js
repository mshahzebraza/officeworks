import React from 'react'
import { concatStrings } from '../../helpers/reusable'
import Header from './Header/Header'
import styles from './Layout.module.scss'
import Head from 'next/head';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'

export default function Layout({ children, pageClasses = [] }) {

    return (
        <>
            <Head>
                <title>Office Works</title>
                <meta name="description" content="created for record keeping of inventory and tracking product history" />
                <meta name="author" content="M Shahzeb Raza" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AppBar position="static" color={'secondary'} >
                <Toolbar>
                    <Typography variant="h6">
                        Brand
                    </Typography>
                </Toolbar>
            </AppBar>
            <div>

                {/* <Drawer variant="permanent">
                    This is Drawer
                </Drawer> */}
            </div>
            <div className={styles.layoutContainer} >
                <Header />
                {/* <nav>Nav</nav> */}
                <main className={concatStrings([...pageClasses, styles.page])}>
                    {children}
                </main>
            </div>
        </>
    )
}
