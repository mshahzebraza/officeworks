// Dependency
import React, { useState } from 'react';
import { useSelector } from 'react-redux'

// Store & Styles
import styles from '../../../styles/po.module.scss'

// Components
import AddPO_Modal from '../../../components/PO/AddPO_Modal'
import POentryBar from '../../../components/PO/POentryBar'
import Layout from '../../../components/Layout/Layout';




export default function PO(pageProps) {

  const [showModal, setShowModal] = useState(false);
  const poList = useSelector((state) => state.po);

  function filterPO(evt) {
    evt.preventDefault()
    const searchTerm = evt.target[0].value;
    evt.target[0].value = ''
    console.log(searchTerm);
  }

  return (
    <Layout pageClasses={[styles.container]} >
      <section className={styles.header}>

        <h1 className={styles.title} > Purchase Orders</h1>

        <form className={styles.searchForm} onSubmit={filterPO} >
          <input type="text" minLength={8} className={styles.searchInput} required />
          <button className={styles.searchBtn} >Search by ID</button>
        </form>

        <button type='button' onClick={() => setShowModal(true)} >Add a PO</button>
        {showModal && <AddPO_Modal closer={() => setShowModal(false)} />}

      </section>

      <section className={styles.body} >
        {
          poList.map((poData, idx) => {
            return <POentryBar
              key={idx}
              poData={poData}
              poIndex={idx}
            />
          })
        }
      </section>
    </Layout>
  )
}
