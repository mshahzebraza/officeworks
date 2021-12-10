import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { poActions } from '../../../../store/po/po-slice'
import styles from '../../../../styles/poDetail.module.scss'
import { Router, useRouter } from 'next/router'
import MultiForm from '../../../../components/MultiForm/MultiForm'
import { cloneAndPluck } from '../../../../helpers/reusable'

import POheader from '../../../../components/PO/POdetail/POheader'
import POnavList from '../../../../components/PO/POdetail/POnavList'
import POdetails from '../../../../components/PO/POdetail/POdetails'

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { refId: '1' } },
//       { params: { refId: '2' } },
//       { params: { refId: '3' } }
//     ],
//     fallback: 'blocking'
//   }
// }

export async function getServerSideProps(context) {
  const pid = context.params.refId;
  return {
    props: {
      pid
    }
  }
}

export default function POdetailPage(pProps) {
  // Find the po against the ID in URL
  const poData = useSelector(state => { return state.po.find(item => item.refId === pProps.pid) })
  // Control the visible item in the PO for item details
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const totalItems = poData.items;

  poData && console.log(poData);
  // poData.refId && console.log(poData.refId);
  const poSummary = cloneAndPluck(poData, ['refId', 'refType', 'status', 'fulfillmentSource', 'category', 'supplier', 'totalCost'])

  return (
    <main className={styles.po} >


      {/* Header */}
      <POheader
        classes={[styles.poHeader]}
        data={poSummary} // summary of current PO - top/entry level && buttons for next PO
      />

      {/* Navigation List */}
      <POnavList
        classes={[styles.poNavList]}
        data={poData} // list of items in current PO - with item-name & ID 
      />
      {/* Detail */}
      <POdetails
        classes={[styles.poDetails]}
        data={poData} // detail for the current PO - nested/item/detail level
        dataIndex={activeItemIndex}
        setDataIndex={setActiveItemIndex}
        totalItems={totalItems}
      />



    </main>
  )
}

// Next functions

// function commentCode(params) {
//   return <>


//   </>
// }