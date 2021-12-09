import React, { useState } from 'react';
// import purchaseOrders from '../../../db/purchaseOrders';
import MultiForm from '../../../components/MultiForm/MultiForm';
import styles from '../../../styles/po.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../../../components/UI/Modal'
import Link from 'next/link'
import POList from '../../../components/PO/POlist'
import purchaseOrdersDb from '../../../db/purchaseOrders'
import { poActions } from '../../../store/po/po-slice'


export default function PO(pProps) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const poList = useSelector((state) => state.po);

  return (
    <main>

      <section className={styles.poData} >
        <POList
          data={poList}
        />
      </section>

      <section className={styles.poForm} >
        <button onClick={() => setShowModal(true)} >Add a PO</button>
        {showModal &&
          <Modal
            title='New PO Entry'
            closer={() => setShowModal(false)}
          >
            <MultiForm
              submit={(formData) => { dispatch(poActions.addPO(formData)) }}
              fields={
                [
                  { field: 'refType', dataList: ['CST', 'Bill', 'PO'], req: true },
                  { field: 'refId', req: true },
                  { field: 'category', dataList: ['Single Quotation', 'Repeat Order'], req: true },
                  { field: 'fulfillmentSource', dataList: ['Local', 'Foreign'], req: true },
                  { field: 'currency', dataList: ['PKR', 'USD', 'RMB'], req: true },
                  { field: 'totalCost', req: true },
                  { field: 'supplier', dataList: ['Wuhan', 'E-Tech'] },
                  { field: 'status', dataList: ['Active', 'Delivered', 'Closed'], req: true },
                  { field: 'remarks', }
                ]
              }
              subLevels={['specifications']}
            />
          </Modal>}

        {/* Modal with PO-id item */}

        {/* <Link href='/procurement/po/poItem' ></Link> */}
      </section>
    </main>
  )
}
