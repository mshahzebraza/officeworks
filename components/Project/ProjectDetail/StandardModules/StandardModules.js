import React, { useState } from 'react'
import { camelToSentenceCase } from '../../../../helpers/reusable';
import Detail from '../../../Detail&Summary/Detail';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './StandardModules.module.scss'
import AddProjectPart_Modal from '../ProjectForms/AddProjectPart_Modal';


export default function StandardModules({ stdParts, detailSummaryStates, isProjectValid }) {

  const [showAddForm, setShowAddForm] = useState(false)

  const stdPartsExist =
    stdParts.bearing.length > 0 ||
    stdParts.screw.length > 0 ||
    stdParts.washer.length > 0 ||
    stdParts.misc.length > 0;

  const stdBtnDataList = [
    {
      caption: 'Add Part',
      click: () => {
        console.log(`Hey Add`);
      }
    }
  ]

  const stdPartCTGs = ['bearing', 'screw', 'washer', 'misc'];

  return (

    <DetailSection title='Standard Modules' btnDataList={isProjectValid && stdBtnDataList} >
      {
        showAddForm && <AddProjectPart_Modal
          closer={() => setShowAddForm(false)}
          projectCatName={projectType}
          projectId={projectId}
        />
      }
      {
        stdParts &&
          stdPartsExist ?
          stdPartCTGs.map(
            stdPartCat => <Detail
              title={`${stdParts[stdPartCat].length}x ${camelToSentenceCase(stdPartCat)} Parts`} // -> 2x Special Modules
              defaultOpen
            >
              {
                stdParts[stdPartCat].map(
                  (stdPart, idx2) =>
                    <DetailItem
                      key={idx2}
                      detailId={stdPartCat}
                      detailItemId={stdPart.id}
                      selectionStates={detailSummaryStates}
                      outerClasses={[styles.entry]}
                    >
                      <span className={styles.entryIndex}> {idx2 + 1}.</span>
                      <span className={styles.entryId}> {stdPart.id}</span>
                      <span className={styles.entryOther}> ---</span>
                      <span className={styles.entryQty}> {stdPart.qty}/Act</span>

                    </DetailItem>
                )
              }
            </Detail>
          ) : <p className='note'>No Module Found - StandardModule</p>
      }


    </DetailSection>

  );
}


// <DetailSection title='Standard Modules' >
//   {stdParts && <StandardModuleList
//     stdParts={stdParts}
//     detailSummaryStates={[activeModuleType, setActiveModuleType, activeModule, setActiveModule]}
//     activeDetailId={activeModuleType}
//     setActiveDetailId={setActiveModuleType}
//   />}


// </DetailSection>