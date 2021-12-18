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

  return (
    <Layout>
      <section className={styles.poData} >
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

      <section className={styles.poForm} >
        <button onClick={() => setShowModal(true)} >Add a MWO</button>
        {showModal &&
          <AddMWO_Modal closer={() => setShowModal(false)} />}
      </section>

    </Layout>
  )

}


