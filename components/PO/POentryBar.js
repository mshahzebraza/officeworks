import Image from 'next/image'
import React from 'react'
import styles from './POentryBar.module.scss'

export default function POentryBar(props) {
  const pd = props.data;
  const ph = props.handlers;
  /* 
  refType, refId, items (item-qty pair) , Status
   */
  return (
    <div className={styles.entry} >
      <span className={styles.entryIndex}>{pd.index}</span>
      <span className={styles.entryType}>{pd.refType}</span>
      <span className={styles.entryId}>{pd.refId}</span>
      <span className={styles.entryItemList}>
        {
          pd.itemList
            ? pd.itemList.map(
              (item, itemIdx) =>
                <span
                  key={itemIdx}
                  className={styles.entryItem}
                >
                  {item.name}
                </span>
            )
            : <span className={`${styles.entryItem} ${styles.entryItemEmpty}`} >
              No items found
            </span>
        }
      </span>
      <span className={styles.entryStatus}>
        <span className={`${styles.entryStatusIcon} ${styles[`entryStatusIcon-${pd.status.trim().toLowerCase()}`]}`} />
        <span className={styles.entryStatusText} >{pd.status}</span>
      </span>
      <div className={styles.entryControls}>
        <button
          className={`${styles.entryControlsEdit} ${`tooltip`}`}
          onClick={() => ph.edit(true)}
        >
          <Image src="/icons/editRecord.png" alt="editRecord" width={20} height={20} />
          <span className={`tooltipContent`} >Edit Record</span>
        </button>
        <button
          className={`${styles.entryControlsShow} ${`tooltip`}`}
          onClick={() => ph.show(true)}
        >
          <Image src="/icons/showRecord.png" alt="showRecord" width={20} height={20} />
          <span className={`tooltipContent`} >Show Record</span>
        </button>
        <button
          className={`${styles.entryControlsDetail} ${`tooltip`}`}
          onClick={() => ph.detail(pd.refId)}
        >
          <Image src="/icons/detailPage.png" alt="detailPage" width={20} height={20} />
          <span className={`tooltipContent`} >Detail Page</span>
        </button>
        <button
          className={`${styles.entryControlsDelete} ${`tooltip`}`}
          onClick={() => ph.delete(pd.refId)}
        >
          <Image src="/icons/deleteRecord.png" alt="deleteRecord" width={20} height={20} />
          <span className={`tooltipContent`} >Delete Record</span>
        </button>
      </div>
    </div>
  )
}

// function getStatusClassSuffix(params) {

// }