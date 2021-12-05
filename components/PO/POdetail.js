import React, { useState } from 'react'
import styles from './ListItem.module.scss'
import { useRouter } from 'next/router'
import Modal from '../UI/Modal'

export default function POdetail(props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

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
      showModal &&
      <Modal
        closer={() => setShowModal(false)}
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

    <button onClick={() => setShowModal(true)} >Show Details</button>

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
