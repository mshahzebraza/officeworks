// Dependency
import Image from 'next/image'
import React, { useState } from 'react'
import { checkDataType, summarizerNew2 } from '../../helpers/reusable';

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
          linkedModules: 'Item Name',// linkedModules was swapped with Items keyName using summarizerNew2
          qty: 'Qty',
          application: 'Application',
          status: 'Status'
     },
     header = false
}) {
     const router = useRouter()

     mwoData = header ? mwoData :
          summarizerNew2(
               mwoData,
               {
                    // replaceKeys: [['linkedModules', 'items']], //? keyName "linkedModules" must be changed to itemName 
                    deleteKeys: ['__v'],
                    array: {
                         categorizeKeys: [],
                         concatenateKeys: []
                    },
                    nestedArrayOfObjects: [['linkedModules', 'name']]
               }
          )

     let mwoModules = mwoData?.linkedModules; // default for header, data will be string

     if (!header) {// data will be AoOs
          if (checkDataType(mwoModules) === 'array' && mwoModules?.length > 0) {
               mwoModules = mwoModules.map((el, idx) => {
                    return <EntryItemName content={el.item} key={idx} />
               })
          } else {
               mwoModules = <EntryItemName isEmpty />
          }
     }

     // ? extra line for mwoEntry
     // Due to this line, the mwoData will always show only one item. (remove this and change mwoItem to mwoModules in DataRowItem)
     const mwoItem = header ? mwoModules : mwoModules?.[0]



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
                    <DataRowItem flex={3} outerClasses={[styles.entryItemName]} content={mwoItem} />


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
