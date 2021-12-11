// Dependency
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'

// Store & Styles
import styles from '../../../styles/po.module.scss'
import { poActions } from '../../../store/po/po-slice'

// Components
import Modal from '../../../components/UI/Modal'
import MultiForm from '../../../components/MultiForm/MultiForm';
import POentry from '../../../components/PO/POentry'




export default function PO(pProps) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const poList = useSelector((state) => state.po);

  return (
    <main>

      <section className={styles.poData} >
        {
          poList.map((itemData, idx) => {
            return <POentry
              key={idx}
              data={itemData}
              dataIndex={idx}
            />
          })
        }
      </section>

      <section className={styles.poForm} >
        <button onClick={() => setShowModal(true)} >Add a PO</button>
        {showModal &&
          <AddPOmodal dispatch={dispatch} setShowModal={setShowModal}></AddPOmodal>}

        {/* Modal with PO-id item */}

        {/* <Link href='/procurement/po/poItem' ></Link> */}
      </section>
    </main>
  )
}




function AddPOmodal(props) {
  return (<Modal title='New PO Entry' closer={() => props.setShowModal(false)}>
    <MultiForm submit={formData => {
      props.dispatch(poActions.addPO(formData));
    }} fields={[{
      field: 'refType',
      dataList: ['CST', 'Bill', 'PO'],
      req: true
    }, {
      field: 'refId',
      req: true
    }, {
      field: 'category',
      dataList: ['Single Quotation', 'Repeat Order'],
      req: true
    }, {
      field: 'fulfillmentSource',
      dataList: ['Local', 'Foreign'],
      req: true
    }, {
      field: 'currency',
      dataList: ['PKR', 'USD', 'RMB'],
      req: true
    }, {
      field: 'totalCost',
      req: true
    }, {
      field: 'supplier',
      dataList: ['Wuhan', 'E-Tech']
    }, {
      field: 'status',
      dataList: ['Active', 'Delivered', 'Closed'],
      req: true
    }, {
      field: 'remarks'
    }]} subLevels={['specifications']} />
  </Modal>);
}