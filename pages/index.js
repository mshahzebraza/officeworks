import Head from 'next/head';
import Form from '../components/Form/Form';
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { poActions } from '../store/po/po-slice'
import Layout from '../components/Layout/Layout';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <>
      <Head>
        <title>Office Works</title>
        <meta name="description" content="created for record keeping of inventory and tracking product history" />
        <meta name="author" content="M Shahzeb Raza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout pageClasses={['tempContainer']}>

        <Link href='/procurement' ><a className='tempBox' >Procurement</a></Link>
        <Link href='/inventory' ><a className='tempBox' >Inventory</a></Link>

      </Layout>
    </>
  )
}

