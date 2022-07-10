import { useDispatch, useSelector } from 'react-redux'
import { poActions } from '../store/po/po-slice'
import Layout from '../components/Layout/Layout';
import { useEffect } from 'react';
import { fetchTransactions_Thunk, transactionActions } from '../store/transaction/transaction-slice';
import styles from '../styles/home.module.scss';
import { ButtonLink } from '../components/MUI-reusable';

// import Image from 'next/image';
// import styles from '../styles/Home.module.css'




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

