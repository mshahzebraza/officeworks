// Dependency
import React from 'react'
import { useDispatch } from 'react-redux'

// Store & Styles
import { projectActions } from '../../../../store/project/project-slice'

// Components
import Portal from '../../../UI/Portal'
import Modal from '../../../UI/Modal'
import Form from '../../../Form/Form'


export default function updateProjectPart_Modal({ closer, projectCatName, projectId, assemblies = [], oldModuleData }) {
  const dispatch = useDispatch();
  console.log('assemblies', assemblies);

  return (
    <Portal>

      <Modal title='Update Project Module Entry' closer={closer}>
        <Form
          submit={formData => {
            dispatch(projectActions.updateProjectPart([projectCatName, projectId, formData]));
          }}
          fields={[{
            field: 'parentAssemblyId',
            defaultValue: oldModuleData.parentAssemblyId,
            req: true
          }, {
            field: 'type',
            defaultValue: oldModuleData.type,
            dataList: ['purchased', 'manufactured', 'standard'],
            req: true
          }, {
            field: 'nomenclature',
            defaultValue: oldModuleData.nomenclature,
            req: true
          }, {
            field: 'id',
            defaultValue: oldModuleData.id,
            dataList: [`${projectId}-`],
            isFixed: true,
            req: true
          }, {
            field: 'qty',
            defaultValue: oldModuleData.qty,
            req: true
          },
          {
            field: 'remarks',
            defaultValue: oldModuleData.remarks,
          }]
          }
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
