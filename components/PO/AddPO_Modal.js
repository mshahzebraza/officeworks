// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { poActions } from '../../store/po/po-slice'

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
import Form from '../Form/Form'

export default function AddPO_Modal({ closer }) {
  const dispatch = useDispatch();

  return (
    <Portal>

      <Modal title='New PO Entry' closer={closer}>
        <Form submit={formData => {
          dispatch(poActions.addPO(formData));
        }} fields={[
          { // Ref Type
            field: 'refType',
            dataList: ['CST', 'Bill', 'PO'],
            req: true
          }, { // Ref ID
            field: 'refId',
            req: true
          }, { // Category
            field: 'category',
            dataList: ['Single Quotation', 'Repeat Order'],
            req: true
          }, { // Source
            field: 'fulfillmentSource',
            dataList: ['Local', 'Foreign'],
            req: true
          }, { // Currency
            field: 'currency',
            dataList: ['PKR', 'USD', 'RMB'],
            req: true
          }, { // Total Cost
            field: 'totalCost',
            req: true
          }, { // Status
            field: 'status',
            dataList: ['Active', 'Delivered', 'Closed'],
            req: true
          }, { // Supplier
            field: 'supplier',
            dataList: ['Wuhan', 'E-Tech']
          }, { // Remarks
            field: 'remarks'
          }]} />
      </Modal>
    </Portal>
  )
}


// refType,             ['CST', 'Bill', 'PO'],
// refId,
// category,            ['Single Quotation', 'Repeat Order'],
// fulfillmentSource,   ['Local', 'Foreign'],
// currency,            ['PKR', 'USD', 'RMB'],
// totalCost,
// supplier,            ['Wuhan', 'E-Tech']
// status,              'Active', 'Delivered', 'Closed'],
// remarks                