// Dependency
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { cloneAndPluck } from '../../../../helpers/reusable'

// Store & Styles
import { poActions } from '../../../../store/po/po-slice'
import styles from '../../../../styles/poDetail.module.scss'

// Components
import Portal from '../../../../components/UI/Portal'
import MultiForm from '../../../../components/MultiForm/MultiForm'
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
  const dispatch = useDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false)
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
    <>
      <Portal selector={'#portalRoot'} >Portal</Portal>
      {/* {editModalCodeSnippet(showUpdateModal, setShowUpdateModal, dispatch, data)} */}
      <main className={styles.po} >

        {/* Header */}
        <POheader
          // poId={pProps.pid}
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
              activePO={poSummaryData.refId}
              data={poData.items} // detail for the current PO items- nested/item/detail level
              dataIndex={activeItemIndex}
              setDataIndex={setActiveItemIndex}
            />
            : <p className='note'>No Items Inside - detailPage</p>
        }

      </main>
    </>
  )
}


function editModalCodeSnippet(showUpdateModal, setShowUpdateModal, dispatch, data) {
  return showUpdateModal &&
    <Modal
      title='Edit Entry'
      closer={() => setShowUpdateModal(false)}
    >
      <MultiForm
        submit={(formData) => { dispatch(poActions.updatePO(formData)); }}
        // The field should be rendered automatically.
        // The req should be dependant on the req-prop of the original PO-entry. BUT for this case, we can duplicate the keys like in add-PO form bcz after all every PO needs to define some BASIC things, and those WILL be needed in case of update-PO too.
        fields={[
          {
            field: 'refType',
            req: true,
            defaultValue: data.refType && data.refType,
            dataList: ['CST', 'Bill', 'PO']
          },
          {
            field: 'refId',
            defaultValue: data.refId && data.refId,
            req: true,
            isFixed: true
          },
          {
            field: 'category',
            req: true,
            defaultValue: data.category && data.category,
          },
          {
            field: 'fulfillmentSource',
            req: true,
            defaultValue: data.fulfillmentSource && data.fulfillmentSource,
            dataList: ['Local', 'Foreign'],
          },
          {
            field: 'currency',
            req: true,
            defaultValue: data.currency && data.currency,
            dataList: ['PKR', 'USD', 'RMB'],
          },
          {
            field: 'totalCost',
            req: true,
            defaultValue: data.totalCost && data.totalCost,
          },
          {
            field: 'supplier',
            defaultValue: data.supplier && data.supplier,
            dataList: ['Wuhan', 'E-Tech']
          },
          {
            field: 'status',
            req: true,
            defaultValue: data.status && data.status,
            dataList: ['Closed', 'In Process', 'Delivered']
          },
          {
            field: 'remarks',
            defaultValue: data.remarks && data.remarks,
          }
        ]
          // [
          //   'refType', 'refId', 'category', 'fulfillmentSource', 'currency', 'totalCost', 'supplier', 'status', 'remarks'
          // ]
        } />
    </Modal>;
}

