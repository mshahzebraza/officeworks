// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { poActions } from '../../../../store/po/po-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
import MultiForm from '../../../MultiForm/MultiForm'
import { genLog } from '../../../../helpers/reusable'

// showUpdateModal, setShowUpdateModal, dispatch, data
export default function UpdatePOitem_Modal({ closer, activePOid, activePOindex, activeItemData: itemData }) {

  const dispatch = useDispatch();
  return (
    <Portal>
      <Modal
        title='Edit Entry'
        closer={closer}
      >
        <MultiForm
          submit={(formData) => { dispatch(poActions.updatePOitem([activePOid, formData, itemData.specification])) }}
          // submit={(formData) => { console.log(formData); }}
          // submit={(formData) => { console.log([activePOid, formData, itemData.specification]); }}
          // The field should be rendered automatically.
          // The req should be dependant on the req-prop of the original PO-entry. BUT for this case, we can duplicate the keys like in add-PO form bcz after all every PO needs to define some BASIC things, and those WILL be needed in case of update-PO too.
          fields={[
            {
              field: 'id',
              req: true,
              isFixed: true,
              defaultValue: itemData.id && itemData.id,
            },
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
              field: 'qty',
              req: true,
              defaultValue: itemData.qty && itemData.qty,
            },
            {
              field: 'unitPrice',
              req: true,
              defaultValue: itemData.unitPrice && itemData.unitPrice,
            },
            {
              field: 'remarks',
              // req: true,
              defaultValue: itemData.remarks && itemData.remarks,
            },
          ]

          }

        />
      </Modal>
    </Portal>
  )
}
