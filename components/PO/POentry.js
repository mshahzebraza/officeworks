// Dependency
import Image from 'next/image'
import React, { useState } from 'react'
import { checkDataType, removeDuplicate } from '../../helpers/reusable'
// import { useDispatch } from 'react-redux'
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
import InvalidModal from '../UI/Invalid'

import { deletePOHandler } from '../../lib/apollo_client/poApollo';

export default function POentry({
  poData = {
    refType: 'Ref Type',
    refId: 'Ref ID',
    items: 'Items',
    status: 'Status',
  },
  poIndex = 'Sr',
  header = false
}) {

  const router = useRouter()

  const poItems = poData?.items;

  // Removal of Duplicate Items
  let refinedItemList = [], refinedItemsJsx;

  if (checkDataType(poItems) === 'array' && poItems?.length > 0) {
    const itemListArray = poItems.map((el, elIdx) => el.name); // ['po_item1', 'po_item1', 'po_item2']
    refinedItemList = removeDuplicate(itemListArray); // [{item: 'po_item1', qty:2 },{item: 'po_item2', qty:1 }]
    refinedItemsJsx = refinedItemList.map((el, idx) => {
      return <EntryItemName content={el.item} key={idx} />
    })
  } else {
    refinedItemsJsx = <EntryItemName isEmpty />
  }


  return (
    <>

      <DataRow header={header}>

        {/* Serial */}
        <DataRowItem flex={1} outerClasses={[styles.entryIndex]} content={typeof (poIndex) === 'number' ? (poIndex + 1) : poIndex} />

        {/* Ref Type */}
        <DataRowItem flex={1.5} outerClasses={[styles.entryType]} content={poData.refType} />

        {/* Ref ID */}
        <DataRowItem flex={2} outerClasses={[styles.entryId]} content={poData.refId} />

        {/* PO Items */}
        <DataRowItem
          flex={5}
          outerClasses={[styles.entryItemList]}
          content={header ? poData.items : refinedItemsJsx}
        // content={<EntryItemSpan content={'el.item'} key={'idx'} />}
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
              ${styles.entryStatusIcon} ${styles[`entryStatusIcon-${formatString(poData.status)}`]}`} />
                <span className={styles.entryStatusText} >{poData.status}</span>
              </>
          }
        />

        {/* PO Commands */}
        <DataRowItem
          flex={4}
          outerClasses={[styles.entryControls]}
          content={<>
            <ModalButton caption='Edit' /* tooltip='Edit' */ ModalComponent={PO_Form} invalidReason={'Closed PO cannot be edited'} oldPOdata={poData} /* disabled={poData.status === 'Closed'} */ />

            <ModalButton caption='Summary' ModalComponent={PO_Summary} poData={poData} itemList={refinedItemList} />
            <Button caption='Detail' click={() => router.push(`po/${poIndex}`)} />
            {/* <Button caption='Delete' click={() => dispatch(poActions.deletePO(poData.refId))} /> */}
            <Button caption='Delete' click={() => deletePOHandler(poData.refId)} />

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

function formatString(inputString) {
  // 'Format This String' -> 'formatThisString'
  if (inputString === undefined) return inputString; // if false value
  return inputString.trim().toLowerCase().replace(/\s+/g, '')
}



export function EntryItemName(props) {
  return (
    <span className={`${styles.entryItem} ${props.isEmpty && styles.entryItemEmpty}`}>
      {props.isEmpty ? 'No Item Found' : props.content}
    </span>
  )
}
