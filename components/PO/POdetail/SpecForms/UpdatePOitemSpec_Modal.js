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
export default function UpdatePOitemSpec_Modal({ closer, activePOid, activeItemIndex, activeItemSpecData: specData }) {
  genLog(`dataform - Form`, specData);
  const specFields = genFormFields(Object.entries(specData))

  const dispatch = useDispatch();
  return (
    <Portal>
      <Modal
        title='Edit Entry'
        closer={closer}
      >
        <MultiForm
          submit={(formData) => { dispatch(poActions.updatePOitemSpec([activePOid, activeItemIndex, formData, specData])) }}
          fields={[
            ...specFields
          ]

            // [
            //   'refType', 'refId', 'category', 'fulfillmentSource', 'currency', 'totalCost', 'supplier', 'status', 'remarks'
            // ]
          }

        />
      </Modal>
    </Portal>
  )
}

// [
//   {
//     spec1='x001'
//   },
//   {
//     spec2='x001'
//   }
// ]

// [[spec1, x001]]
function genFormFields(objData) {
  return objData.map((el, elIdx) => {
    return {
      field: el[0],
      defaultValue: el[1],
    }
  })
}