// Dependency
import React from 'react'
// Styles & Stores
import styles from './POheader.module.scss'
// Components
import { concatStrings, transformEntries, camelToSentenceCase, cloneAndPluck } from '../../../helpers/reusable'

export default function POheader({ poId, data, classes }) {
  // console.log(data);
  const OV_data = cloneAndPluck(data, ['refId', 'refType', 'totalCost'])
  const meta_data = cloneAndPluck(data, ['fulfillmentSource', 'category', 'supplier'])

  return (
    <section className={concatStrings([...classes, styles.poHeader])} >
      {/* Overview */}
      <div className={styles.poOverview}>
        {transformEntries(OV_data, entryCallback)}
      </div>

      {/* Secondary */}
      <div className={styles.poMeta} >
        {transformEntries(meta_data, entryCallback)}
      </div>
      {/* Controls */}
      <section className={styles.poControls}>
        {/* <button
          onClick={
            (e) => {
              dispatch(poActions.deletePO(poId)) // To make it work, first make the app handle empty pages and show fallback
            }
          }
        >Delete PO# {poId}</button> */}
        {/* <button
          className={styles.btn}
          // disabled={type === 'next' ? (curDataIndex === dataLength - 1) : (curDataIndex === 0)}
          onClick={
            (e) => {
              // console.log(poId);
              dispatch(poActions.deletePO(poId))
              // router.replace('/procurement/po')
            }
          }
        >Edit Item# {poId}</button> */}

      </section>
    </section>
  )
}

export function entryCallback(pairArr, pairIndex) {
  return (
    <h3 key={`summaryPair-${pairIndex}`} className={concatStrings(['pair', styles.pair])} >
      <span className={concatStrings(['pairField', styles.pairField])} >{camelToSentenceCase(pairArr[0])}</span>
      <span className={concatStrings(['pairValue', styles.pairValue])} >{pairArr[1]}</span>
    </h3>
  )
}