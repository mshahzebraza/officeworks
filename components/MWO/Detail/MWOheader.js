// Dependency
import React from 'react'
// Styles & Stores
import styles from './MWOheader.module.scss'
// Components
import { concatStrings, transformEntries, toSentenceCase, cloneAndPluck } from '../../../helpers/reusable'
import MWOitem_Form from '../Forms/MWOitem_Form'
import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import MWO_Form from '../Forms/MWO_Form'
import ModalButton from '../../UI/ModalButton'
import Button from '../../UI/Button'
import { deleteMWOHandler } from '../../../lib/apollo_client/mwoApollo'

export default function MWOheader({ activeMWOuuid, /* activeMWOid, */ data, classes }) {

     const OV_data = cloneAndPluck(data, ['refId', 'refType', 'totalCost'])
     const meta_data = cloneAndPluck(data, ['fulfillmentSource', 'category', 'supplier'])

     return (
          <section className={concatStrings([...classes, styles.mwoHeader])} >
               {/* Overview */}
               <div className={styles.mwoOverview}>
                    {transformEntries(OV_data, entryCallback)}
               </div>

               {/* Secondary */}
               <div className={styles.mwoMeta} >
                    {transformEntries(meta_data, entryCallback)}
               </div>
               {/* Controls */}
               <section className={styles.mwoControls}>

                    <ModalButton
                         caption='Add MWO Item'
                         ModalComponent={MWOitem_Form}
                         activeMWOid={data.refId}
                    />
                    <Button
                         caption='Delete MWO'
                         click={() => { deleteMWOHandler(activeMWOuuid) }}

                    />

                    <ModalButton
                         caption='Update MWO Summary'
                         ModalComponent={MWO_Form}
                         activeMWOdata={data}
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