import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
import { camelToSentenceCase, isObjEmpty, mapDataToCategory } from '../../../../helpers/reusable';
import { deleteProjModHandler } from '../../../../lib/apollo_client/projectApollo';
import { projectActions } from '../../../../store/project/project-slice';
import Detail from '../../../Detail&Summary/Detail';
import DetailItem from '../../../Detail&Summary/DetailItem';
import Button from '../../../UI/Button';
import DataRow from '../../../UI/DataRow/DataRow';
import DataRowItem from '../../../UI/DataRow/DataRowItem';
import ModalButton from '../../../UI/ModalButton';
import DetailSection from '../DetailSection/DetailSection';
// import AddProjectPart_Modal from '../ProjectForms/AddProjectPart_Modal';
// import UpdateProjectPart_Modal from '../ProjectForms/UpdateProjectPart_Modal';
import ProjectModule_Form from '../ProjectForms/ProjectModule_Form';
import styles from './Parts.module.scss';



export default function SpecialModules({ allParts, stdParts, specParts, projectState = [], assemblyList = [] }) {









  const specialModuleCategories = ['specStd', 'mfg', 'std'];
  const allParts = mapDataToCategory(partList, specialModuleCategories)

  const specParts = cloneAndPluck(allParts, ['specStd', 'mfg'])

  const { others: otherParts } = cloneAndPluck(allParts, ['others'])
  // otherParts && otherParts.length > 0 && genLog('Assign Valid Category for the following parts - ProjectDetail', otherParts);

  // const standardModuleCategories = ['bearing', 'screw', 'washer', 'misc'];
  // const stdParts = mapDataToCategory(allParts.standard, standardModuleCategories, 'nomenclature', 'misc')
  // console.log('std-after', stdParts);



  // console.log('stdParts', stdParts);


  // const dispatch = useDispatch();
  const [projectType, projectId] = projectState;
  const isProjectValid = !!projectType && !!projectId;

  const specPartsExist = specParts.mfg.length > 0 || specParts.specStd.length > 0;
  const partCTGs = ['specStd', /* 'std', */ 'mfg'];

  // const stdPartsExist =
  //   stdParts.bearing.length > 0 ||
  //   stdParts.screw.length > 0 ||
  //   stdParts.washer.length > 0 ||
  //   stdParts.misc.length > 0;

  const stdPartCTGs = ['bearing', 'screw', 'washer', 'misc'];

  const buttonsJSX = <>
    <ModalButton
      caption='Add Part'
      ModalComponent={ProjectModule_Form}
      assemblies={assemblyList}
      projectState={projectState}
    />
  </>



  return (
    <DetailSection title='Parts' buttonsJSX={isProjectValid && buttonsJSX} >



      {
        specPartsExist
          ? partCTGs.map( // searches the partListData for each category mentioned in the array
            (partCTG, partCTGkey) => <Detail // add a detailId field
              key={partCTGkey}
              title={`${specParts[partCTG].length}x ${camelToSentenceCase(partCTG)} Parts`} // -> 2x Special Modules
              defaultOpen
            >
              {
                specParts[partCTG].map(
                  (specPart, idx2) => {
                    return <DetailItem
                      key={idx2}
                    // detailId={partCTG}
                    // detailItemId={specPart.nomenclature}
                    // selectionStates={moduleState}
                    >
                      <DataRow raw >
                        <DataRowItem flex={1} outerClasses={[styles.entryIndex]} content={`${idx2 + 1}.`} />
                        <DataRowItem flex={5} outerClasses={[styles.entryNomenclature]} content={camelToSentenceCase(specPart.nomenclature)} />
                        <DataRowItem flex={5} outerClasses={[styles.entryId]} content={specPart.id} />
                        <DataRowItem flex={1} outerClasses={[styles.entryQty]} content={`${specPart.qty}/Act`} />
                        <DataRowItem flex={5} outerClasses={[styles.entryCommands]} content={<>
                          <ModalButton
                            caption='U'
                            ModalComponent={ProjectModule_Form}
                            projectState={projectState}
                            assemblies={assemblyList}
                            oldModuleData={specPart}
                          />
                          <Button caption='S - X' click={() => { alert('Delete function not defined') }} />
                          <Button caption='D' click={() => deleteProjModHandler([projectType, projectId, specPart.id])} />
                        </>}
                        />
                      </DataRow>
                    </DetailItem>
                  }
                )
              }
            </Detail>
          )
          : <p className='note'>No Module Found - Parts</p>
      }
    </DetailSection>
  );
}
