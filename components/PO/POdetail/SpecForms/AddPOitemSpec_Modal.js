// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { poActions } from '../../../../store/po/po-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
import MultiForm from '../../../MultiForm/MultiForm'


export default function AddPOitemSpec_Modal({ closer, activePOid, activeItemIndex }) {
  const dispatch = useDispatch();

  return (
    <Portal>

      <Modal title='New Item Specifications' closer={closer}>
        <MultiForm
          submit={formData => {
            dispatch(poActions.addPOitemSpec([activePOid, activeItemIndex, formData]));
          }}
          fields={[
            {
              field: 'Specification'
            }]}
        />
      </Modal>
    </Portal>
  )
}

