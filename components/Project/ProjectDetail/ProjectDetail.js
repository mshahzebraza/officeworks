// Dependency & Helpers
import React from 'react'
import { concatStrings, camelToSentenceCase } from '../../../helpers/reusable'
// Store
// Styles
import styles from './ProjectDetail.module.scss'
// Components
import DetailItem from '../../Detail&Summary/DetailItem'
import Detail from '../../Detail&Summary/Detail'





export default function ProjectDetail({ outerClasses, activeCategory, activeNomenclature, activeProject = {} }) {


  const specialParts = [];
  const manufacturedParts = [];
  const standardParts = [];

  activeProject.parts && Array.isArray(activeProject.parts) && activeProject.parts.forEach(
    (part, idx) => {
      part.type === 'Special' && specialParts.push(
        <DetailItem>
          {part.nomenclature}
        </DetailItem>
      )
      part.type === 'Manufactured' && manufacturedParts.push(
        <DetailItem>
          {part.nomenclature}
        </DetailItem>
      )
      part.type === 'Standard' && standardParts.push(
        <DetailItem>
          {part.nomenclature}
        </DetailItem>
      )
    }
  )

  console.log(activeProject);

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
      <DetailSection title='Part List' >


        <Detail
          title='Special Parts'
        >
          {specialParts}
        </Detail>

        <Detail
          title='Manufactured Parts'
        >
          {manufacturedParts}
        </Detail>

        <Detail
          title='Standard Parts'
        >
          {standardParts}
        </Detail>

      </DetailSection>

      {/* Fastener List */}
      <DetailSection title='Fastener List' >
        <Detail
          title='Screws'
        >
          <DetailItem>
            M5x15
          </DetailItem>
        </Detail>
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


