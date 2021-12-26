// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { poActions } from '../../store/po/po-slice'

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
import Form from '../Form/Form'

// showUpdateModal, setShowUpdateModal, dispatch, data
export default function UpdatePO_Modal({ closer, oldPOdata }) {

  const dispatch = useDispatch();
  return (
    <Portal>
      <Modal
        title='Edit Entry'
        closer={closer}
      >
        <Form
          submit={(formData) => { dispatch(poActions.updatePO([formData, oldPOdata.items])); }}
          // The field should be rendered automatically.
          // The req should be dependant on the req-prop of the original PO-entry. BUT for this case, we can duplicate the keys like in add-PO form bcz after all every PO needs to define some BASIC things, and those WILL be needed in case of update-PO too.
          fields={[
            {
              field: 'refType',
              req: true,
              defaultValue: oldPOdata.refType && oldPOdata.refType,
              dataList: ['CST', 'Bill', 'PO']
            },
            {
              field: 'refId',
              defaultValue: oldPOdata.refId && oldPOdata.refId,
              req: true,
              isFixed: true
            },
            {
              field: 'category',
              req: true,
              defaultValue: oldPOdata.category && oldPOdata.category,
            },
            {
              field: 'fulfillmentSource',
              req: true,
              defaultValue: oldPOdata.fulfillmentSource && oldPOdata.fulfillmentSource,
              dataList: ['Local', 'Foreign'],
            },
            {
              field: 'currency',
              req: true,
              defaultValue: oldPOdata.currency && oldPOdata.currency,
              dataList: ['PKR', 'USD', 'RMB'],
            },
            {
              field: 'totalCost',
              req: true,
              defaultValue: oldPOdata.totalCost && oldPOdata.totalCost,
            },
            {
              field: 'status',
              req: true,
              defaultValue: oldPOdata.status && oldPOdata.status,
              dataList: ['Closed', 'In Process', 'Delivered']
            },
            {
              field: 'supplier',
              defaultValue: oldPOdata.supplier && oldPOdata.supplier,
              dataList: ['Wuhan', 'E-Tech']
            },
            {
              field: 'remarks',
              defaultValue: oldPOdata.remarks && oldPOdata.remarks,
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
