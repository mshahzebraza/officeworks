// Dependency
import React, { useState } from 'react';

// Components
import POentryBar from './POentryBar.js'



export default function POentry(props) {

  // Makes sure that 01 TYPE of item is displayed once. And checks for repetition.
  let itemList = [];
  if (props.data.items && props.data.items.length > 0) {
    // props.data.items // poItem -> itemsArray (containing all items contained in the PO)
    const itemListArray = props.data.items.map((el, elIdx) => el.name); // ['po_item1', 'po_item1', 'po_item2']
    itemList = removeDuplicate(itemListArray); // [{reusable: 'po_item1', qty:2 },{item: 'po_item2', qty:1 }]
  }

  return <li
  >
    {/* Code for Modals */}

    <POentryBar
      poData={props.data}
      itemList={itemList} // categorized item list
      poIndex={props.dataIndex}
    >
    </POentryBar>

  </li >

}

