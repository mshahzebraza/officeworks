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
import Item_Form from '../Forms/Item_Form';
import { deleteMWOitemHandler } from '../../../lib/apollo_client/mwoItemApollo';



export default function ItemDetail({ classes, itemData: existingModuleData, activeSourceId, sourceType = 'po' }) {

     if (!existingModuleData) return (<p className='note'>ItemData is not valid - ItemDetail</p>)

     let itemOrderDetail, itemSpecDetail;

     if (!!existingModuleData) { // setting itemOrderDetail & itemSpecDetail
          const {
               _id, unitPrice, qty, remarks, ...itemSpecs
          } = existingModuleData

          if (sourceType === 'mwo') {
               itemOrderDetail = { qty, remarks }
          } else if (sourceType === 'po') {
               itemOrderDetail = { unitPrice, qty, remarks }
          }
          itemSpecDetail = itemSpecs
     }



     return (
          <section className={concatStrings([...classes, styles.itemDetail])} >

               {/* Specifications */}
               <ItemSpecification specData={itemSpecDetail} />

               {/* Nav Buttons */}
               <NavControls activeSourceId={activeSourceId} existingModuleData={existingModuleData} />

               {/* Summary */}
               <Summary data={itemOrderDetail} sourceType={sourceType} />


          </section>
     )
}


// SECTION: Supporting Components
function Summary({ data, sourceType = 'po' }) {

     let orderType;
     if (sourceType === 'po') {
          orderType = 'Purchase'
     } else if (sourceType = 'mwo') {
          orderType = 'Work'
     }

     if (!data) return (<p className='note'>No Items Inside this PO. - POdetail</p>)

     return (
          <div className={styles.section}>
               <h2 className={styles.title}>{orderType} Order Summary</h2>
               <ul className={concatStrings([styles.content, styles.summary])}>
                    {transformEntries(data, renderListItem)}
               </ul>
          </div>
     );
}

function NavControls({ existingModuleData, activeSourceId, sourceType = 'po' }) {
     // Active source If is needed for the handlers and form components
     return (
          <div className={concatStrings([styles.section, styles.controls])}>
               <Button
                    caption='Delete Item'
                    disabled={!existingModuleData}
                    click={sourceType === 'po'
                         ? () => deletePOitemHandler([activeSourceId, existingModuleData?.id])
                         : () => deleteMWOitemHandler([activeSourceId, existingModuleData?.id])
                    }
               />
               <ModalButton
                    caption='Update Item'
                    ModalComponent={Item_Form}
                    activeSourceId={activeSourceId}
                    data={existingModuleData}
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

     // Moving the flexible fields up to the top
     const { specs, ...mainFields } = specData
     specData = { ...mainFields, ...specs }

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
