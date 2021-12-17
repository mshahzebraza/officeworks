// Dependency
import React from 'react'

// Store & Styles
import styles from './SummaryMWO_Modal.module.scss'

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'



export default function SummaryMWO_MFM({ closer, mwoData }) {
  console.log(mwoData);
  return (
    <Portal>
      <Modal
        title='MWO Summary'
        closer={closer}
      >
        {<div className={styles.body}>
          <SummaryItem field={`MWO ID`} value={mwoData.mwoId} />
          <SummaryItem field={`Item Name`} value={mwoData.itemName} />
          <SummaryItem field={`Item Id`} value={mwoData.itemId} />
          <SummaryItem field={`Quantity`} value={mwoData.qty} />
          <SummaryItem field={`Application`} value={mwoData.application} />
          <SummaryItem field={`Status`} value={mwoData.status} />
          <SummaryItem field={`Title`} value={mwoData.title} />
          <SummaryItem field={`Remarks`} value={mwoData.remarks} />


        </div>}
      </Modal>
    </Portal>
  )
}

function SummaryItem({ field, value }) {
  return (<p className={styles.data}>
    <span className={styles.dataField}>{field}:</span>
    <span className={styles.dataValue}>{value}</span>
  </p>);
}