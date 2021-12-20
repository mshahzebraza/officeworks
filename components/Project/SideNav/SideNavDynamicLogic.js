import React, { useState } from 'react'
import styles from './SideNav.module.scss'

const cats = [{
  name: 'Ball Lead Screw',
  items: [
    { name: 'a' },
    { name: 'b' },
    { name: 'c' },
    { name: 'd' },
  ]
},
{
  name: 'Motors',
  items: [
    { name: 'a' },
    { name: 'b' },
    { name: 'c' },
    {
      name: 'd',
      items: [
        'a1',
        'b1',
        'c1',
      ]
    },
  ]
}
];


export default function SideNav() {

  const [activeItemIndex, setActiveItemIndex] = useState(1)
  return (
    <section className={styles.nav} >

      {
        cats.map(
          (cat, catIdx) =>
            <Detail title={cat.name}>
              {
                cat.items.map(
                  (catItem, catItemIdx) =>
                    <DetailItem
                      click={() => setActiveItemIndex(`${catIdx}_${catItemIdx}`)}
                      isActive={activeItemIndex == `${catIdx}_${catItemIdx}`}
                    >
                      {catItem.name}
                    </DetailItem>
                )
              }
            </Detail>

        )
      }


    </section >
  )
}


function Detail({ title, children }) {
  return (
    <details className={styles.detail}>

      <summary className={styles.detailHeader} >
        <h3 className={styles.detailTitle} >
          {title}
        </h3>
      </summary>

      <div className={styles.detailBody}>
        {children}
      </div>

    </details>);
}



function DetailItem({ children, isActive, click }) {
  return (<div onClick={click} className={`${styles.detailItem} ${!!isActive && styles.detailItemActive}`}>{children}</div>);
}







// Transformer Function Logic: (TF)  
// ---- accepts an object ( which may or may not contain arrays).only 'name', and 'items' are valid keys. )

// Check if the element passed contains 'items' array.
// True: Create Detail component. Apply TF on the arrayItems and pass the result inside Detail Component. (Loop starts again)
// False:  Create DetailItem Component and pass the name key in it

// Detail: BLS,
// - Detail Item: [a, b, c, d]
// Detail: Motor,
// - Detail Item: [a, b, c]
// - Detail: d
// - - Detail Item: [a1,b1,c1]


// Possible inputs
// null,'',' ' , [], ['a'],{},{a:'sad'},{name:'sda'}
function TFL(dataObj) {

  const hasItems = dataObj.items && dataObj.items.length > 0;

  if (hasItems) { // contains items array
    <Detail title={dataObj.name}>
      {
        dataObj.items.map(item => someFunction(item))
      }
    </Detail>
  } else {
    <DetailItem
      click={() => setActiveItemIndex(`${catIdx}_${catItemIdx}`)}
      isActive={activeItemIndex == `${catIdx}_${catItemIdx}`}
    >
      {catItem.name}
    </DetailItem>
  }

  // const y = dataObj.items && dataObj.items.length > 0;
  console.log(`dataObj.items`, dataObj.items);
  console.log('dataObj.items.length', dataObj.items.length);
  // contains items array
  // does not contains items array
}

function someFunction(params) {
  // check data type of item
  console.log(params);

  // String/Num : Detail Item

  // Object: : Detail or Detail Item (depending on items array present or not)

  // Array: map the items again in the someFunction()
}
