// Dependency
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { cloneAndPluck } from '../../../../helpers/reusable'

// Store & Styles
import styles from '../../../../styles/poDetail.module.scss'

// Components
import POheader from '../../../../components/PO/POdetail/POheader'
import POnavList from '../../../../components/PO/POdetail/POnavList'
import POitemDetail from '../../../../components/PO/POdetail/POitemDetail'
import Layout from '../../../../components/Layout/Layout'


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
  const pageId = context.params.refId;
  return {
    props: {
      pageId
    }
  }
}

export default function POdetailPage({ pageId }) {
  // Find the po-data against the ID in URL
  const activePOdata = useSelector(state => { return state.po.find(item => item.refId === pageId) })

  const [activeItemIndex, setActiveItemIndex] = useState(0); // Control the active/visible item in the PO for item details

  const poSummaryData = cloneAndPluck(activePOdata, ['refId', 'refType', 'status', 'fulfillmentSource', 'category', 'supplier', 'totalCost'])

  const poNavListData = activePOdata.items
    && activePOdata.items.length > 0
    && activePOdata.items.map((el, elIdx) => {
      const items = cloneAndPluck(el, ['name', 'id']);
      items.order = elIdx; // order key added to the object
      return items
    });


  return (
    <Layout pageClasses={[styles.po]} >


      {/* Header */}
      <POheader
        classes={[styles.poHeader]}
        data={poSummaryData} // summary of current PO - top/entry level && buttons for next PO
      />

      {/* Navigation List */}
      {
        activePOdata.items
          ? <POnavList
            classes={[styles.poNavList]}
            // const itemListArray = props.data.items.map((el, elIdx) => {el.name})
            data={poNavListData} // list of items in current PO - with item-name & item-ID 
            activeItemVersion={poNavListData[activeItemIndex] && poNavListData[activeItemIndex].id}
            activeIndex={activeItemIndex}
            setActiveIndex={setActiveItemIndex}
          />
          : <p className='note'>No Items Inside - detailPage</p>
      }

      {/* Detail */}
      {
        // console.log(activePOdata.items)
      }
      <POitemDetail
        classes={[styles.poItemDetail]}
        activePOid={poSummaryData.refId}
        data={activePOdata.items} // detail for the current PO items- nested/item/detail level
        dataIndex={activeItemIndex}
        setDataIndex={setActiveItemIndex}
      />


    </Layout>
  )
}