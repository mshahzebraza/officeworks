import React from 'react'
import styles from './POdetails.module.scss'
import { camelToSentenceCase, transformEntries, genLog, cloneAndPluck } from '../../../helpers/reusable'

export default function POdetails({ data: itemList, dataIndex, setDataIndex, totalItems }) {
  // genLog('Total Items', totalItems)
  // Data used - Top Level
  /*
    Product Id        : {data[dataIndex].id}
    Product Name      : {data[dataIndex].name}
    Product Quantity  : {data[dataIndex].qty}
    Product Type      : {data[dataIndex].type}
    Unit Price        : {data[dataIndex].unitPrice}
   */


  const itemLabels = [
    'Item Id',
    'Item Name',
    'Item Quantity',
    'Item Type',
    'Unit Price'
  ]
  const specLabels = [

  ]

  const curItemData = itemList[dataIndex] ? itemList[dataIndex] : `No items found in PO`;

  // genLog(`Current Item Data`, curItemData)

  const itemSummary = cloneAndPluck(curItemData, ['id', 'name', 'qty', 'type', 'unitPrice']);
  // genLog('itemSummary', itemSummary);

  const itemSpecification = curItemData.specification;
  // genLog(`itemSpecification`, itemSpecification);


  return (
    <div>
      <section className={styles.poItemDetail} >
        {
          itemSummary ?
            <>
              <h2 className={styles.title} >Product Details</h2>
              {
                transformEntries(itemSummary, renderListItem)
              }
            </>
            :
            <p className='note'>No Items Inside this PO. - POdetail</p>
        }

        {itemSpecification ?
          <>
            <h2 className={styles.subTitle} >Specifications</h2>
            <ul className={styles.poItemSpecs} >
              {
                transformEntries(itemSpecification, renderListItem)
              }
            </ul>
          </> : <p className='note'>No Specification for item. - POdetail</p>
        }

        {totalItems.length > 1 &&
          <>
            {navBtn('prev', setDataIndex, totalItems.length, dataIndex, 'Prev Item')}
            {navBtn('next', setDataIndex, totalItems.length, dataIndex, 'Next Item')}
          </>
        }
      </section>
    </div>
  )
}

export function renderListItem(pair, pairIndex) {
  return <li className={styles.pair} key={pairIndex}>
    <h5 className={styles.pairField}>{camelToSentenceCase(pair[0])}: </h5>
    <p className={styles.pairValue}>{pair[1]}</p>
  </li>
}

export function navBtn(type = 'next', stateSetter, dataLength, curDataIndex, caption) {
  return <button
    disabled={type === 'next' ? (curDataIndex === dataLength - 1) : (curDataIndex === 0)}
    onClick={
      (e) => {
        stateSetter((prevState) => {
          return type === 'next' ? prevState + 1 : prevState - 1;
        })
      }
    }
  >{caption ? caption : type}</button>
}

