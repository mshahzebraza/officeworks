// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { projectActions } from '../../../../store/project/project-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
import Form from '../../../Form/Form'

// showUpdateModal, setShowUpdateModal, dispatch, data
export default function UpdateProjOV_Modal({ closer, projData }) {

  console.log(projData);
  const dispatch = useDispatch();
  return (
    <Portal>
      <Modal
        title='Edit Entry'
        closer={closer}
      >
        <Form
          submit={(formData) => { dispatch(projectActions.updateProjectOV([formData, projData.items])); }}
          // The field should be rendered automatically.
          // The req should be dependant on the req-prop of the original PO-entry. BUT for this case, we can duplicate the keys like in add-PO form bcz after all every PO needs to define some BASIC things, and those WILL be needed in case of update-PO too.
          fields={[
            {
              field: 'type',
              req: true,
              defaultValue: projData.type && projData.type,
              dataList: ['CST', 'Bill', 'PO']
            },
            {
              field: 'nomenclature',
              defaultValue: projData.nomenclature && projData.nomenclature,
              req: true,
              // isFixed: !projData.status === 'R&D' && true // Workaround
            },
            {
              field: 'application',
              req: true,
              defaultValue: projData.application && projData.application,
              dataList: ['B-1', 'B-2', 'B-3'], // ['AbWS', 'HWS', 'Abdali-NG']
            },
            {
              field: 'status',
              req: true,
              defaultValue: projData.status && projData.status,
              dataList: ['R&D', 'Production', 'Discontinued'],
            },
            {
              field: 'stock',
              req: true,
              defaultValue: projData.stock && projData.stock,
              dataList: ['PKR', 'USD', 'RMB'],
            },
            {
              field: 'target',
              req: true,
              defaultValue: projData.target && projData.target,
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
