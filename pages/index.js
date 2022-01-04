import Head from 'next/head';
import Form from '../components/Form/Form';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
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

