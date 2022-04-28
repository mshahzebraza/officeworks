// Dependency
import Image from 'next/image'
import React, { useState } from 'react'
import { checkDataType, summarizer, toCamelCase } from '../../helpers/reusable'
// import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// Store & Styles
import styles from './POentry.module.scss';
import { deletePOHandler } from '../../lib/apollo_client/poApollo';

// Components
import PO_Summary from './PO_Summary'
import DataRow from '../UI/DataRow/DataRow'
import DataRowItem from '../UI/DataRow/DataRowItem'
import ModalButton from '../UI/ModalButton'
import Button from '../UI/Button'
import InvalidModal from '../UI/Invalid'
import Source_Form from '../Procurement/Forms/Source_Form';


export default function POentry({
     poData = {
          index: 'Sr',
          refType: 'Ref Type',
          refId: 'Ref ID',
          linkedModules: 'Items',
          status: 'Status',
     },
     header = false
}) {

     const router = useRouter()

     poData = header ? poData :
          Object.fromEntries(
               summarizer(
                    poData,
                    [['linkedModules', 'name']],
                    [/* ['items', 'name'] */],
                    ['__v']
               )
          )

     const poItems = poData?.linkedModules;

     // Removal of Duplicate Items and categorization of items
     let itemsJSX;
     if (checkDataType(poItems) === 'array' && poItems?.length > 0) {
          // create the JSX for the items
          itemsJSX = poItems.map((el, idx) => {
               return <EntryItemName content={el.item} key={idx} />
          })
     } else {
          itemsJSX = <EntryItemName isEmpty />
     }

     return (
          <>

               <DataRow header={header}>

                    {/* Serial */}
                    <DataRowItem
                         flex={1}
                         outerClasses={[styles.entryIndex]}
                         content={typeof (poData.index) === 'number' ? (poData.index + 1) : poData.index}
                    />

                    {/* Ref Type */}
                    <DataRowItem
                         flex={1.5}
                         outerClasses={[styles.entryType]}
                         content={poData.refType}
                    />

                    {/* Ref ID */}
                    <DataRowItem
                         flex={2}
                         outerClasses={[styles.entryId]}
                         content={poData.refId}
                    />

                    {/* PO Items */}
                    <DataRowItem
                         flex={5}
                         outerClasses={[styles.entryItemList]}
                         content={header ? poItems : itemsJSX}
                    />

                    {/* PO Status */}
                    <DataRowItem
                         flex={2}
                         outerClasses={[styles.entryStatus]}
                         content={
                              header ? poData.status :
                                   <>
                                        <span
                                             className={`
              ${styles.entryStatusIcon} ${styles[`entryStatusIcon-${toCamelCase(poData.status)}`]}`} />
                                        <span className={styles.entryStatusText} >{poData.status}</span>
                                   </>
                         }
                    />

                    {/* PO Commands */}
                    <DataRowItem
                         flex={4}
                         outerClasses={[styles.entryControls]}
                         content={<>
                              <>{ //? Following attributes can also be added to ModalButton
                              /* tooltip='Edit' */ /* disabled={poData.status === 'Closed'} */ /* invalidReason={'Closed PO cannot be edited'} */}
                              </>
                              <ModalButton caption='Edit' ModalComponent={Source_Form} data={poData} sourceType='po' />
                              <ModalButton caption='Summary' ModalComponent={PO_Summary} poData={poData} />
                              {/* <Button caption='Detail' click={() => router.push(`po/${poData.refId}`)} /> */}
                              <Button caption='Detail' click={() => {
                                   router.push(`po/${poData.refId}`)
                              }} />
                              <Button caption='Delete' click={() => deletePOHandler(poData._id)} />

                         </>}
                    />

               </DataRow>

          </>

     )
}




export function EntryItemName(props) {
     return (
          <span className={`${styles.entryItem} ${props.isEmpty && styles.entryItemEmpty}`}>
               {props.isEmpty ? 'No Item Found' : props.content}
          </span>
     )
}
