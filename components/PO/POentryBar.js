// Dependency
import Image from 'next/image'
import React, { useState } from 'react'
import { removeDuplicate } from '../../helpers/reusable'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// Store & Styles
import styles from './POentryBar.module.scss';
import { poActions } from '../../store/po/po-slice'

// Components
import PO_Summary from './PO_Summary'
import PO_Form from './PO_Form'



export default function POentryBar({ poData, poIndex }) {

  const router = useRouter()
  const dispatch = useDispatch();

  const [showSummary, setShowSummary] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const poItems = poData.items;

  // Removal of Duplicate Items
  let refinedItemList = [];
  if (poItems && poItems.length > 0) {
    const itemListArray = poItems.map((el, elIdx) => el.name); // ['po_item1', 'po_item1', 'po_item2']
    refinedItemList = removeDuplicate(itemListArray); // [{reusable: 'po_item1', qty:2 },{item: 'po_item2', qty:1 }]
  }


  /* 
  refType, refId, items (item-qty pair) , Status
   */
  return (
    <li className={styles.entry} >

      {/* Serial */}
      <span className={styles.entryIndex}>{poIndex + 1}</span>

      {/* Ref Type */}
      <span className={styles.entryType}>{poData.refType}</span>

      {/* Ref ID */}
      <span className={styles.entryId}>{poData.refId}</span>

      {/* PO Items */}
      <span className={styles.entryItemList}>
        {
          refinedItemList.length > 0
            ? refinedItemList.map((el, idx) => <EntryItemName content={el.item} key={idx} />)
            : <EntryItemName isEmpty />
        }
      </span>

      {/* PO Status */}
      <span className={styles.entryStatus}>
        <span className={`${styles.entryStatusIcon} ${styles[`entryStatusIcon-${poData.status.trim().toLowerCase().replace(/\s+/g, '')}`]}`} />
        <span className={styles.entryStatusText} >{poData.status}</span>
      </span>

      {/* PO Commands */}
      <div className={styles.entryControls}>
        <EntryCtrlBtn type={'Edit'} click={() => setShowUpdateForm(true)} ></EntryCtrlBtn>
        {showUpdateForm && <PO_Form closer={() => setShowUpdateForm(false)} oldPOdata={poData} />}

        <EntryCtrlBtn type={'Summary'} click={() => setShowSummary(true)} ></EntryCtrlBtn>
        {showSummary && <PO_Summary closer={() => setShowSummary(false)} poData={poData} itemList={refinedItemList} />}

        <EntryCtrlBtn type={'Detail'} click={() => router.push(`po/${poIndex}`)} />

        <EntryCtrlBtn type={'Delete'} click={() => dispatch(poActions.deletePO(poData.refId))} />
      </div>
    </li>
  )
}


// Edit,Summary,Detail,Delete
function EntryCtrlBtn(props) { // Pass the `TYPE` in sentence case

  return (
    <button
      className={`${styles[`entryControls${props.type}`]} ${`tooltip`}`}
      onClick={props.click}
    >
      <Image
        src={`/icons/${props.type}.png`}
        alt={props.type}
        width={20}
        height={20} />
      <span className={`tooltipContent`}>{props.type}</span>
    </button>
  )
}

function EntryItemName(props) {
  return (
    <span className={`${styles.entryItem} ${props.isEmpty && styles.entryItemEmpty}`}>
      {props.isEmpty ? 'No Item Found' : props.content}
    </span>
  )
}
