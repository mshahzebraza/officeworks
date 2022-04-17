// Dependency
import React from 'react'
import { isObjEmpty, toSentenceCase, transformEntries, genLog, cloneAndPluck, concatStrings, checkDataType } from '../../../helpers/reusable'

// Store & Styles
import styles from './ItemDetail.module.scss'
import moduleApollo, { deletePOitemHandler, addPOitemHandler } from '../../../lib/apollo_client/poItemApollo';

// Components

import ModalButton from '../../UI/ModalButton';
import Button from '../../UI/Button';
import ItemSpecs_Form from '../Forms/ItemSpecs_Form';
import POitem_Form from '../../PO/Forms/POitem_Form';
import Item_Form from '../Forms/Item_Form';



export default function ItemDetail({ classes, itemData: existingModuleData, activeSourceId }) {

     if (!existingModuleData) return (<p className='note'>ItemData is not valid - ItemDetail</p>)

     let itemPurchaseDetail, moduleSpecs;

     if (!!existingModuleData) { // setting itemPurchaseDetail & moduleSpecs
          const {
               _id, unitPrice, qty, remarks, ...itemSpecs
          } = existingModuleData
          itemPurchaseDetail = { unitPrice, qty, remarks }
          moduleSpecs = itemSpecs
     }



     return (
          <section className={concatStrings([...classes, styles.itemDetail])} >

               {/* Specifications */}
               <ItemSpecification specData={moduleSpecs} />

               {/* Nav Buttons */}
               <NavControls activeSourceId={activeSourceId} existingModuleData={existingModuleData} />

               {/* Summary */}
               <Summary purchaseData={itemPurchaseDetail} />


          </section>
     )
}


// SECTION: Supporting Components
function Summary({ purchaseData }) {
     if (!purchaseData) return (<p className='note'>No Items Inside this PO. - POdetail</p>)

     return (
          <div className={styles.section}>
               <h2 className={styles.title}>Purchase Summary</h2>
               <ul className={concatStrings([styles.content, styles.summary])}>
                    {transformEntries(purchaseData, renderListItem)}
               </ul>
          </div>
     );
}

function NavControls({ existingModuleData, activeSourceId }) {
     // Active source If is needed for the handlers and form components
     return (
          <div className={concatStrings([styles.section, styles.controls])}>
               <Button
                    caption='Delete Item'
                    disabled={!existingModuleData}
                    click={() => deletePOitemHandler(
                         [
                              activeSourceId,
                              existingModuleData?.id
                         ]
                    )}
               />
               <ModalButton
                    caption='Update Item'
                    // ModalComponent={Item_Form}
                    // activeSourceId={activeSourceId}
                    // data={existingModuleData}
                    ModalComponent={POitem_Form}
                    activePOid={activeSourceId}
                    activePOitemData={existingModuleData}
               />
               <ModalButton
                    caption={`${!!existingModuleData && `Update` || `Add`} Specification`}
                    ModalComponent={ItemSpecs_Form}
                    data={existingModuleData}
               />
          </div>
     );
}


function ItemSpecification({ specData }) {


     return (
          <div className={styles.section}>
               <h1 className={styles.title}>Product Specification</h1>
               <ul className={concatStrings([styles.content, styles.specs])}>
                    {transformEntries(specData, renderListItem)}
               </ul>
          </div>
     );
}
// SECTION: Helper Functions
export function renderListItem(pair, pairIndex) {
     return <li className='pair' key={pairIndex}>
          <h5 className='pairField' >{toSentenceCase(pair[0])}: </h5>
          <p className='pairValue' >{pair[1]}</p>
     </li>
}
