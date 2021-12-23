import React from 'react'
import { camelToSentenceCase } from '../../../../helpers/reusable';
import Detail from '../../../Detail&Summary/Detail';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './StandardModules.module.scss'


export default function StandardModules({ stdParts, detailSummaryStates }) {

  const stdBtnDataList = [
    {
      caption: 'Add',
      click: () => {
        console.log(`Hey Add`);
      }
    }
  ]

  const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = detailSummaryStates;
  const stdPartCTGs = ['bearing', 'screw', 'washer', 'misc'];

  return (

    <DetailSection title='Standard Modules' btnDataList={stdBtnDataList} >
      {
        stdParts &&
        stdPartCTGs.map(
          stdPartCat => <Detail
            title={`${stdParts[stdPartCat].length}x ${camelToSentenceCase(stdPartCat)} Parts`} // -> 2x Special Modules
            detailId={stdPartCat}
            selectionStates={[activeDetail, setActiveDetail]}
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
        )
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