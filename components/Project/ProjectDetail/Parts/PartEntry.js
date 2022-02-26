import React from 'react'
import { camelToSentenceCase, setDigits } from '../../../../helpers/reusable';
import { deleteProjModHandler } from '../../../../lib/apollo_client/projectApollo';
import Button from '../../../UI/Button';
import DataRow from '../../../UI/DataRow/DataRow';
import DataRowItem from '../../../UI/DataRow/DataRowItem';
import ModalButton from '../../../UI/ModalButton';
import ProjectModule_Form from '../ProjectForms/ProjectModule_Form';
import styles from './Parts.module.scss';



export default function PartEntry({ partData, projectState = [], assemblyList = [] }) {

  return (
    <DataRow raw >
      <DataRowItem flex={1} outerClasses={[styles.entryIndex]} content={`${partData.index + 1}.`} />
      <DataRowItem flex={5} outerClasses={[styles.entryNomenclature]} content={camelToSentenceCase(partData.nomenclature)} />
      <DataRowItem flex={5} outerClasses={[styles.entryId]} content={partData.id} />
      <DataRowItem flex={1} outerClasses={[styles.entryQty]} content={`${setDigits(partData.qty, 2)}`} />
      <DataRowItem flex={5} outerClasses={[styles.entryCommands]} content={<>
        <ModalButton
          caption='U'
          ModalComponent={ProjectModule_Form}
          projectState={projectState}
          assemblies={assemblyList}
          oldModuleData={partData}
        />
        <Button caption='S - X' click={() => { alert('Delete function not defined') }} />
        <Button caption='D' click={() => deleteProjModHandler([projectType, projectId, partData.id])} />
      </>}
      />
    </DataRow>
  );
}
