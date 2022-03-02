import React from 'react'
import { toSentenceCase, isObjEmpty, mapDataToCategory, setDigits } from '../../../../helpers/reusable';
import Detail from '../../../Detail&Summary/Detail';
import DetailItem from '../../../Detail&Summary/DetailItem';

import ModalButton from '../../../UI/ModalButton';
import DetailSection from '../DetailSection/DetailSection';
import ProjectModule_Form from '../ProjectForms/ProjectModule_Form';
import PartEntry from './PartEntry';


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


  // Create a Filtered Part List
  const filteredPL = {
    mfgParts,
    specStdParts,
    stdBearings,
    stdScrews,
    stdWashers,
    stdMisc,
    otherParts
  }

  // Stop the function if there are no parts
  if (isObjEmpty(filteredPL)) { return <p className='note'>No Module Found - Parts</p> };

  // Delete the empty parts lists and continue if there are any parts left
  for (const key in filteredPL) {
    !(filteredPL[key]?.length > 0) && delete filteredPL[key];
  }



  const addPartBtn = <>
    <ModalButton
      caption='Add Part'
      ModalComponent={ProjectModule_Form}
      assemblies={assemblyList}
      projectState={projectState}
    />
  </>



  return (
    <DetailSection title='Parts' buttonsJSX={addPartBtn} >
      <PartEntry
        header={true} />
      {
        Object.keys(filteredPL) // generate a list of the keys in filteredPL i.e. ['mfgParts', 'specStdParts', 'stdBearings', 'stdScrews', 'stdWashers', 'stdMisc', 'otherParts']
          .map(
            (ctgName, ctgIndex) =>
              // Render a Detail for each category
              <Detail
                key={ctgIndex}
                title={`${toSentenceCase(ctgName)} - Qty: ${setDigits(filteredPL[ctgName].length, 2)}`} // -> 2x Special Modules
                defaultOpen
              >
                {filteredPL[ctgName].map(
                  (part, partIndex) =>
                    <PartEntry
                      key={partIndex}
                      partData={{ ...part, index: partIndex }}
                      projectState={projectState}
                      assemblyList={assemblyList}
                    />)
                }

              </Detail>
          )

      }
    </DetailSection>
  );
}
