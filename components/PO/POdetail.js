import React, { useState } from 'react';
import styles from './ListItem.module.scss';
import { useRouter } from 'next/router';
import Modal from '../UI/Modal';
import { poActions } from '../../store/po/po-slice'
import { useDispatch } from 'react-redux';
import MultiForm from '../MultiForm/MultiForm'

export default function POdetail(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const deletePoItem = (poIndex) => {
    console.log(poIndex);
    const answer = prompt('You will now be able to retrieve it back! Type "DELETE THIS PO" if you really want to delete it.')
    if (answer === "DELETE THIS PO") {
      dispatch(poActions.deletePO(poIndex))
    }
    console.log(`Confirm the deletion by typing the required message.`);
  }


  function goToPoDetail(refId) {
    router.push(`po/${refId}`)
  }

  const itemList = props.data.items && props.data.items.
    reduce((prev, cur, arr) => {

      // Check duplicate
      const duplicateIndex = prev.findIndex((prev) => prev.name === cur.name)

      // No Duplicate
      if (duplicateIndex === -1) {
        prev.push(
          { name: cur.name, qty: 1 }
        )
      };

      // Found Duplicate
      if (duplicateIndex >= 0) {
        prev[duplicateIndex].qty++;
      };

      return prev

    }, []);

  return <li
    className={styles.poItem}
  // key={props.itemKey}
  >
    {
      showDetailModal &&
      <Modal
        closer={() => setShowDetailModal(false)}
      >
        {
          <div className={styles['poItem-extra']}>

            <p>Reference ID: {props.data.refId}</p>

            <p>Total Cost: {props.data.totalCost}</p>

            <p>Supplier: {props.data.supplier}</p>

            <p>PO Category: {props.data.category}</p>

            <p>Source: {props.data.fulfillmentSource}</p>

            Items Procured:
            <ul>
              {itemList ?
                itemList.map(
                  (item, itemIdx) => <li
                    key={itemIdx}
                  >
                    <span>{item.name}</span>: <span> {item.qty} </span>
                  </li>) : <>No items</>}
            </ul>
          </div>
        }
      </Modal>
    }
    <button onClick={() => setShowUpdateModal(true)} >Update PO</button>
    {
      showUpdateModal &&
      <Modal
        closer={() => setShowUpdateModal(false)}
      >
        <MultiForm
          submit={(formData) => { dispatch(poActions.updatePO(formData)) }}
          fields={
            [
              { field: 'refType', dataList: ['CST', 'Bill', 'PO'] },
              { field: 'refId', req: true, fixedValue: `${props.data.refId}` },
              { field: 'category' },
              { field: 'fulfillmentSource', dataList: ['Local', 'Foreign'] },
              { field: 'currency', dataList: ['PKR', 'USD', 'RMB'] },
              { field: 'totalCost' },
              { field: 'supplier', dataList: ['Wuhan', 'E-Tech'] },
              { field: 'status', dataList: ['Closed', 'In Process', 'Delivered'] },
              { field: 'remarks' }
            ]
            // [
            //   'refType', 'refId', 'category', 'fulfillmentSource', 'currency', 'totalCost', 'supplier', 'status', 'remarks'
            // ]
          }
        // subLevels={['specifications']}
        />
      </Modal>
    }


    <button onClick={() => setShowDetailModal(true)} >Show Details</button>

    <button onClick={() => deletePoItem(props.data.refId)} >Delete PO item</button>
    <button onClick={() => goToPoDetail(props.data.refId)} >Procured Items Detail Page</button>
    <p>
      Reference Type: {props.data.refType},
    </p>
    <p>
      Reference ID: {props.data.refId},
    </p>
    <p>
      Items: {itemList ? itemList.map((item, itemIdx) => <span key={itemIdx}>{item.name}, </span>) : `No items found`}
    </p>
    <p>
      Status: {props.data.status},
    </p>


  </li >

}
