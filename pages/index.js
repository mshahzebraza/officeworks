import Head from 'next/head';
import MultiForm from '../components/MultiForm';
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
        {/* <MultiForm defaultPairs={[
          { field: 'Name', value: '', req: true },
          { field: 'Type', value: '', req: true },
          { field: 'Remarks', value: '', req: true },
        ]} /> */}
        <MultiForm defaultFields={[
          'Type', 'Remarks'
        ]} />
        {/* <h1 > */}
        {/* Welcome to <a >Next.js!</a> */}
        {/* </h1> */}
        {/* <p>another p tag</p> */}

      </main>

    </div>
  )
}

