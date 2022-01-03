// Dependency
import React from 'react'
// Styles & Stores
import styles from './POheader.module.scss'
// Components
import { concatStrings, transformEntries, camelToSentenceCase, cloneAndPluck } from '../../../helpers/reusable'
import POitem_Form from '../POForms/POitem_Form'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { poActions } from '../../../store/po/po-slice'
import PO_Form from '../PO_Form'





export default function POheader({ activePOid, data, classes }) {
  const dispatch = useDispatch();

  const [showPOitemForm, setShowPOitemForm] = useState(false)
  const [showPOform, setShowPOform] = useState(false)

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


        <button onClick={() => setShowPOitemForm(true)} >Add PO Item</button>
        {showPOitemForm && <POitem_Form closer={() => setShowPOitemForm(false)} activePOid={data.refId} />}



        <button
          onClick={
            (e) => {
              dispatch(poActions.deletePO(activePOid)) // To make it work, first make the app handle empty pages and show fallback
            }
          }
        >Delete PO</button>


        <button className={styles.btn} onClick={() => setShowPOform(true)} >Edit PO Summary</button>

        {showPOform && <PO_Form closer={() => setShowPOform(false)} oldPOdata={data} />}

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