// Dependency
import React from 'react'
import { isObjEmpty, toSentenceCase, transformEntries, genLog, cloneAndPluck, concatStrings, checkDataType } from '../../../helpers/reusable'

// Store & Styles
import styles from './POitemDetail.module.scss'
import moduleApollo, { deletePOitemHandler, addPOitemHandler } from '../../../lib/apollo_client/poItemApollo';

// Components
import POitem_Form from '../POForms/POitem_Form';
import POitemSpecs_Form from '../POForms/POitemSpecs_Form';
import ModalButton from '../../UI/ModalButton';
import Button from '../../UI/Button';


export default function POitemDetail({ classes, itemList = [], activePOid, activeItemIndex, setActiveModuleIndex, activeStatus = 'Active' }) {

     // ? "existingModuleData" contains only the module-specific moduleData
     // ? "existingModuleData" contains only the complete moduleData
     // ? "itemList" ???


     // const moduleState = [...moduleApollo()]
     // fetch Selected item from itemList
     const existingModuleData = itemList?.[activeItemIndex]; // `No items found in PO`

     // delete _id field
     // delete existingModuleData?.specification?._id;

     // fetch specs from existingModuleData
     const itemSpecification = checkDataType(existingModuleData?.specification) === 'object'
          && !isObjEmpty(existingModuleData.specification)
          && existingModuleData.specification;

     // Fetch id, name, and specs from existingModuleData
     const itemSummary = existingModuleData && cloneAndPluck(existingModuleData, ['id', 'name', 'qty', 'type', 'unitPrice']);


     return (
          <section className={concatStrings([...classes, styles.itemDetail])} >

               {/* Summary */}
               {
                    itemSummary ?
                         <div className={styles.section} >
                              <h2 className={styles.title} >Product Summary</h2>
                              <ul className={concatStrings([styles.content, styles.summary])} >
                                   {
                                        transformEntries(itemSummary, renderListItem)
                                   }
                              </ul>
                         </div>
                         :
                         <p className='note'>No Items Inside this PO. - POdetail</p>
               }



               {/* Nav Buttons */}
               {
                    <div className={concatStrings([styles.section, styles.controls])}>

                         {
                              itemList && itemList.length > 0 &&
                              <>
                                   {/* <Button caption='Delete Item' click={() => { dispatch(poActions.deletePOitem([activePOid, activeItemIndex])) }} /> */}
                                   <Button caption='Delete Item' click={() => deletePOitemHandler([activePOid, existingModuleData?.id])} />
                                   <ModalButton
                                        caption='Update Item'
                                        ModalComponent={POitem_Form}
                                        activePOid={activePOid}
                                        activePOitemData={itemList[activeItemIndex]}
                                   />
                                   <ModalButton
                                        caption={`${existingModuleData && `Update` || `Add`} Specification`}
                                        ModalComponent={POitemSpecs_Form}
                                        activePOid={activePOid}
                                        activeItemId={existingModuleData?.id}
                                        activeItemIndex={activeItemIndex}
                                        activePOitemSpecs={existingModuleData}
                                   />
                              </>
                         }


                    </div>
               }


               {/* Specifications */}
               {itemSpecification ?
                    <div className={styles.section}>
                         <h2 className={styles.subTitle} >Specifications</h2>
                         <ul className={concatStrings([styles.content, styles.specs])} >
                              {
                                   transformEntries(itemSpecification, renderListItem)
                              }
                         </ul>
                    </div> : <p className='note'>No Specification for item. - POdetail</p>
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
