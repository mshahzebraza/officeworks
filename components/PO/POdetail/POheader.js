// Dependency
import React from 'react'
// Styles & Stores
import styles from './POheader.module.scss'
// Components
import { concatStrings, transformEntries, camelToSentenceCase, cloneAndPluck } from '../../../helpers/reusable'

export default function POheader(props) {
  // console.log(props.data);
  const OV_data = cloneAndPluck(props.data, ['refId', 'refType', 'totalCost'])
  const meta_data = cloneAndPluck(props.data, ['fulfillmentSource', 'category', 'supplier'])

  return (
    <section className={concatStrings([...props.classes, styles.poHeader])} >
      {/* Overview */}
      <div className={styles.poOverview}>
        {transformEntries(OV_data, entryCallback)}
      </div>

      {/* Secondary */}
      <div className={styles.poMeta} >
        {transformEntries(meta_data, entryCallback)}
      </div>
      {/* Controls */}
      {/* <section className={styles.poControls}></section> */}
    </section>
  )
}

export function entryCallback(pairArr, pairIndex) {
  return (
    <h3 key={`summaryPair-${pairIndex}`} className={styles.pair}>
      <span className={styles.pairField}>{camelToSentenceCase(pairArr[0])}</span>
      <span className={styles.pairValue}>{pairArr[1]}</span>
    </h3>
  )
}