// Dependency
import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { isObjEmpty, camelToSentenceCase, transformEntries, genLog, cloneAndPluck, concatStrings, checkDataType } from '../../../helpers/reusable'

// Store & Styles
import { poActions } from '../../../store/po/po-slice';
import styles from './POitemDetail.module.scss'

// Components
import POitem_Form from '../POForms/POitem_Form';
import POitemSpecs_Form from '../POForms/POitemSpecs_Form';
import ModalButton from '../../UI/ModalButton';
import Button from '../../UI/Button';
import { deletePOitemHandler } from '../../../lib/apollo_client/poApollo';


export default function POitemDetail({ classes, data: itemList, activePOid, dataIndex, setDataIndex, activeStatus = 'Active' }) {
  // const dispatch = useDispatch();

  const curItemData = itemList && itemList[dataIndex] ? itemList[dataIndex] : false; // `No items found in PO`

  const itemSpecification = checkDataType(curItemData.specification) === 'object'
    && !isObjEmpty(curItemData.specification)
    && curItemData.specification;

  const itemSummary = curItemData && cloneAndPluck(curItemData, ['id', 'name', 'qty', 'type', 'unitPrice']);

  const oldSpecData = itemList && itemList[dataIndex] && itemList[dataIndex].specification
    && !isObjEmpty(itemList[dataIndex].specification)
    && itemList[dataIndex].specification
    || false;



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
              {/* <Button caption='Delete Item' click={() => { dispatch(poActions.deletePOitem([activePOid, dataIndex])) }} /> */}
              <Button caption='Delete Item' click={() => deletePOitemHandler([activePOid, dataIndex])} />
              <ModalButton
                caption='Update Item'
                ModalComponent={POitem_Form}
                activePOid={activePOid}
                activePOitemData={itemList[dataIndex]}
              />
              <ModalButton
                caption={`${oldSpecData && `Update` || `Add`} Specification`}
                ModalComponent={POitemSpecs_Form}
                activePOid={activePOid}
                activeItemIndex={dataIndex}
                activePOitemSpecs={oldSpecData && oldSpecData}
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
    <h5 className='pairField' >{camelToSentenceCase(pair[0])}: </h5>
    <p className='pairValue' >{pair[1]}</p>
  </li>
}
