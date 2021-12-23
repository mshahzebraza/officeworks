import React from 'react'
import { camelToSentenceCase } from '../../../../helpers/reusable';
import Detail from '../../../Detail&Summary/Detail';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './SpecialModules.module.scss'

export default function SpecialModules({ specParts, detailSummaryStates }) {

  const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = detailSummaryStates
  const partCTGs = ['purchased', 'manufactured'];

  const specBtnDataList = [
    {
      caption: 'Add',
      click: () => {
        console.log(`Hey Add`);
      }
    }
  ]


  return (
    <DetailSection title='Special Modules' btnDataList={specBtnDataList} >

      {partCTGs.map( // searches the partListData for each category mentioned in the array
        partCTG => <Detail // add a detailId field
          title={`${specParts[partCTG].length}x ${camelToSentenceCase(partCTG)} Parts`} // -> 2x Special Modules
          detailId={partCTG}
          selectionStates={[activeDetail, setActiveDetail]}
          defaultOpen
        >
          {
            specParts[partCTG].map(
              (specPart, idx2) =>
                <DetailItem
                  key={idx2}
                  detailId={partCTG}
                  detailItemId={specPart.nomenclature}
                  selectionStates={detailSummaryStates}
                  outerClasses={[styles.entry]}
                >
                  <span className={styles.entryIndex}> {idx2 + 1}.</span>
                  <span className={styles.entryNomenclature}> {specPart.nomenclature}</span>
                  <span className={styles.entryId}> {specPart.id}</span>
                  <span className={styles.entryQty}> {specPart.qty}/Act</span>
                </DetailItem>
            )
          }
        </Detail>
      )}
    </DetailSection>
  );
}