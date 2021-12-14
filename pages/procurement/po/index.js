// Dependency
import React, { useState } from 'react';
import { useSelector } from 'react-redux'

// Store & Styles
import styles from '../../../styles/po.module.scss'

// Components
import AddPO_Modal from '../../../components/PO/AddPO_Modal'
import POentryBar from '../../../components/PO/POentryBar'




export default function PO(pProps) {
  const [showModal, setShowModal] = useState(false);
  const poList = useSelector((state) => state.po);

  return (
    <main>

      <section className={styles.poData} >
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

      <section className={styles.poForm} >
        <button onClick={() => setShowModal(true)} >Add a PO</button>
        {showModal &&
          <AddPO_Modal closer={() => setShowModal(false)} />}

      </section>
    </main>
  )
}
