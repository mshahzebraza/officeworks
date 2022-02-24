import { deleteProjAssyHandler } from '../../../../lib/apollo_client/projectApollo';
import Button from '../../../UI/Button';
import DataRow from '../../../UI/DataRow/DataRow';
import DataRowItem from '../../../UI/DataRow/DataRowItem';
import styles from './AssemblyEntry.module.scss'
import ModalButton from '../../../UI/ModalButton';
import ProjectAssembly_Form from '../ProjectForms/ProjectAssembly_Form';


export function AssemblyEntry({
  header = false,
  assemblyIndex = 'Sr.',
  activeProjectType = 'Project Type',
  activeProjectId = 'Project Id',
  assemblyData = {
    id: 'ID',
    nomenclature: 'Nomenclature',
    parent: 'Parent',
  },
  assembliesData = 'Assemblies Data',
}) {





  return (
    <DataRow header={header} outerClasses={[styles.assembly]}>
      {/* Sr */}
      <DataRowItem
        flex={1}
        outerClasses={[styles.assembly_index]}
        content={typeof (assemblyIndex) === 'number' ? assemblyIndex + 1 : assemblyIndex}
      />
      {/* Assy Id */}
      <DataRowItem
        flex={2}
        outerClasses={[styles.assembly_id]}
        content={assemblyData.id}
      />
      {/* Assy Nomenclature */}
      <DataRowItem
        flex={6}
        outerClasses={[styles.assembly_nomenclature]}
        content={assemblyData.nomenclature}
      />
      {/* Parent Assy */}
      <DataRowItem
        flex={2}
        outerClasses={[styles.assembly_parent]}
        content={assemblyData.parent || '0000'}
      />
      {/* Parent Controls */}
      <DataRowItem
        flex={3}
        outerClasses={[styles.assembly_controls]}
        content={<>
          <ModalButton
            caption='Edit'
            disabled={['0000', 'FAST'].includes(assemblyData.id)}
            ModalComponent={ProjectAssembly_Form}
            activeProjectType={activeProjectType}
            activeProjectId={activeProjectId}
            activeAssembliesData={assembliesData}
            activeAssemblyData={assemblyData}
          />
          <Button caption='Delete' disabled={['0000', 'FAST'].includes(assemblyData.id)} click={() => deleteProjAssyHandler([activeProjectType, activeProjectId, assemblyData.id])} />

        </>}
      />

    </DataRow>
  )
}