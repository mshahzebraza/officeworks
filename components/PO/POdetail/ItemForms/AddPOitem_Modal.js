// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { Formik } from 'formik'

// Store & Styles
import { poActions } from '../../../../store/po/po-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
import Form from '../../../Form/Form'


export default function AddPOitem_Modal({ closer, activePOid, activePOindex }) {
  const dispatch = useDispatch();

  return (
    <Portal>

      <Modal title='New PO Item Entry' closer={closer}>
        <Form
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

