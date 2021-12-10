import React from 'react'
import styles from './POdetails.module.scss'
import { genLog, cloneAndPluck } from '../../../helpers/reusable'

export default function POdetails({ data: itemList, dataIndex, setDataIndex, totalItems }) {
  // Data used - Top Level
  /*
    Product Id        : {data[dataIndex].id}
    Product Name      : {data[dataIndex].name}
    Product Quantity  : {data[dataIndex].qty}
    Product Type      : {data[dataIndex].type}
    Unit Price        : {data[dataIndex].unitPrice}
   */

  // DOM Mockup for a pair entry
  /*
    <h4 className={styles.pair}>
      <span className={styles.pairField}>Product Id</span>
      <span className={styles.pairValue}>{data[dataIndex].id}</span>
    </h4>
   */

  // render function for the specification object
  /*
    {
      Object.entries(data[dataIndex].specification).map((specPair, specPairIndex) => {
        return <li className={styles.pair} key={specPairIndex}>
          <h5 className={styles.pairField}>{specPair[0]}: </h5>
          <p className={styles.pairValue}>{specPair[1]}</p>
        </li>
      })
    }
   */

  const curItemData = itemList[dataIndex] ? itemList[dataIndex] : `No items found in PO`;

  genLog(`Current Item Data`, curItemData)

  const itemSummary = cloneAndPluck(curItemData, ['id', 'name', 'qty', 'type', 'unitPrice']);
  console.log('itemSummary', itemSummary);

  const itemSpecification = curItemData.specification;
  console.log(`itemSpecification`, itemSpecification);


  return (
    <div>
      <section className={styles.poItemDetail} >
        {itemList &&
          <>
            <h2 className={styles.title} >Product Details</h2>

            <h4 className={styles.pair}>
              <span className={styles.pairField}>Product Id</span>
              <span className={styles.pairValue}>{itemSummary.id}</span>
            </h4>

            {/* <h4 className={styles.pair}>
              <span className={styles.pairField}>Product Name</span>
              <span className={styles.pairValue}>{itemList[dataIndex].name}</span>
            </h4>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>Product Quantity</span>
              <span className={styles.pairValue}>{itemList[dataIndex].qty}</span>
            </h4>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>Product Type</span>
              <span className={styles.pairValue}>{itemList[dataIndex].type}</span>
            </h4>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>Unit Price</span>
              <span className={styles.pairValue}>{itemList[dataIndex].unitPrice}</span>
            </h4> */}


            <h2 className={styles.subTitle} >Specifications</h2>

            <ul className={styles.poItemSpecs} >
              {
                itemSpecification
                  ? Object.entries(itemSpecification).map((specPair, specPairIndex) => {
                    return <li className={styles.pair} key={specPairIndex}>
                      <h5 className={styles.pairField}>{specPair[0]}: </h5>
                      <p className={styles.pairValue}>{specPair[1]}</p>
                    </li>
                  })
                  : `No Specification for item.`
              }
            </ul>
            <button
              disabled={dataIndex === 0}
              onClick={
                (e) => {
                  setDataIndex((prevState) => {
                    return prevState - 1
                  })
                }
              }
            >Last Item </button>
            <button
              disabled={dataIndex === totalItems.length - 1}
              onClick={
                (e) => {
                  setDataIndex((prevState) => {
                    return prevState + 1
                  })
                }
              }
            >Next Item </button>
          </>
        }


      </section>
    </div>
  )
}
