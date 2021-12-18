// Dependency
import React, { useState } from 'react';
import { useSelector } from 'react-redux'

// Store & Styles
import styles from '../../../styles/po.module.scss'

// Components
import AddMWO_Modal from '../../../components/MWO/AddMWO_Modal'
import MWOentryBar from '../../../components/MWO/MWOentryBar'
import Layout from '../../../components/Layout/Layout';

export default function MWO(pProps) {
  const [showModal, setShowModal] = useState(false);
  const mwoList = useSelector((state) => state.mwo);
  console.log(mwoList);



  function filterMWO(evt) {
    evt.preventDefault()
    const searchTerm = evt.target[0].value;
    evt.target[0].value = ''
    console.log(searchTerm);
  }


  return (
    <Layout pageClasses={[styles.container]} >
      <section className={styles.header}>

        <h1 className={styles.title} > Mfg Work Orders</h1>

        <form className={styles.searchForm} onSubmit={filterMWO} >
          <input type="text" minLength={8} className={styles.searchInput} required />
          <button className={styles.searchBtn} >Search by ID</button>
        </form>

        <button onClick={() => setShowModal(true)} >Add a MWO</button>
        {showModal && <AddMWO_Modal closer={() => setShowModal(false)} />}

      </section>

      <section className={styles.body} >
        {
          mwoList.map((poData, idx) => {
            return <MWOentryBar
              key={idx}
              mwoIndex={idx}
              mwoData={poData}
            />
          })
        }
      </section>

    </Layout>
  )

}


