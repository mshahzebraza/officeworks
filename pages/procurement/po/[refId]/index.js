import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { poActions } from '../../../../store/po/po-slice'
import styles from '../../../../styles/poDetail.module.scss'
import { Router, useRouter } from 'next/router'
import MultiForm from '../../../../components/MultiForm/MultiForm'

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

export default function POdetail(pProps) {
  const poData = useSelector(state => { return state.po.find(item => item.refId === pProps.pid) })
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const totalItems = poData.items;

  poData && console.log(poData);
  // poData.refId && console.log(poData.refId);

  return (
    <main>

      <section className={styles.poDetail} >
        <h1>{poData.refType} ID: {poData.refId} </h1>
        <h1>Total Cost: {poData.currency} {poData.totalCost} </h1>
        <h1>Supplier: {poData.supplier} </h1>
        <h1>Type: {poData.category}, {poData.fulfillmentSource} </h1>
        <h1>Status: {poData.status} </h1>
      </section>

      <section className={styles.poItemList} >
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
      </section>

      <section className={styles.poItemDetail} >
        {poData.items &&
          <>
            <h4>Product Id: {poData.items[activeItemIndex].id}</h4>
            <h4>Product Name: {poData.items[activeItemIndex].name}</h4>
            <h4>Product Qty: {poData.items[activeItemIndex].qty}</h4>
            <h4>Product Type: {poData.items[activeItemIndex].type}</h4>
            <h4>Unit Price: {poData.items[activeItemIndex].unitPrice}</h4>

            <h2>Specifications</h2>

            <ul className={styles.poItemSpecs} >
              {
                Object.entries(poData.items[activeItemIndex].specification).map((specPair, specPairIndex) => {
                  return <li key={specPairIndex}>
                    <h5 className="specTitle">{specPair[0]}: </h5>
                    <p className="specValue">{specPair[1]}</p>
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


      </section>

    </main>
  )
}

// Next functions

function commentCode(params) {
  return <>


  </>
}