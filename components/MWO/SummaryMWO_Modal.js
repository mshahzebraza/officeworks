// Dependency
import React from 'react'

// Store & Styles
import styles from './SummaryMWO_Modal.module.scss'

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'


export default function SummaryMWO_MFM({ closer, poData, itemList }) {
  return (
    <Portal>
      <Modal
        title='PO Detail'
        closer={closer}
      >
        {<div className={styles.body}>

          <p className={styles.data} >
            <span className={styles.dataField} >Reference ID:</span>
            <span className={styles.dataValue} >{poData.refId}</span>
          </p>
          <p className={styles.data} >
            <span className={styles.dataField} >Total Cost:</span>
            <span className={styles.dataValue} >{poData.totalCost}</span>
          </p>
          <p className={styles.data} >
            <span className={styles.dataField} >Supplier:</span>
            <span className={styles.dataValue} >{poData.supplier}</span>
          </p>
          <p className={styles.data} >
            <span className={styles.dataField} >PO Category:</span>
            <span className={styles.dataValue} >{poData.category}</span>
          </p>
          <p className={styles.data} >
            <span className={styles.dataField} >Source:</span>
            <span className={styles.dataValue} >{poData.fulfillmentSource}</span>
          </p>

          <div className={styles.data}>
            <span className={styles.dataField}>Items Procured:</span>
            <ul className={styles.dataValue} >
              {
                itemList && itemList.length > 0
                  ? itemList.map(
                    (item, itemIdx) => <li
                      className={styles.dataItem}
                      key={itemIdx}
                    >
                      <span className={styles.dataItemQty}> {item.qty} </span>
                      <span className={styles.dataItemType} >{item.item}</span>
                    </li>)
                  : <span>No items</span>
              }
            </ul>
          </div>

        </div>}
      </Modal>
    </Portal>
  )
}
