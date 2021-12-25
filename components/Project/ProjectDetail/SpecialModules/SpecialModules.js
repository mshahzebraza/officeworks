import React, { useState } from 'react'
import { camelToSentenceCase } from '../../../../helpers/reusable';
import Detail from '../../../Detail&Summary/Detail';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import AddProjectPart_Modal from './AddProjectPart_Modal';
import styles from './SpecialModules.module.scss'


export default function SpecialModules({ specParts, detailSummaryStates, breadCrumbs }) {

  const [showAddForm, setShowAddForm] = useState(false)
  const [projectType, projectId] = breadCrumbs;


  // const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = detailSummaryStates
  const partCTGs = ['purchased', 'manufactured'];

  const specBtnDataList = [
    {
      caption: 'Add Part',
      click: () => {
        setShowAddForm(state => !state)
        console.log(`Hey Add`);
      }
    }
  ]


  return (
    <DetailSection title='Special Modules' btnDataList={specBtnDataList} >
      {
        showAddForm && <AddProjectPart_Modal
          closer={() => setShowAddForm(false)}
          projectType={projectType}
          projectId={projectId}
        />
      }
      {partCTGs.map( // searches the partListData for each category mentioned in the array
        partCTG => <Detail // add a detailId field
          title={`${specParts[partCTG].length}x ${camelToSentenceCase(partCTG)} Parts`} // -> 2x Special Modules
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