// Dependency
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { camelToSentenceCase, transformEntries, genLog, cloneAndPluck, concatStrings } from '../../../helpers/reusable'

// Store & Styles
import { poActions } from '../../../store/po/po-slice';
import styles from './POitemDetail.module.scss'

// Components
import AddPOitem_Modal from './AddPOitem_Modal';
import UpdatePOitem_Modal from './UpdatePOitem_Modal.js';


export default function POdetails({ classes, data: itemList, activePOid, dataIndex, setDataIndex }) {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  genLog('Active PO #', activePOid)
  genLog('Data Index', dataIndex)

  // Data used - Top Level
  /*
    Product Id        : {data[dataIndex].id}
    Product Name      : {data[dataIndex].name}
    Product Quantity  : {data[dataIndex].qty}
    Product Type      : {data[dataIndex].type}
    Unit Price        : {data[dataIndex].unitPrice}
   */


  const itemLabels = [
    'Item Id',
    'Item Name',
    'Item Quantity',
    'Item Type',
    'Unit Price'
  ]
  const specLabels = [

  ]

  const curItemData = itemList[dataIndex] ? itemList[dataIndex] : `No items found in PO`;

  // genLog(`Current Item Data`, curItemData)

  const itemSummary = cloneAndPluck(curItemData, ['id', 'name', 'qty', 'type', 'unitPrice']);
  // genLog('itemSummary', itemSummary);

  const itemSpecification = curItemData.specification;
  // genLog(`itemSpecification`, itemSpecification);


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
      {itemList.length > 1 &&
        <div className={concatStrings([styles.section, styles.controls])}>

          {ctrlBtn('prev', setDataIndex, itemList.length, dataIndex, 'Prev Item')}
          {ctrlBtn('next', setDataIndex, itemList.length, dataIndex, 'Next Item')}
          <button onClick={() => dispatch(poActions.deletePOitem([activePOid, dataIndex]))} >Delete Item</button>

          <button onClick={() => setShowUpdateForm(true)} >Update Item</button>
          {/* {showUpdateForm && console.log(`Showing Update Modal`)} */}
          {showUpdateForm &&
            <UpdatePOitem_Modal
              closer={() => setShowUpdateForm(false)}
              activePOid={activePOid}
              activeItemData={itemList[dataIndex]}
            />
          }
          {/* Call a modal to trigger  dispatch(poActions.updatePOitem([activePOid, dataIndex, newData])) */}

          <button onClick={() => setShowAddForm(true)} >Add Item</button>
          {showAddForm && <AddPOitem_Modal closer={() => setShowAddForm(false)} activePOid={activePOid} />}
          {/* Call a modal to trigger  dispatch(poActions.addPOitem([activePOid, newData])) */}

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

export function ctrlBtn(type = 'next', stateSetter, dataLength, curDataIndex, caption) {
  return <button
    className={styles.btn}
    disabled={type === 'next' ? (curDataIndex === dataLength - 1) : (curDataIndex === 0)}
    onClick={
      (e) => {
        stateSetter((prevState) => {
          return type === 'next' ? prevState + 1 : prevState - 1;
        })
      }
    }
  >{caption ? caption : type}</button>
}

