import Head from 'next/head';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { poActions } from '../store/po/po-slice'
import Layout from '../components/Layout/Layout';
import { useEffect } from 'react';
import { fetchTransactions_Thunk, transactionActions } from '../store/transaction/transaction-slice';
import styles from '../styles/home.module.scss';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css'


export default function Home() {

     // console.log(process.env.MONGO_URI);
     return (
          <>
               <Head>
                    <title>Office Works</title>
                    <meta name="description" content="created for record keeping of inventory and tracking product history" />
                    <meta name="author" content="M Shahzeb Raza" />
                    <link rel="icon" href="/favicon.ico" />
               </Head>


               <Layout pageClasses={[styles.dbCardContainer]}>
                    <Link href='/po' ><a className={styles.dbCard} >Purchase Orders</a></Link>
                    <Link href='/mwo' ><a className={styles.dbCard} >Manufacturing <br /> Work Orders</a></Link>
                    <Link href='/transaction' ><a className={styles.dbCard} >Transactions</a></Link>
                    <Link href='/project' ><a className={styles.dbCard} >Projects</a></Link>
                    <Link href='/inventory' ><a className={styles.dbCard} >Inventory</a></Link>
                    {/* <section className='color'>
          <div className="colorLite4">Box Color Lite 4</div>
          <div className="colorLite3">Box Color Lite 3</div>
          <div className="colorLite2">Box Color Lite 2</div>
          <div className="colorLite1">Box Color Lite 1</div>
          <div className="color0">Box Color </div>
          <div className="colorDark1">Box Color Dark 1</div>
          <div className="colorDark2">Box Color Dark 2</div>
          <div className="colorDark3">Box Color Dark 3</div>
          <div className="colorDark4">Box Color Dark 4</div>
        </section> */}
               </Layout>


          </>
     )
}

