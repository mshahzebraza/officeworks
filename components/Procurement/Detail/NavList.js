import React from 'react'
import { concatStrings, transformArray } from '../../../helpers/reusable';
import styles from './NavList.module.scss'

export default function NavList({ classes, itemList = [/* { name: '1', id: '1o1', order: 0 } */], activeIndex, setActiveIndex }) {

    console.log('NavList', itemList);
    // Section: Component Logic
    // Only fetch the required data from the itemList
    itemList = itemList.map(({ name = 'null', id }, order) => {
        return {
            name, id, order //? This is necessary to highlight the selected item and fetch its data
        }
    });

    if (itemList.length <= 0) return <p className='note'>No items - NavList</p>

    // Nest the items with matching names under a new versions key
    const reducedItemList = reduceItemsWithDupeName(itemList);

    // Section: Component Rendering
    return (
        <>
            {
                <section className={concatStrings([...classes, styles.itemList])} >

                    {
                        reducedItemList.map((item, itemIdx) => {
                            return <Category
                                key={itemIdx}
                                item={item}
                                activeIndex={activeIndex}
                                setActiveIndex={setActiveIndex}
                            />
                        })
                    }
                </section >
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

function reduceItemsWithDupeName(items) {

    return items.reduce((acc, cur, arr) => {

        // check duplicate name in the accumulated values
        const duplicateIndex = acc.findIndex((el) => {
            return el.name.toLocaleLowerCase() === cur.name.toLocaleLowerCase()
        })

        // found Duplicate - push the item under the same 'Name' tab
        if (duplicateIndex >= 0) {
            acc[duplicateIndex].versions.push({ id: cur.id, order: cur.order });
            return acc;
        }
        // No Duplicate - create a new 'Name' tab and push the item in it
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
    // Render name of each item and list down multiple versions (itemIDs) for the name-tab
    return <div
        className={styles.item}
    >
        <h4 className={styles.itemName} >{item.name}</h4>
        <ul className={styles.versionList}>
            {renderVersions(item.versions, activeIndex, setActiveIndex)}
        </ul>

    </div>
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
        return <li
            key={verIdx}
            className={`${styles.version} ${activeIndex === ver.order && styles.versionActive}`}
            onClick={() => setActiveIndex(ver.order)}>
            {ver.id}
        </li>
    })
}