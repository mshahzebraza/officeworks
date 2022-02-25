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
  const filtered = {
    mfgParts,
    specStdParts,
    stdBearings,
    stdScrews,
    stdWashers,
    stdMisc,
    otherParts
  }

  // Delete the empty parts lists and continue if there are any parts left
  for (const key in filtered) {
    !(filtered[key]?.length > 0) && delete filtered[key];
  }
  console.log('filtered', filtered, isObjEmpty(filtered));
  if (isObjEmpty(filtered)) { return <p className='note'>No Module Found - Parts</p> };









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
        Object.keys(filtered).map(
          (stdPartCat, stdPartCatKey) =>
            <Detail
              key={stdPartCatKey}
              title={`${filtered[stdPartCat].length} ${stdPartCat} Parts`} // -> 2x Special Modules
              // title={`${stdParts[stdPartCat].length}x ${camelToSentenceCase(stdPartCat)} Parts`} // -> 2x Special Modules
              defaultOpen
            >

            </Detail>
        )

      }
    </DetailSection>
  );
}
