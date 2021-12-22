// Dependency & Helpers
import React, { useState } from 'react'
import { concatStrings, camelToSentenceCase } from '../../../helpers/reusable'
// Store
// Styles
import styles from './ProjectDetail.module.scss'
// Components
import DetailItem from '../../Detail&Summary/DetailItem'
import Detail from '../../Detail&Summary/Detail'




export default function ProjectDetail({ outerClasses, activeProject = {} }) {

  const [activeModuleType, setActiveModuleType] = useState('') // Purchase or Manufactured
  const [activeModule, setActiveModule] = useState('') // Pulley Shaft,BLS etc.


  const segregatedPartTypes = {
    purchased: [],
    manufactured: [],
    standard: []
  }

  activeProject.parts && Array.isArray(activeProject.parts) &&
    activeProject.parts.forEach(
      (part, idx) => {
        segregatedPartTypes[part.type].push(part)
      }
    )


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
          partsListData={segregatedPartTypes}
          detailSummaryStates={[activeModuleType, setActiveModuleType, activeModule, setActiveModule]}
          activeDetailId={activeModuleType}
          setActiveDetailId={setActiveModuleType}
        />


      </DetailSection>

      {/* Fastener List */}
      <DetailSection title='Standard Modules' >
        {/* 
        <Detail
          title='Standard Parts'
        >
          {standardParts}
        </Detail> */}

      </DetailSection>

      {/* 
      <span>ProjectsNav</span>
      <span>Project Overview</span>
      <span>Project Target</span>
      <span>Project Part Details</span>

      <details>
        <summary>Spec Parts</summary>
        <p>Spec Part 1</p>
        <p>Spec Part 2</p>
        <p>Spec Part 3</p>
      </details>
      <details>
        <summary>Mfg Parts</summary>
        <p>Mfg Part 1</p>
        <p>Mfg Part 2</p>
        <p>Mfg Part 3</p>
      </details>
      <details>
        <summary>Fasteners</summary>
        <details>
          <summary>Screws</summary>
          <p>Screw 1</p>
          <p>Screw 2</p>
          <p>Screw 3</p>
        </details>
        <details>
          <summary>Washers</summary>
          <p>Washer 1</p>
          <p>Washer 2</p>
          <p>Washer 3</p>
        </details>
      </details> */}

    </section>
  )
}






function SpecialModuleList({ partsListData, detailSummaryStates }) {

  const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = detailSummaryStates

  return (
    ['purchased', 'manufactured'].map( // searches the partListData for each category mentioned in the array
      partCat => <Detail // add a detailId field
        title={`${partsListData[partCat].length}x ${camelToSentenceCase(partCat)} Parts`} // -> 2x Special Modules
        // click={() => { setActiveDetail(partCat) }} // -> selection Color on activate
        // isActive={activeDetail === partCat} // -> related to active Detail
        click={
          () => {
            setActiveDetailItem('') // do this only if the activeDetailItem doesn't start with the parent detail
            setActiveDetail(partCat)
          }
        }
        isActive={activeDetail == partCat}
      >
        {
          partsListData[partCat].map(
            (partData, idx2) =>
              <DetailItem
                key={idx2}
                click={() => {
                  setActiveDetailItem(partData.nomenclature)
                  activeDetail !== partCat && setActiveDetail(partCat)
                }}
                isActive={activeDetailItem == partData.nomenclature}
              >
                {partData.nomenclature}
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


