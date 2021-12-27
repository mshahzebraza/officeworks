// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { projectActions } from '../../../../store/project/project-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
import Form from '../../../Form/Form'
// ChangeItASAP

export default function AddProjectPart_Modal({ closer, projectCatName, projectId, assemblies = [] }) {
  const dispatch = useDispatch();
  console.log('assemblies', assemblies);

  return (
    <Portal>

      <Modal title='New Project Module Entry' closer={closer}>
        <Form
          submit={formData => {
            dispatch(projectActions.addProjectPart([projectCatName, projectId, formData]));
          }}
          fields={[{
            field: 'parentAssemblyId',
            defaultValue: '0000',
            // dataList: assemblies,
            req: true
          }, {
            field: 'type',
            dataList: ['purchased', 'manufactured', 'standard'],
            req: true
          }, {
            field: 'nomenclature',
            req: true
          }, {
            field: 'id',
            dataList: [`${projectId}-`],
            req: true
          }, {
            field: 'qty',
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
// Project Type
// Project ID

// Part Type
// Part Details
// Part Remarks
