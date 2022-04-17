// Dependency
import React from 'react'
// Styles & Stores
import styles from './POheader.module.scss'
// Components
import { concatStrings, transformEntries, toSentenceCase, cloneAndPluck } from '../../../helpers/reusable'
import POitem_Form from '../Forms/POitem_Form'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { poActions } from '../../../store/po/po-slice'
import ModalButton from '../../UI/ModalButton'
import Button from '../../UI/Button'
import { deletePOHandler } from '../../../lib/apollo_client/poApollo'
import Source_Form from '../../Procurement/Forms/Source_Form'


export default function POheader({ activePOdata, classes }) {
     // const dispatch = useDispatch();

     const OV_data = cloneAndPluck(activePOdata, ['refId', 'refType', 'totalCost'])
     const meta_data = cloneAndPluck(activePOdata, ['fulfillmentSource', 'category', 'supplier'])

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

                    <ModalButton
                         caption='Add PO Item'
                         ModalComponent={POitem_Form}
                         activePOid={activePOdata.refId}
                    />
                    <Button
                         caption='Delete PO'
                         // click={() => { dispatch(poActions.deletePO(activePOid)) }}
                         click={() => { deletePOHandler(activePOdata._id) }}

                    />

                    <ModalButton
                         caption='Update PO Summary'
                         ModalComponent={Source_Form}
                         data={activePOdata}
                         sourceType='po'
                    // activePOdata={activePOdata}
                    />



               </section>
          </section>
     )
}

export function entryCallback(pairArr, pairIndex) {
     return (
          <h3 key={`summaryPair-${pairIndex}`} className={concatStrings(['pair', styles.pair])} >
               <span className={concatStrings(['pairField', styles.pairField])} >{toSentenceCase(pairArr[0])}</span>
               <span className={concatStrings(['pairValue', styles.pairValue])} >{pairArr[1]}</span>
          </h3>
     )
}