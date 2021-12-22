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

  // Perform the spec to purchase & mfg separation
  // Perform the std to screws,washers,bearings and misc separation

  // save  if activeProj.parts is defined and is an array
  const activeProjectPartList =
    Array.isArray(activeProject.parts)
    && activeProject.parts;

  // type-based separation of all std,spec & mfg parts
  activeProjectPartList &&
    activeProjectPartList.forEach(
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
          specPartList={segregatedPartTypes}
          detailSummaryStates={[activeModuleType, setActiveModuleType, activeModule, setActiveModule]}
          activeDetailId={activeModuleType}
          setActiveDetailId={setActiveModuleType}
        />


      </DetailSection>

      {/* Fastener List */}
      <DetailSection title='Standard Modules' >
        <StandardModuleList
          stdPartList={segregatedPartTypes}
          detailSummaryStates={[activeModuleType, setActiveModuleType, activeModule, setActiveModule]}
          activeDetailId={activeModuleType}
          setActiveDetailId={setActiveModuleType}
        />
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






function StandardModuleList({ stdPartList, detailSummaryStates }) {


  const stdParts = {
    bearings: [],
    screws: [],
    washers: [],
    misc: [],
  }

  // type-based separation of all std,spec & mfg parts
  // activeProject.parts && Array.isArray(activeProject.parts) &&
  //   activeProject.parts.forEach(
  //     (part, idx) => {
  //       segregatedPartTypes[part.type].push(part)
  //     }
  //   )
  console.log(stdParts);

  const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = detailSummaryStates

  return (
    <h1>s</h1>
    // stdPartList.map( // searches the partListData for each category mentioned in the array
    //   partCat => <Detail // add a detailId field
    //     title={`${partsListData[partCat].length}x ${camelToSentenceCase(partCat)} Parts`} // -> 2x Special Modules
    //     detailId={partCat}
    //     selectionStates={[activeDetail, setActiveDetail]}
    //   >
    //     {
    //       partsListData[partCat].map(
    //         (partData, idx2) =>
    //           <DetailItem
    //             key={idx2}
    //             detailId={partCat}
    //             detailItemId={partData.nomenclature}
    //             selectionStates={detailSummaryStates}
    //           >
    //             {partData.nomenclature}
    //           </DetailItem>
    //       )
    //     }
    //   </Detail>
    // )
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


