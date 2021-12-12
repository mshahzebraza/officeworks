// Dependency
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { removeDuplicate } from '../../helpers/reusable';

// Store & Styles
import { poActions } from '../../store/po/po-slice'
import styles from './POentry.module.scss';

// Components
import Modal from '../UI/Modal';
import MultiForm from '../MultiForm/MultiForm'
import POentryBar from './POentryBar'



export default function POentry(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Ensures that the delete action is intentional by making the user type a DELETE PHRASE.
  function deletePoItem(refID) {
    dispatch(poActions.deletePO(refID))
  }

  function goToPoDetail(refId) {
    router.push(`po/${refId}`)
  }

  // Makes sure that 01 TYPE of item is displayed once. And checks for repetition.
  let itemList = [];
  if (props.data.items && props.data.items.length > 0) {
    // props.data.items // poItem -> itemsArray (containing all items contained in the PO)
    const itemListArray = props.data.items.map((el, elIdx) => el.name); // ['po_item1', 'po_item1', 'po_item2']
    itemList = removeDuplicate(itemListArray); // [{reusable: 'po_item1', qty:2 },{item: 'po_item2', qty:1 }]
  }

  return <li
    className={styles.poItem}
  >
    {/* Code for Modals */}
    {summaryModalCodeSnippet(showDetailModal, setShowDetailModal, props, itemList)}
    {editModalCodeSnippet(showUpdateModal, setShowUpdateModal, dispatch, props.data)}


    <POentryBar
      data={{
        ...props.data,
        itemList,
        index: props.dataIndex
      }}
      handlers={{
        edit: setShowUpdateModal, // expects true or false
        summary: setShowDetailModal, // expects true or false
        detail: goToPoDetail, // expects refId
        delete: deletePoItem, // expects refId
      }}
    >
    </POentryBar>

  </li >

}
function summaryModalCodeSnippet(showDetailModal, setShowDetailModal, props, itemList) {
  return showDetailModal &&
    <Modal
      title='PO Detail'
      closer={() => setShowDetailModal(false)}
    >
      {<div className={styles.body}>

        <p className={styles.data} >
          <span className={styles.dataField} >Reference ID:</span>
          <span className={styles.dataValue} >{props.data.refId}</span>
        </p>
        <p className={styles.data} >
          <span className={styles.dataField} >Total Cost:</span>
          <span className={styles.dataValue} >{props.data.totalCost}</span>
        </p>
        <p className={styles.data} >
          <span className={styles.dataField} >Supplier:</span>
          <span className={styles.dataValue} >{props.data.supplier}</span>
        </p>
        <p className={styles.data} >
          <span className={styles.dataField} >PO Category:</span>
          <span className={styles.dataValue} >{props.data.category}</span>
        </p>
        <p className={styles.data} >
          <span className={styles.dataField} >Source:</span>
          <span className={styles.dataValue} >{props.data.fulfillmentSource}</span>
        </p>

        <div className={styles.data}>
          <span className={styles.dataField}>Items Procured:</span>
          <ul className={styles.dataValue} >
            {
              itemList && itemList.length > 0
                ? itemList.map(
                  (item, itemIdx) => <li
                    className={styles.dataItem}
                    key={itemIdx}
                  >
                    <span className={styles.dataItemQty}> {item.qty} </span>
                    <span className={styles.dataItemType} >{item.item}</span>
                  </li>)
                : <span>No items</span>
            }
          </ul>
        </div>

      </div>}
    </Modal>;
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

