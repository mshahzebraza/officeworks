import Head from 'next/head';
import MultiForm from '../components/MultiForm/MultiForm';
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { poActions } from '../store/po/po-slice'
// import Image from 'next/image';
// import styles from '../styles/Home.module.css'
export default function Home() {
  return (
    <div >
      <Head>
        <title>Office Works</title>
        <meta name="description" content="created for record keeping of inventory and tracking product history" />
        <meta name="author" content="M Shahzeb Raza" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='tempContainer' >

        <Link href='/procurement' ><a className='tempBox' >Procurement</a></Link>
        <Link href='/inventory' ><a className='tempBox' >Inventory</a></Link>
        {/* 
        <MultiForm
          submitter={(formData) => { console.log(formData); }}
          fields={[
            'Type', 'Remarks'
          ]}
          subLevels={['specifications']}
        /> */}

      </main>

    </div>
  )
}

