// Dependency
import React, { useState } from 'react';
import { useSelector } from 'react-redux'

// Store & Styles
import styles from '../../../styles/po.module.scss'

// Components
import AddPO_Modal from '../../../components/PO/AddPO_Modal'
import MWOentryBar from '../../../components/MWO/MWOentryBar'


export default function MWO(pProps) {
  const [showModal, setShowModal] = useState(false);
  const mwoList = useSelector((state) => state.mwo);
  console.log(mwoList);

  return (
    <main>

      <section className={styles.poData} >
        {
          mwoList.map((poData, idx) => {
            return <MWOentryBar
              key={idx}
              mwoIndex={idx}
              mwoData={poData}
            />
          })
          // poList.map((poData, idx) => {
          //   return <POentryBar
          //     key={idx}
          //     poData={poData}
          //     poIndex={idx}
          //   />
          // })
        }
      </section>

      {/* <section className={styles.poForm} >
        <button onClick={() => setShowModal(true)} >Add a PO</button>
        {showModal &&
          <AddPO_Modal closer={() => setShowModal(false)} />}

      </section> */}
    </main>
  )

}


