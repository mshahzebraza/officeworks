// Dependency
import React from 'react'

// Store & Styles
import styles from './SummaryPO_Modal.module.scss'

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
import summarizer from '../../helpers/reusable'


export default function SummaryPO_MFM({ closer, poData, itemList }) {

  console.log('poData', poData)
  console.log('itemList', itemList)
  console.log('summarizer', summarizer(poData, false, [['items', 'name']]));
  // Convert the poData to map
  // convert map to jsx

  // input:
  const poItemData = itemList && itemList.length > 0
    ? itemList.map(
      (item, itemIdx) => <li
        className={styles.dataItem}
        key={itemIdx}
      >
        <span className={styles.dataItemQty}> {item.qty} </span>
        <span className={styles.dataItemType} >{item.item}</span>
      </li>)
    : <span>No items</span>;
  return (
    <Portal>
      <Modal
        title='PO Detail'
        closer={closer}
      >
        {<div className={styles.body}>

          <SummaryItem field={`Reference ID`} value={poData.refId} />
          <SummaryItem field={`Total Cost`} value={poData.totalCost} />
          <SummaryItem field={`Supplier`} value={poData.supplier} />
          <SummaryItem field={`PO Category`} value={poData.category} />
          <SummaryItem field={`Source`} value={poData.fulfillmentSource} />
          <SummaryItem field={`Items Procured`} value={poItemData} isList />

        </div>}
      </Modal>
    </Portal>
  )
}



function SummaryItem({ field, value, isList }) {
  return (<div className={styles.data}>
    <span className={styles.dataField}>{field}:</span>
    {
      !isList
        ? <span className={styles.dataValue}>{value}</span>
        // To accommodate list items in case of nested items
        : <ul className={styles.dataValue}>{value}</ul>
    }
  </div>);
}





// Receives Object of:
// 1. String
// 2. Array of Strings
// 3. Object of String (nested Object)
// 4. Array of Objects of Strings


// Convert to a map
// Set each key to a field
// Check each value's data-type and convert accordingly
// 1. String: Set each value to a value
// 2. // *Array of Strings:
// 2.a. // *Concatenate each value into a string separated by a comma (e.g. categories, tags)
// 2.b. remove the repeated values and return an object with the unique values & their repetition count (qty)
// 3. // *Array of Object - of which only one key (must be string), say nomenclature, is required:
// 3.a. Concatenate each value into a string separated by a comma (e.g. categories, tags)

/* Input:
  {
  refId: 'PO-001', //* String
  totalCost: '$1,000', //* String
  tags: ['tag1', 'tag2'], //* Array of Strings
  parts: //* Array of Objects - required key is a string : 'name'
    [
      { name: "Ball Lead Screw", ...rest},
      { name: "Screw", ...rest},
      { name: "Screw", ...rest},
      { name: "Screw", ...rest},
  ]
*/
function Summarize(data = {}) {


  // Convert the data object into an array of objects
  // Each object will have a field and value
  // check each value's data-type and convert accordingly

  const dummyData = {
    refId: 'PO-001', //* String
    totalCost: '$1,000', //* String
    tags: ['tag1', 'tag2'], //* Array of Strings
    parts: //* Array of Objects - required key is a string : 'name'
      [
        { name: "Ball Lead Screw" },
        { name: "Screw" },
        { name: "Screw" },
        { name: "Screw" },
      ]
  }



  // data[key] = <p className={styles.data}>
  //   <span className={styles.dataField}>{key}:</span>
  //   <span className={styles.dataValue}>{value}</span>
  // </p>




  return (
    <div className={styles.entry} >

      <span className={styles.entryKey}>
        {field}:
      </span>

      {
        !isList
          ? <span className={styles.entryValue} > {value}</span>
          // To accommodate list items in case of nested items
          : <ul className={styles.entryValue}>{value}</ul>
      }
    </div >
  )
}



