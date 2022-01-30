// Dependency
import Image from 'next/image'
import React, { useState } from 'react'
import { removeDuplicate } from '../../helpers/reusable'
// import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// Store & Styles
import styles from './MWOentry.module.scss';
import { mwoActions } from '../../store/mwo/mwo-slice'

// Components
import SummaryMWO_Modal from './SummaryMWO_Modal'
import MWO_Form from './MWO_Form'
import DataRow from '../UI/DataRow/DataRow'
import DataRowItem from '../UI/DataRow/DataRowItem'
import ModalButton from '../UI/ModalButton'
import Button from '../UI/Button'
import { deleteMWOHandler } from '../../lib/apollo_client/mwoApollo';



export default function MWOentryBar({ mwoData, mwoIndex }) {

  const router = useRouter()
  // const dispatch = useDispatch();

  const [showSummary, setShowSummary] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);


  return (
    <>
      <DataRow>

        {/* Serial */}
        <DataRowItem flex={1} outerClasses={[styles.entryIndex]} content={mwoIndex} />
        {/* MWO ID */}
        <DataRowItem flex={2.5} outerClasses={[styles.entryMWOid]} content={mwoData.mwoId} />

        {/* MWO Item Name */}
        <DataRowItem flex={5} outerClasses={[styles.entryItemName]} content={mwoData.itemName} />


        {/* MWO Qty */}
        <DataRowItem flex={1} outerClasses={[styles.entryQty]} content={mwoData.qty} />

        {/* MWO Application */}
        <DataRowItem flex={4} outerClasses={[styles.entryApplication]} content={mwoData.application} />

        {/* MWO Status */}
        <DataRowItem
          flex={2.2}
          outerClasses={[styles.entryStatus]}
          content={<>
            <span className={`${styles.entryStatusIcon} ${styles[`entryStatusIcon-${mwoData.status.trim().toLowerCase().replace(/\s+/g, '')}`]}`} />
            <span className={styles.entryStatusText} >{mwoData.status}</span>
          </>}
        />

        {/* MWO Commands */}
        <DataRowItem
          flex={4}
          outerClasses={[styles.entryControls]}
          content={<>
            <ModalButton caption='Edit' ModalComponent={MWO_Form} activeMWOdata={mwoData} />
            <ModalButton caption='Summary' ModalComponent={SummaryMWO_Modal} mwoData={mwoData} />
            <Button caption='Delete' click={() => deleteMWOHandler(mwoData.mwoId)} />

          </>}
        />
      </DataRow>

    </>

  )
}
