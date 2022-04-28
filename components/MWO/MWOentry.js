// Dependency
import Image from 'next/image'
import React, { useState } from 'react'
import { checkDataType, summarizer } from '../../helpers/reusable';

// Store & Styles
import styles from './MWOentry.module.scss';

// Components
import MWO_Summary from './MWO_Summary'
import MWO_Form from './Forms/MWO_Form';
import DataRow from '../UI/DataRow/DataRow'
import DataRowItem from '../UI/DataRow/DataRowItem'
import ModalButton from '../UI/ModalButton'
import Button from '../UI/Button'
import { deleteMWOHandler } from '../../lib/apollo_client/mwoApollo';
import { useRouter } from 'next/router';
import { EntryItemName } from '../PO/POentry';

export default function MWOentryBar({
     mwoData = {
          index: 'Sr',
          mwoId: 'MWO ID',
          title: 'Title',
          itemName: 'Item Name',
          qty: 'Qty',
          application: 'Application',
          status: 'Status'
     },
     header = false
}) {
     const router = useRouter()

     mwoData = header ? mwoData :
          Object.fromEntries(
               summarizer(
                    mwoData,
                    [['linkedModules', 'name']],
                    [['linkedModules', 'itemName']],
                    ['__v']
               )
          )

     const mwoItems = mwoData?.itemName;
     // Removal of Duplicate Items and categorization of items
     let itemsJSX;
     if (checkDataType(mwoItems) === 'array' && mwoItems?.length > 0) {
          // create the JSX for the items
          itemsJSX = mwoItems.map((el, idx) => {
               return <EntryItemName content={el.item} key={idx} />
          })
     } else {
          itemsJSX = <EntryItemName isEmpty />
     }

     return (
          <>
               <DataRow header={header}>

                    {/* Serial */}
                    <DataRowItem flex={0.8} outerClasses={[styles.entryIndex]} content={typeof (mwoData.index) === 'number' ? (mwoData.index + 1) : mwoData.index} />
                    {/* MWO ID */}
                    <DataRowItem flex={1.5} outerClasses={[styles.entryMWOid]} content={mwoData.mwoId} />

                    {/* MWO Title */}
                    <DataRowItem flex={5} outerClasses={[styles.entryTitle]} content={mwoData.title} />
                    {/* MWO Item Name */}
                    <DataRowItem flex={3} outerClasses={[styles.entryItemName]} content={header ? mwoItems : itemsJSX} />


                    {/* MWO Qty */}
                    {/* //TODO: Use of 'Qty' would not be justified if multiple items are order against a single MWO. So its not that reusable for future */}
                    {/* <DataRowItem flex={2} outerClasses={[styles.entryQty]} content={mwoData.qty} /> */}

                    {/* MWO Application */}
                    {/* <DataRowItem flex={3} outerClasses={[styles.entryApplication]} content={mwoData.application} /> */}

                    {/* MWO Status */}
                    <DataRowItem
                         flex={2}
                         outerClasses={[styles.entryStatus]}
                         content={
                              header ? mwoData.status :
                                   <>
                                        <span className={`${styles.entryStatusIcon} ${styles[`entryStatusIcon-${mwoData.status && mwoData.status.trim().toLowerCase().replace(/\s+/g, '')}`]}`} />
                                        <span className={styles.entryStatusText} >{mwoData.status}</span>
                                   </>
                         }
                    />

                    {/* MWO Commands */}
                    <DataRowItem
                         flex={4}
                         outerClasses={[styles.entryControls]}
                         content={<>
                              <ModalButton caption='Edit' ModalComponent={MWO_Form} activeMWOdata={mwoData} />
                              <ModalButton caption='Summary' ModalComponent={MWO_Summary} mwoData={mwoData} />
                              <Button caption='Detail' click={() => router.push(`mwo/${mwoData.mwoId}`)} />
                              <Button caption='Delete' click={() => deleteMWOHandler(mwoData._id)} />

                         </>}
                    />
               </DataRow>

          </>

     )
}
