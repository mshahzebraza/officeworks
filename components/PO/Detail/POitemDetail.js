// Dependency
import React from 'react'
import { isObjEmpty, toSentenceCase, transformEntries, genLog, cloneAndPluck, concatStrings, checkDataType } from '../../../helpers/reusable'

// Store & Styles
import styles from './POitemDetail.module.scss'
import moduleApollo, { deletePOitemHandler, addPOitemHandler } from '../../../lib/apollo_client/poItemApollo';

// Components
import POitem_Form from '../Forms/POitem_Form';
import POitemSpecs_Form from '../Forms/POitemSpecs_Form';
import ModalButton from '../../UI/ModalButton';
import Button from '../../UI/Button';


export default function POitemDetail({ classes, itemList = [], activePOid, activeItemIndex, setActiveModuleIndex, activeStatus = 'Active' }) {

     let itemSummary, itemSpecification;

     let existingModuleData = itemList[activeItemIndex]; // `No items found in PO`

     if (!!existingModuleData) { // setting itemSummary & itemSpecification
          const {
               _id, unitPrice, qty, remarks, ...itemSpecs
          } = existingModuleData
          itemSummary = { unitPrice, qty, remarks }
          itemSpecification = itemSpecs
     }



     return (
          <section className={concatStrings([...classes, styles.itemDetail])} >

               {/* Specifications */}
               {itemSpecification ?
                    <div className={styles.section}>
                         <h1 className={styles.title} >Product Specification</h1>
                         <ul className={concatStrings([styles.content, styles.specs])} >
                              {
                                   transformEntries(itemSpecification, renderListItem)
                              }
                         </ul>
                    </div> : <p className='note'>No Specification for item. - POdetail</p>
               }

               {/* Nav Buttons */}
               {
                    <div className={concatStrings([styles.section, styles.controls])}>

                         {
                              itemList && itemList.length > 0 &&
                              <>
                                   <Button
                                        caption='Delete Item'
                                        disabled={!existingModuleData}
                                        click={() => deletePOitemHandler([activePOid, existingModuleData?.id])} />
                                   <ModalButton
                                        caption='Update Item'
                                        ModalComponent={POitem_Form}
                                        activePOid={activePOid}
                                        activePOitemData={existingModuleData}
                                   />
                                   <ModalButton
                                        caption={`${!!existingModuleData && `Update` || `Add`} Specification`}
                                        ModalComponent={POitemSpecs_Form}
                                        activeModuleSpecs={existingModuleData}
                                   />
                              </>
                         }


                    </div>
               }


               {/* Summary */}
               {
                    itemSummary ?
                         <div className={styles.section} >
                              <h2 className={styles.title} >Purchase Summary</h2>
                              <ul className={concatStrings([styles.content, styles.summary])} >
                                   {
                                        transformEntries(itemSummary, renderListItem)
                                   }
                              </ul>
                         </div>
                         :
                         <p className='note'>No Items Inside this PO. - POdetail</p>
               }


          </section>
     )
}



export function renderListItem(pair, pairIndex) {
     return <li className='pair' key={pairIndex}>
          <h5 className='pairField' >{toSentenceCase(pair[0])}: </h5>
          <p className='pairValue' >{pair[1]}</p>
     </li>
}
