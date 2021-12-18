// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { mwoActions } from '../../store/mwo/mwo-slice'

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
import Form from '../Form/Form'

export default function AddMWO_Modal({ closer }) {
  const dispatch = useDispatch();

  return (
    <Portal>

      <Modal title='New MWO Entry' closer={closer}>
        <Form submit={formData => {
          dispatch(mwoActions.addMWO(formData));
        }} fields={[
          { // MWO ID
            field: 'mwoId',
            req: true
          }, { // Source
            field: 'application',
            dataList: ['Project', 'R&D', 'LAB', 'MISC'],
            req: true
          }, { // Category
            field: 'itemId',
            req: true
          }, { // Currency
            field: 'itemName',
            req: true
          }, { // Total Cost
            field: 'qty',
            req: true
          }, { // Status
            field: 'status',
            dataList: ['Not Started', 'Active', 'Delivered'],
            req: true
          }, { // Title
            field: 'title',
            req: true
          }, { // Remarks
            field: 'remarks'
          }]} />
      </Modal>
    </Portal>
  )
}


// mwoId,               ['CST', 'Bill', 'PO'],
// application,
// itemId,              ['Single Quotation', 'Repeat Order'],
// itemName,            ['Local', 'Foreign'],
// qty,                 ['PKR', 'USD', 'RMB'],
// title,
// status,              'Active', 'Delivered', 'Closed'],
// remarks                







