// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { mwoActions } from '../../store/mwo/mwo-slice'

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
import Form from '../Form/Form'

// showUpdateModal, setShowUpdateModal, dispatch, data
export default function UpdateMWO_Modal({ closer, mwoData }) {

  // mwoData.remarks &&
  // mwoData.remarks.length > 0 &&
  // console.log(mwoData.remarks);
  console.log(!!mwoData.remarks);
  const dispatch = useDispatch();
  return (
    <Portal>
      <Modal
        title='Edit Entry'
        closer={closer}
      >
        <Form
          submit={(formData) => { dispatch(mwoActions.updateMWO(formData)); }}
          // The field should be rendered automatically.
          // The req should be dependant on the req-prop of the original PO-entry. BUT for this case, we can duplicate the keys like in add-PO form bcz after all every PO needs to define some BASIC things, and those WILL be needed in case of update-PO too.
          fields={[
            {
              field: 'mwoId',
              req: true,
              defaultValue: mwoData.mwoId && mwoData.mwoId,
              isFixed: true
            },
            {
              field: 'itemName',
              defaultValue: mwoData.itemName && mwoData.itemName,
              req: true,
            },
            {
              field: 'itemId',
              req: true,
              defaultValue: mwoData.itemId && mwoData.itemId,
            },
            {
              field: 'qty',
              req: true,
              defaultValue: mwoData.qty && mwoData.qty,
            },
            {
              field: 'application',
              req: true,
              defaultValue: mwoData.application && mwoData.application,
              dataList: ['LAB', 'R&D', 'MISC'],
            },
            {
              field: 'status',
              req: true,
              defaultValue: mwoData.status && mwoData.status,
              dataList: ['Not Started', 'Active', 'Delivered']
            },
            {
              field: 'title',
              req: true,
              defaultValue: mwoData.title && mwoData.title,
            },
            // mwoData.remarks.length > 0 &&
            // mwoData.remarks &&
            {
              field: 'remarks',
              defaultValue: mwoData.remarks && mwoData.remarks,
            }
          ]
            // [
            //   'refType', 'refId', 'category', 'fulfillmentSource', 'currency', 'totalCost', 'supplier', 'status', 'remarks'
            // ]
          } />
      </Modal>
    </Portal>
  )
}
