import React from 'react'
import { camelToSentenceCase } from '../../../helpers/reusable';
import Detail from '../../Detail&Summary/Detail';
import DetailItem from '../../Detail&Summary/DetailItem';
import DetailSection from './DetailSection/DetailSection';



export default function StandardModules({ stdParts, detailSummaryStates }) {


  const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = detailSummaryStates
  const stdPartCTGs = ['bearing', 'screw', 'washer', 'misc'];

  return (

    <DetailSection title='Standard Modules' >
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
                (partData, idx2) =>
                  <DetailItem
                    key={idx2}
                    detailId={stdPartCat}
                    detailItemId={partData.id}
                    selectionStates={detailSummaryStates}
                  >
                    {partData.id}------------
                    {partData.qty}
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