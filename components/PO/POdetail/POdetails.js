import React from 'react'
import styles from './POdetails.module.scss'

export default function POdetails({ data, dataIndex, setDataIndex, totalItems }) {
  return (
    <div>
      <section className={styles.poItemDetail} >
        {data.items &&
          <>
            <h2 className={styles.title} >Product Details</h2>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>ProductId</span>
              <span className={styles.pairValue}>{data.items[dataIndex].id}</span>
            </h4>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>Product Name</span>
              <span className={styles.pairValue}>{data.items[dataIndex].name}</span>
            </h4>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>Product Quantity</span>
              <span className={styles.pairValue}>{data.items[dataIndex].qty}</span>
            </h4>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>Product Type</span>
              <span className={styles.pairValue}>{data.items[dataIndex].type}</span>
            </h4>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>Unit Price</span>
              <span className={styles.pairValue}>{data.items[dataIndex].unitPrice}</span>
            </h4>


            <h2 className={styles.subTitle} >Specifications</h2>

            <ul className={styles.poItemSpecs} >
              {
                Object.entries(data.items[dataIndex].specification).map((specPair, specPairIndex) => {
                  return <li className={styles.pair} key={specPairIndex}>
                    <h5 className={styles.pairField}>{specPair[0]}: </h5>
                    <p className={styles.pairValue}>{specPair[1]}</p>
                  </li>
                })
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
