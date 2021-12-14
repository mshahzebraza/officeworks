// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { poActions } from '../../store/po/po-slice'

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
import MultiForm from '../MultiForm/MultiForm'

export default function AddPO_MFM({ closer }) {
  const dispatch = useDispatch();

  return (
    <Portal>

      <Modal title='New PO Entry' closer={closer}>
        <MultiForm submit={formData => {
          dispatch(poActions.addPO(formData));
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
          field: 'status',
          dataList: ['Active', 'Delivered', 'Closed'],
          req: true
        }, {
          field: 'supplier',
          dataList: ['Wuhan', 'E-Tech']
        }, {
          field: 'remarks'
        }]} subLevels={['specifications']} />
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