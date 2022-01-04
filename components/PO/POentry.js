// Dependency
import Image from 'next/image'
import React, { useState } from 'react'
import { removeDuplicate } from '../../helpers/reusable'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// Store & Styles
import styles from './POentry.module.scss';
import { poActions } from '../../store/po/po-slice'

// Components
import PO_Summary from './PO_Summary'
import PO_Form from './PO_Form'
import DataRow from '../UI/DataRow/DataRow'
import DataRowItem from '../UI/DataRow/DataRowItem'
import ModalButton from '../UI/ModalButton'
import Button from '../UI/Button'


export default function POentry({ poData, poIndex }) {

  const router = useRouter()
  const dispatch = useDispatch();

  const poItems = poData.items;

  // Removal of Duplicate Items
  let refinedItemList = [];
  if (poItems && poItems.length > 0) {
    const itemListArray = poItems.map((el, elIdx) => el.name); // ['po_item1', 'po_item1', 'po_item2']
    refinedItemList = removeDuplicate(itemListArray); // [{reusable: 'po_item1', qty:2 },{item: 'po_item2', qty:1 }]
  }


  return (
    <>

      <DataRow>

        {/* Serial */}
        <DataRowItem
          flex={1}
          outerClasses={[styles.entryIndex]}
          content={poIndex + 1}
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
          content={
            refinedItemList.length > 0
              ? refinedItemList.map((el, idx) => <EntryItemName content={el.item} key={idx} />)
              : <EntryItemName isEmpty />
          }
        />

        {/* PO Status */}
        <DataRowItem
          flex={2}
          outerClasses={[styles.entryStatus]}
          content={<>
            <span className={`${styles.entryStatusIcon} ${styles[`entryStatusIcon-${poData.status.trim().toLowerCase().replace(/\s+/g, '')}`]}`} />
            <span className={styles.entryStatusText} >{poData.status}</span>
          </>}
        />

        {/* PO Commands */}
        <DataRowItem
          flex={4}
          outerClasses={[styles.entryControls]}
          content={<>
            <ModalButton caption='Edit' /* tooltip='Edit' */ ModalComponent={PO_Form} oldPOdata={poData} />
            <ModalButton caption='Summary' ModalComponent={PO_Summary} poData={poData} itemList={refinedItemList} />
            <Button caption='Detail' click={() => router.push(`po/${poIndex}`)} />
            <Button caption='Delete' click={() => dispatch(poActions.deletePO(poData.refId))} />

          </>}
        />

      </DataRow>

    </>

  )
}

{/* <Image
  src={`/icons/${props.type}.png`}
  alt={props.type}
  width={20}
  height={20} />
 */}

function EntryItemName(props) {
  return (
    <span className={`${styles.entryItem} ${props.isEmpty && styles.entryItemEmpty}`}>
      {props.isEmpty ? 'No Item Found' : props.content}
    </span>
  )
}
