import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';
import { camelToSentenceCase, cloneAndPluck, isObjEmpty, mapDataToCategory } from '../../../../helpers/reusable';
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



export default function Parts({ partList, projectState = [], assemblyList = [] }) {


  const partCtgList = ['specStd', 'mfg', 'std']; // from the partListData
  const stdPartCtgList = ['bearing', 'screw', 'washer', 'misc']; // from stdPartsData

  // Check if there are any parts matching the following categories: ['specStd', 'mfg', 'std']
  const {
    specStd: specStdParts,
    std: stdParts,
    mfg: mfgParts,
    others: otherParts
  } = mapDataToCategory(partList, partCtgList)

  // Check if the standard parts match the following:
  const {
    bearing: stdBearings,
    screw: stdScrews,
    washer: stdWashers,
    misc: stdMisc
  } = mapDataToCategory(stdParts, stdPartCtgList, 'nomenclature', 'misc')


  // Create a list of all parts
  const filteredPL = {
    mfgParts,
    specStdParts,
    stdBearings,
    stdScrews,
    stdWashers,
    stdMisc,
    otherParts
  }

  // Delete the empty parts lists and continue if there are any parts left
  for (const key in filteredPL) {
    !(filteredPL[key]?.length > 0) && delete filteredPL[key];
  }

  if (isObjEmpty(filteredPL)) { return <p className='note'>No Module Found - Parts</p> };



  const buttonsJSX = <>
    <ModalButton
      caption='Add Part'
      ModalComponent={ProjectModule_Form}
      assemblies={assemblyList}
      projectState={projectState}
    />
  </>



  return (
    <DetailSection title='Parts' buttonsJSX={buttonsJSX} >
      {
        Object.keys(filteredPL).map(
          (ctgStr, ctgStrIdx) =>
            // Render a Detail for each category
            <Detail
              key={ctgStrIdx}
              title={`${filteredPL[ctgStr].length}x ${camelToSentenceCase(ctgStr)}`} // -> 2x Special Modules
              defaultOpen
            >
              {
                filteredPL[ctgStr].map(
                  (stdPart, idx2) =>
                    <DetailItem
                      key={idx2}
                    // detailId={stdPartCat}
                    // detailItemId={stdPart.id}
                    // selectionStates={moduleState}
                    >
                      {/* //!Restructure it into PartsEntry */}
                      <DataRow raw >
                        <DataRowItem flex={1} outerClasses={[styles.entryIndex]} content={`${idx2 + 1}.`} />
                        <DataRowItem flex={5} outerClasses={[styles.entryNomenclature]} content={camelToSentenceCase(stdPart.nomenclature)} />
                        <DataRowItem flex={5} outerClasses={[styles.entryId]} content={stdPart.id} />
                        <DataRowItem flex={1} outerClasses={[styles.entryQty]} content={`${stdPart.qty}/Act`} />
                        <DataRowItem flex={5} outerClasses={[styles.entryCommands]} content={<>
                          <ModalButton
                            caption='U'
                            ModalComponent={ProjectModule_Form}
                            projectState={projectState}
                            assemblies={assemblyList}
                            oldModuleData={stdPart}
                          />
                          <Button caption='S - X' click={() => { alert('Delete function not defined') }} />
                          <Button caption='D' click={() => deleteProjModHandler([projectType, projectId, stdPart.id])} />
                        </>}
                        />
                      </DataRow>
                    </DetailItem>
                )
              }

            </Detail>
        )

      }
    </DetailSection>
  );
}
