import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { poActions } from '../store/po/po-slice'
import Layout from '../components/Layout/Layout';
import { useEffect } from 'react';
import { fetchTransactions_Thunk, transactionActions } from '../store/transaction/transaction-slice';
import styles from '../styles/home.module.scss';
import Button from '@mui/material/Button'

// import Image from 'next/image';
// import styles from '../styles/Home.module.css'


function ButtonLink({ href = "/", children }) {
    return (
        <Link href={href} >
            <Button variant='contained' >
                {children}
            </Button>
        </Link>
    )
}



export default function Home() {

    return (
        <>
            <Layout pageClasses={[styles.dbCardContainer]}>
                <ButtonLink href='/po'>Purchase Orders</ButtonLink>
                <ButtonLink href='/mwo'>Manufacturing</ButtonLink>
                <ButtonLink href='/transaction'>Transactions</ButtonLink>
                <ButtonLink href='/project'>Projects</ButtonLink>
                <ButtonLink href='/inventory'>Inventory</ButtonLink>
            </Layout>
        </>
    )
}

