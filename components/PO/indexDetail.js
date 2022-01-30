// Dependency
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { cloneAndPluck } from '../../helpers/reusable'
import router from 'next/router'
import { useReactiveVar } from '@apollo/client'
import poApollo from '../../lib/apollo_client/poApollo'

// Store & Styles
import styles from '../../styles/poDetail.module.scss'

// Components
import POheader from '../../components/PO/POdetail/POheader'
import POnavList from '../../components/PO/POdetail/POnavList'
import POitemDetail from '../../components/PO/POdetail/POitemDetail'
import Layout from '../../components/Layout/Layout'


export default function POdetailPageComp({ pageId }) {
  // Find the po-data against the ID in URL
  // const poState = useSelector(state => { return state.poList })
  const poState = useReactiveVar(poApollo)

  pageId >= poState.length && router.push(`/procurement/po/${pageId - 1}`)
  poState.length === 0 && router.push(`/procurement/po`)

  const activePOdata = poState[pageId] && poState[pageId]
  const [activeItemIndex, setActiveItemIndex] = useState(0); // Control the active/visible item in the PO for item details

  // item index >= items length
  activePOdata && activePOdata.items
    && activeItemIndex >= activePOdata.items.length
    && setActiveItemIndex(activePOdata.items.length - 1);

  // item index < 0
  activeItemIndex < 0
    && console.log('Cannot happen');

  const poSummaryData = activePOdata;

  const poNavListData = activePOdata && activePOdata.items
    && activePOdata.items.length > 0
    && activePOdata.items.map((el, elIdx) => {
      const items = cloneAndPluck(el, ['name', 'id']);
      items.order = elIdx; // order key added to the object
      return items
    });


  return (
    <Layout pageClasses={[styles.page]} >


      {/* Header */}
      {
        activePOdata
          ? <POheader
            classes={[styles.header]}
            activePOid={poSummaryData.refId}
            data={poSummaryData} // summary of current PO - top/entry level && buttons for next PO
          />
          : <p className='note'>No Items Inside - detailPage</p>

      }


      {/* Navigation List */}
      {
        activePOdata && activePOdata.items
          ? <POnavList
            classes={[styles.navList]}
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

        // items length === 0
        activePOdata && activePOdata.items
        && activePOdata.items.length !== 0
        && <POitemDetail
          classes={[styles.itemDetail]}
          activePOid={poSummaryData.refId}
          data={activePOdata.items} // detail for the current PO items- nested/item/detail level
          dataIndex={activeItemIndex}
          setDataIndex={setActiveItemIndex}
        /> || <p className='note'>No Items Inside - detailPage</p>
      }


    </Layout>
  )
}