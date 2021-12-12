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
  // Find the po-data against the ID in URL
  const poData = useSelector(state => { return state.po.find(item => item.refId === pProps.pid) })

  // Control the active/visible item in the PO for item details
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  // poData.items[activeItemIndex] - the item showed in the detail section

  const poSummaryData = cloneAndPluck(poData, ['refId', 'refType', 'status', 'fulfillmentSource', 'category', 'supplier', 'totalCost'])

  const poNavListData = poData.items
    && poData.items.length > 0
    && poData.items.map((el, elIdx) => {
      const items = cloneAndPluck(el, ['name', 'id']);
      items.order = elIdx; // order key added to the object
      return items
    });


  return (
    <main className={styles.po} >


      {/* Header */}
      <POheader
        poId={pProps.pid}
        classes={[styles.poHeader]}
        data={poSummaryData} // summary of current PO - top/entry level && buttons for next PO
      />

      {/* Navigation List */}
      {
        poData.items
          ? <POnavList
            classes={[styles.poNavList]}
            // const itemListArray = props.data.items.map((el, elIdx) => {el.name})
            data={poNavListData} // list of items in current PO - with item-name & item-ID 
            activeItemVersion={poNavListData[activeItemIndex].id}
            activeIndex={activeItemIndex}
            setActiveIndex={setActiveItemIndex}
          />
          : <p className='note'>No Items Inside - detailPage</p>
      }

      {/* Detail */}
      {
        poData.items
          ? <POdetails
            classes={[styles.poDetails]}
            data={poData.items} // detail for the current PO - nested/item/detail level
            dataIndex={activeItemIndex}
            setDataIndex={setActiveItemIndex}
          />
          : <p className='note'>No Items Inside - detailPage</p>
      }

    </main>
  )
}

// Next functions

// function commentCode(params) {
//   return <>


//   </>
// }