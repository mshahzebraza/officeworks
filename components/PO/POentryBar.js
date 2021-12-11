import Image from 'next/image'
import React from 'react'
import styles from './POentryBar.module.scss'
import { transformArray } from '../../helpers/reusable'

export default function POentryBar(props) {
  const pd = props.data;
  const ph = props.handlers;
  /* 
  refType, refId, items (item-qty pair) , Status
   */
  return (
    <div className={styles.entry} >

      {/* Serial */}
      <span className={styles.entryIndex}>{pd.index}</span>

      {/* Ref Type */}
      <span className={styles.entryType}>{pd.refType}</span>

      {/* Ref ID */}
      <span className={styles.entryId}>{pd.refId}</span>

      {/* PO Items */}
      <span className={styles.entryItemList}>
        {
          pd.itemList.length > 0
            ? pd.itemList.map((el, idx) => <EntryItemName content={el.item} key={idx} />)
            : <EntryItemName isEmpty />
        }
      </span>

      {/* PO Status */}
      <span className={styles.entryStatus}>
        <span className={`${styles.entryStatusIcon} ${styles[`entryStatusIcon-${pd.status.trim().toLowerCase()}`]}`} />
        <span className={styles.entryStatusText} >{pd.status}</span>
      </span>

      {/* PO Commands */}
      <div className={styles.entryControls}>
        <EntryCtrlBtn type={'Edit'} click={() => ph.edit(true)} ></EntryCtrlBtn>
        <EntryCtrlBtn type={'Summary'} click={() => ph.summary(true)} ></EntryCtrlBtn>
        <EntryCtrlBtn type={'Detail'} click={() => ph.detail(pd.refId)} ></EntryCtrlBtn>
        <EntryCtrlBtn type={'Delete'} click={() => ph.delete(pd.refId)} ></EntryCtrlBtn>
      </div>
    </div>
  )
}


// Edit,Summary,Detail,Delete
function EntryCtrlBtn(props) { // Pass the `TYPE` in sentence case
  // console.log('props', props);
  // console.log(props.type.toLowerCase());

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
