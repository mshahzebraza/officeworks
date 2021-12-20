import React from 'react'
import { concatStrings, transformArray } from '../../../helpers/reusable';
import styles from './POnavList.module.scss'

export default function POnavList({ classes, data: itemList = [], activeIndex, setActiveIndex }) {

  if (itemList.length === 0) {
    return ('s')
  }

  const nestedList = itemList.length > 0 && itemsVersionsList(itemList);
  console.log(nestedList);

  return (
    <>
      {
        nestedList ?
          <section className={concatStrings([...classes, styles.itemList])} >

            {
              itemList ? // this must be true bcz this is the criteria for rendering the component in the parent BUT it doesn't hurt so...
                transformArray(
                  nestedList,
                  (item, idx) => <Category key={idx} item={item} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                )
                : <>No Items Available</>
            }
          </section >
          : <p className='note'>No items - POnavList</p>
      }
    </>
  )
}


// Input - Array of Object (AoO)
/*
[
  { name: '1', id: '1o1', order: 0 },
  { name: '1', id: '1o2', order: 1 },
  { name: '2', id: '2o1', order: 2 },
  { name: '2', id: '2o2', order: 3 },
  { name: '2', id: '2o3', order: 4 },
  { name: '3', id: '3o1', order: 5 }
]
 */
// Output - AoO containing AoO
/* 
[
  {
    name: '1',
    versions: [
      {id: '101', order: 0},
      {id: '102', order: 1},
    ]
  },
  {
    name: '2',
    versions: [
      {id: '201', order: 2},
      {id: '202', order: 3},
      {id: '203', order: 4},
    ]
  },
  {
    name: '3',
    versions: [
      {id: '301', order: 5},
    ]
  },
]
 */

function itemsVersionsList(items) {

  return items.reduce((acc, cur, arr) => {

    // check duplicate
    const duplicateIndex = acc.findIndex((el) => {
      return el.name === cur.name
    })

    // found Duplicate
    if (duplicateIndex >= 0) {
      acc[duplicateIndex].versions.push({ id: cur.id, order: cur.order });
      return acc;
    }

    // No Duplicate
    return acc.concat(
      {
        name: cur.name, versions: [{ id: cur.id, order: cur.order }]
      }
    );
  }, []);
}


// Input: An array of obj
/* 
[
  { id:'v1', order: 0 },
  { id:'v2', order: 1 },
], 1
 */
// Output: array of React DOM elements
/* 
  {
    name: '1',
    versions: [
      {id: '101', order: 0},
      {id: '102', order: 1},
    ]
  }
 */
function Category({ item, activeIndex, setActiveIndex }) {
  return <h4
    className={styles.item}
  >
    <p className={styles.itemName} >{item.name}</p>
    <p className={styles.versionList}>
      {renderVersions(item.versions, activeIndex, setActiveIndex)}
    </p>

  </h4>
}


// Input: An array of obj
/* 
[
  { id:'v1', order: 0 },
  { id:'v2', order: 1 },
], 1
 */
// Output: array of React DOM elements
/* 
  <p> v1 </p>                 <-------  click changes 'activeIndex' to '0'  (= order)
  <p class='bold'> v2 </p>    <-------  is styled different                 (activeIndex === order)
 */
function renderVersions(versionList, activeIndex, setActiveIndex) {

  return versionList.map((ver, verIdx) => {
    return <span
      key={verIdx}
      className={`${styles.version} ${activeIndex === ver.order && styles.versionActive}`}
      onClick={() => setActiveIndex(ver.order)}>
      {ver.id}
    </span>
  })
}