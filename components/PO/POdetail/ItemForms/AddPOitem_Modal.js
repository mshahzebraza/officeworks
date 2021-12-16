// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { poActions } from '../../../../store/po/po-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
import MultiForm from '../../../MultiForm/MultiForm'


export default function AddPOitem_Modal({ closer, activePOid, activePOindex }) {
  const dispatch = useDispatch();

  return (
    <Portal>

      <Modal title='New PO Entry' closer={closer}>
        <MultiForm
          submit={formData => {
            dispatch(poActions.addPOitem([activePOid, formData]));
          }}
          fields={[{
            field: 'id',
            req: true
          }, {
            field: 'name',
            req: true
          }, {
            field: 'type',
            req: true
          }, {
            field: 'qty',
            req: true
          }, {
            field: 'unitPrice',
            req: true
          },
          {
            field: 'remarks'
          }]}
        />
      </Modal>
    </Portal>
  )
}

