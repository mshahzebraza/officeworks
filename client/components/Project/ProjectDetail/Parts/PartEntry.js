import React from 'react'
import { toSentenceCase, setDigits } from '../../../../helpers/reusable';
import { deleteProjModHandler } from '../../../../lib/apollo_client/projectApollo';
import DetailItem from '../../../Detail&Summary/DetailItem';
import Button from '../../../UI/Button';
import DataRow from '../../../UI/DataRow/DataRow';
import DataRowItem from '../../../UI/DataRow/DataRowItem';
import ModalButton from '../../../UI/ModalButton';
import ProjectModule_Form from '../ProjectForms/ProjectModule_Form';
import styles from './Parts.module.scss';



export default function PartEntry({
  partData = {
    index: 'Sr',
    nomenclature: 'nomenclature',
    id: 'Unique Id',
    qty: 'Qty',
  },
  projectState = [],
  assemblyList = [],
  header = false }) {



  return (
    <DetailItem
      // detailId={partCat}
      // detailItemId={part.id}
      // selectionStates={moduleState}
      noHover
    >
      <DataRow header={header} raw>
        <DataRowItem flex={1} outerClasses={[styles.entryIndex]} content={`${typeof partData.index === 'number' ? partData.index + 1 : partData.index}.`} />
        <DataRowItem flex={5} outerClasses={[styles.entryNomenclature]} content={toSentenceCase(partData.nomenclature)} />
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
          <Button caption='D' click={() => deleteProjModHandler([/* projectType, projectId */...projectState, partData.id])} />
        </>}
        />
      </DataRow>
    </DetailItem>
  );
}
