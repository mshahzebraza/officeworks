// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { poActions } from '../../../store/po/po-slice'

// Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'
import MultiForm from '../../MultiForm/MultiForm'

// showUpdateModal, setShowUpdateModal, dispatch, data
export default function UpdatePOitem_Modal({ closer, activePOid, activePOindex, activeItemData: itemData }) {
  console.log(`itemData`, itemData);

  const dispatch = useDispatch();
  return (
    <Portal>
      <Modal
        title='Edit Entry'
        closer={closer}
      >
        <MultiForm
          submit={(formData) => { dispatch(poActions.updatePOitem([activePOid, formData])); }}
          // The field should be rendered automatically.
          // The req should be dependant on the req-prop of the original PO-entry. BUT for this case, we can duplicate the keys like in add-PO form bcz after all every PO needs to define some BASIC things, and those WILL be needed in case of update-PO too.
          fields={[
            {
              field: 'name',
              req: true,
              defaultValue: itemData.name && itemData.name,
              dataList: ['CST', 'Bill', 'PO']
            },
            {
              field: 'type',
              defaultValue: itemData.type && itemData.type,
              req: true,
            },
            {
              field: 'id',
              req: true,
              isFixed: true,
              defaultValue: itemData.id && itemData.id,
            },
            {
              field: 'qty',
              req: true,
              defaultValue: itemData.qty && itemData.qty,
              // dataList: ['Local', 'Foreign'],
            },
            {
              field: 'unitPrice',
              req: true,
              defaultValue: itemData.unitPrice && itemData.unitPrice,
              // dataList: ['PKR', 'USD', 'RMB'],
            },

          ]
            // [
            //   'refType', 'refId', 'category', 'fulfillmentSource', 'currency', 'totalCost', 'supplier', 'status', 'remarks'
            // ]
          } />
      </Modal>
    </Portal>
  )
}
