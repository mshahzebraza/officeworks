// Dependency
import React from 'react'

// Store & Styles
import styles from './SummaryPO_Modal.module.scss'

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'


export default function SummaryPO_MFM({ closer, poData, itemList }) {

  const poItemData = itemList && itemList.length > 0
    ? itemList.map(
      (item, itemIdx) => <li
        className={styles.dataItem}
        key={itemIdx}
      >
        <span className={styles.dataItemQty}> {item.qty} </span>
        <span className={styles.dataItemType} >{item.item}</span>
      </li>)
    : <span>No items</span>;
  return (
    <Portal>
      <Modal
        title='PO Detail'
        closer={closer}
      >
        {<div className={styles.body}>

          <SummaryItem field={`Reference ID`} value={poData.refId} />
          <SummaryItem field={`Total Cost`} value={poData.totalCost} />
          <SummaryItem field={`Supplier`} value={poData.supplier} />
          <SummaryItem field={`PO Category`} value={poData.category} />
          <SummaryItem field={`Source`} value={poData.fulfillmentSource} />
          <SummaryItem field={`Items Procured`} value={poItemData} isList />

        </div>}
      </Modal>
    </Portal>
  )
}



function SummaryItem({ field, value, isList }) {
  return (<p className={styles.data}>
    <span className={styles.dataField}>{field}:</span>
    {
      !isList
        ? <span className={styles.dataValue}>{value}</span>
        // To accommodate list items in case of nested items
        : <ul className={styles.dataValue}>{value}</ul>
    }
  </p>);
}