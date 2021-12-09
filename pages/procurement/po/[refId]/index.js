import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { poActions } from '../../../../store/po/po-slice'
import styles from '../../../../styles/poDetail.module.scss'
import { Router, useRouter } from 'next/router'
import MultiForm from '../../../../components/MultiForm/MultiForm'
import { cloneAndPluck } from '../../../../helpers/reusable'

import POheader from '../../../../components/PO/POdetail/POheader'
import POnavList from '../../../../components/PO/POdetail/POnavList'
import POdetails from '../../../../components/PO/POdetail/POdetails'

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { refId: '1' } },
//       { params: { refId: '2' } },
//       { params: { refId: '3' } }
//     ],
//     fallback: 'blocking'
//   }
// }

export async function getServerSideProps(context) {
  const pid = context.params.refId;
  return {
    props: {
      pid
    }
  }
}

export default function POdetailPage(pProps) {
  // Find the po against the ID in URL
  const poData = useSelector(state => { return state.po.find(item => item.refId === pProps.pid) })
  // Control the visible item in the PO for item details
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const totalItems = poData.items;

  poData && console.log(poData);
  // poData.refId && console.log(poData.refId);
  const poSummary = cloneAndPluck(poData, ['refId', 'refType', 'status', 'fulfillmentSource', 'category', 'supplier', 'totalCost'])

  return (
    <main className={styles.po} >


      {/* Header */}

      {/* ---Primary */}
      {/* ---Secondary */}
      {/* ---Controls */}

      {/* Navigation List */}

      {/* Detail */}


      <POheader
        classes={[styles.poHeader]}
        data={poSummary} // summary of current PO - top/entry level && buttons for next PO
      />
      <POnavList
        classes={[styles.poNavList]}
        data={poData} // list of items in current PO - with item-name & ID 
      />
      <POdetails
        classes={[styles.podetails]}
        data={poData} // detail for the current PO - nested/item/detail level
        dataIndex={activeItemIndex}
        setDataIndex={setActiveItemIndex}
        totalItems={totalItems}
      />

      {/* <section className={styles.poOverview}>
        <h1>Status: {poData.status} </h1>
        <h1>{poData.refType} ID: {poData.refId} </h1>
        <h1>Total Cost: {poData.currency} {poData.totalCost} </h1>
      </section>

      <section className={styles.poDetail} >
        <h1>Type: {poData.category}, {poData.fulfillmentSource} </h1>
        <h1>Supplier: {poData.supplier} </h1>
      </section> */}

      {/* <section className={styles.poItemList} >
        {console.log(poData.items)}
        {poData.items ?
          <ul>
            {
              poData.items.map((item, itemIdx) => {
                return <li key={itemIdx} >{item.name}</li>
              })
            }
          </ul>
          : <>No Items Available</>
        }
      </section> */}

      {/* <section className={styles.poItemDetail} >
        {poData.items &&
          <>
            <h2 className={styles.title} >Product Details</h2>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>ProductId</span>
              <span className={styles.pairValue}>{poData.items[activeItemIndex].id}</span>
            </h4>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>Product Name</span>
              <span className={styles.pairValue}>{poData.items[activeItemIndex].name}</span>
            </h4>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>Product Quantity</span>
              <span className={styles.pairValue}>{poData.items[activeItemIndex].qty}</span>
            </h4>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>Product Type</span>
              <span className={styles.pairValue}>{poData.items[activeItemIndex].type}</span>
            </h4>
            <h4 className={styles.pair}>
              <span className={styles.pairField}>Unit Price</span>
              <span className={styles.pairValue}>{poData.items[activeItemIndex].unitPrice}</span>
            </h4>


            <h2 className={styles.subTitle} >Specifications</h2>

            <ul className={styles.poItemSpecs} >
              {
                Object.entries(poData.items[activeItemIndex].specification).map((specPair, specPairIndex) => {
                  return <li className={styles.pair} key={specPairIndex}>
                    <h5 className={styles.pairField}>{specPair[0]}: </h5>
                    <p className={styles.pairValue}>{specPair[1]}</p>
                  </li>
                })
              }
            </ul>
            <button
              disabled={activeItemIndex === 0}
              onClick={
                (e) => {
                  setActiveItemIndex((prevState) => {
                    return prevState - 1
                  })
                }
              }
            >Last Item </button>
            <button
              disabled={activeItemIndex === totalItems.length - 1}
              onClick={
                (e) => {
                  setActiveItemIndex((prevState) => {
                    return prevState + 1
                  })
                }
              }
            >Next Item </button>
          </>
        }


      </section> */}

    </main>
  )
}

// Next functions

function commentCode(params) {
  return <>


  </>
}