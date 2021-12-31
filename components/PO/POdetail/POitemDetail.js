// Dependency
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { isObjEmpty, camelToSentenceCase, transformEntries, genLog, cloneAndPluck, concatStrings, checkDataType } from '../../../helpers/reusable'

// Store & Styles
import { poActions } from '../../../store/po/po-slice';
import styles from './POitemDetail.module.scss'

// Components
// import AddPOitem_Modal from './ItemForms/AddPOitem_Modal';
import POitem_Form from './ItemForms/POitem_Form.js';
import UpdatePOitemSpec_Modal from './SpecForms/UpdatePOitemSpec_Modal';
import POitemSpecs_Form from './SpecForms/POitemSpecs_Form';


export default function POdetails({ classes, data: itemList, activePOid, dataIndex, setDataIndex }) {
  const dispatch = useDispatch();
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  const [showUpdateSpecForm, setShowUpdateSpecForm] = useState(false)
  const [showAddSpecForm, setShowAddSpecForm] = useState(false)

  const curItemData = itemList && itemList[dataIndex] ? itemList[dataIndex] : false; // `No items found in PO`

  const itemSpecification = checkDataType(curItemData.specification) === 'object'
    && !isObjEmpty(curItemData.specification)
    && curItemData.specification;

  const itemSummary = curItemData && cloneAndPluck(curItemData, ['id', 'name', 'qty', 'type', 'unitPrice']);

  const oldSpecData = itemList && itemList[dataIndex].specification
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


          <button onClick={() => setShowAddForm(true)} >Add Item</button>
          {showAddForm && <POitem_Form closer={() => setShowAddForm(false)} activePOid={activePOid} />}


          {
            itemList && itemList.length > 0 &&
            <>

              {ctrlBtn('prev', setDataIndex, itemList.length, dataIndex, 'Prev Item')}
              {ctrlBtn('next', setDataIndex, itemList.length, dataIndex, 'Next Item')}
              {/* The itemsLength is passed when delete is clicked here is before the deletion. therefore, it will be more than it actually is, bcz the data passed is the data before delete action. */}
              <button onClick={() => dispatch(poActions.deletePOitem([activePOid, dataIndex, itemList.length - 1, setDataIndex]))} >Delete Item</button>

              <button onClick={() => setShowUpdateForm(true)} >Update Item</button>
              {showUpdateForm &&
                <POitem_Form
                  closer={() => setShowUpdateForm(false)}
                  activePOid={activePOid}
                  activePOitemData={itemList[dataIndex]}
                />
              }


            </>
          }

          {
            itemList && itemList.length > 0 &&
            <>
              <button onClick={() => setShowAddSpecForm(true)} >
                {oldSpecData && `Update` || `Add`} Spec
              </button>
              {showAddSpecForm &&
                <POitemSpecs_Form
                  closer={() => setShowAddSpecForm(false)}
                  activePOid={activePOid}
                  activeItemIndex={dataIndex}
                  activePOitemSpecs={oldSpecData && oldSpecData}
                />
              }
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

