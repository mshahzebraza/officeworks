// Dependency & Helpers
import React, { useState } from 'react'
import { concatStrings, camelToSentenceCase, mapDataToCategory } from '../../../helpers/reusable'
// Store
// Styles
import styles from './ProjectDetail.module.scss'
// Components
import DetailItem from '../../Detail&Summary/DetailItem'
import Detail from '../../Detail&Summary/Detail'




export default function ProjectDetail({ outerClasses, activeProject = {} }) {

  const [activeModuleType, setActiveModuleType] = useState('') // Purchase or Manufactured
  const [activeModule, setActiveModule] = useState('') // Pulley Shaft,BLS etc.


  const allParts = mapDataToCategory(activeProject.parts, ['purchased', 'manufactured', 'standard'])

  const stdParts = mapDataToCategory(allParts.parts, ['bearing', 'screw', 'washer', 'misc'], 'nomenclature', 'misc')


  return (
    <section className={concatStrings([styles.detail, ...outerClasses])} >

      {/* Overview */}
      <DetailSection title='Overview' >
        {
          ['type', 'nomenclature', 'application', 'status', 'stock'].map(
            (el, idx) =>
              <OVitem key={idx} label={camelToSentenceCase(el)} value={activeProject[el]}></OVitem>
          )
        }
      </DetailSection>

      {/* Part List */}
      <DetailSection title='Special Modules' >

        <SpecialModuleList
          specPartList={allParts}
          detailSummaryStates={[activeModuleType, setActiveModuleType, activeModule, setActiveModule]}
          activeDetailId={activeModuleType}
          setActiveDetailId={setActiveModuleType}
        />


      </DetailSection>

      {/* Fastener List */}
      <DetailSection title='Standard Modules' >
        {stdParts && <StandardModuleList
          stdPartList={stdParts}
          detailSummaryStates={[activeModuleType, setActiveModuleType, activeModule, setActiveModule]}
          activeDetailId={activeModuleType}
          setActiveDetailId={setActiveModuleType}
        />}


      </DetailSection>


    </section>
  )
}






function StandardModuleList({ stdPartList, detailSummaryStates }) {


  const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = detailSummaryStates
  const stdPartCTGs = ['bearing', 'screw', 'misc'];

  return (
    // <h1>s</h1>
    stdPartCTGs.map( // searches the partListData for each category mentioned in the array
      stdPartCat => <Detail // stdPartCat is the staPartData.
        title={`${stdPartList[stdPartCat].length}x ${camelToSentenceCase(stdPartCat)} Parts`} // -> 2x Special Modules
        detailId={stdPartCat}
        selectionStates={[activeDetail, setActiveDetail]}
      >
        {
          stdPartList[stdPartCat].map(
            (partData, idx2) =>
              <DetailItem
                key={idx2}
                detailId={stdPartCat}
                detailItemId={partData.id}
                selectionStates={detailSummaryStates}
              >
                {partData.id}
              </DetailItem>
          )
        }
      </Detail>
    )
  );
}

function SpecialModuleList({ specPartList, detailSummaryStates }) {

  const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = detailSummaryStates
  const partCTGs = ['purchased', 'manufactured'];

  return (
    partCTGs.map( // searches the partListData for each category mentioned in the array
      partCTG => <Detail // add a detailId field
        title={`${specPartList[partCTG].length}x ${camelToSentenceCase(partCTG)} Parts`} // -> 2x Special Modules
        detailId={partCTG}
        selectionStates={[activeDetail, setActiveDetail]}
      >
        {
          specPartList[partCTG].map(
            (specPart, idx2) =>
              <DetailItem
                key={idx2}
                detailId={partCTG}
                detailItemId={specPart.nomenclature}
                selectionStates={detailSummaryStates}
              >
                {specPart.nomenclature}
              </DetailItem>
          )
        }
      </Detail>
    )
  );
}

function DetailSection({ title, children }) {
  return (
    <section className={styles.detailSection} >
      <h2 className={styles.detailTitle}>
        {title}
      </h2>
      {
        children && <div className={styles.detailBody}>
          {children}
        </div>

      }
    </section>

  );
}

function OVitem({ label, value }) {
  return (<DetailItem>
    <p className={styles.detailPair}>
      <span className={styles.detailPairLabel}>{label}</span>
      <span className={styles.detailPairValue}>{value}</span>
    </p>
  </DetailItem>);
}













// params for filtration function
// objName, [parts]
// filter, [type]
// filters_&_fallback: (contains an array of matching filter-key and a fallback filter-key, which is 'others' by default, if no match found)
// ------- [ [ 'purchase' , 'special' ] , 'misc' ]

