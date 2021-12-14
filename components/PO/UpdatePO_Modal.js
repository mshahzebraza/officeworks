// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { poActions } from '../../store/po/po-slice'

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'
import MultiForm from '../MultiForm/MultiForm'

// showUpdateModal, setShowUpdateModal, dispatch, data
export default function UpdatePO_Modal({ closer, poData }) {

  const dispatch = useDispatch();
  return (
    <Portal>
      <Modal
        title='Edit Entry'
        closer={closer}
      >
        <MultiForm
          submit={(formData) => { dispatch(poActions.updatePO([formData, poData.items])); }}
          // The field should be rendered automatically.
          // The req should be dependant on the req-prop of the original PO-entry. BUT for this case, we can duplicate the keys like in add-PO form bcz after all every PO needs to define some BASIC things, and those WILL be needed in case of update-PO too.
          fields={[
            {
              field: 'refType',
              req: true,
              defaultValue: poData.refType && poData.refType,
              dataList: ['CST', 'Bill', 'PO']
            },
            {
              field: 'refId',
              defaultValue: poData.refId && poData.refId,
              req: true,
              isFixed: true
            },
            {
              field: 'category',
              req: true,
              defaultValue: poData.category && poData.category,
            },
            {
              field: 'fulfillmentSource',
              req: true,
              defaultValue: poData.fulfillmentSource && poData.fulfillmentSource,
              dataList: ['Local', 'Foreign'],
            },
            {
              field: 'currency',
              req: true,
              defaultValue: poData.currency && poData.currency,
              dataList: ['PKR', 'USD', 'RMB'],
            },
            {
              field: 'totalCost',
              req: true,
              defaultValue: poData.totalCost && poData.totalCost,
            },
            {
              field: 'status',
              req: true,
              defaultValue: poData.status && poData.status,
              dataList: ['Closed', 'In Process', 'Delivered']
            },
            {
              field: 'supplier',
              defaultValue: poData.supplier && poData.supplier,
              dataList: ['Wuhan', 'E-Tech']
            },
            {
              field: 'remarks',
              defaultValue: poData.remarks && poData.remarks,
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
