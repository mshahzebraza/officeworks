import Head from 'next/head';
import MultiForm from '../components/MultiForm';
import Link from 'next/link'
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

      <main >

        <Link href='/procurement' ><a >Procurement</a></Link>
        <Link href='/inventory' ><a >Inventory</a></Link>

        <MultiForm
          defaultFields={[
            'Type', 'Remarks'
          ]}
          subLevels={['specifications']}
        />

      </main>

    </div>
  )
}

