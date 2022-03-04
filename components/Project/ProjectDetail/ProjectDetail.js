// Dependency & Helpers
import React, { useState } from 'react'
import { concatStrings, camelToSentenceCase, mapDataToCategory, cloneAndPluck, isObjEmpty, genLog } from '../../../helpers/reusable'
// Store
// Styles
import styles from './ProjectDetail.module.scss'
// Components
import Summary from './Summary/Project_Summary'
import Assemblies from './Assemblies/Assemblies'
import Parts from './Parts/Parts'


export default function ProjectDetail({ outerClasses, activeProjectData = {} }) {

  // Following state is related to module (name & category)
  const [activeModuleType, setActiveModuleType] = useState('') // Purchase or Manufactured // not related to sideNav
  const [activeModule, setActiveModule] = useState('') // Pulley Shaft,BLS etc. // not related to sideNav

  // Destructuring activeProjectData
  const {
    summary: summaryData,
    assemblies: assemblyList,
    parts: partList
  } = activeProjectData;

  // Stop execution if no project is selected
  if (!summaryData || !summaryData.type || !summaryData.nomenclature) {
    return <p className='note'>No Project Selected - ProjectDetail</p>
  }


  return (
    <section className={concatStrings([styles.detail, ...outerClasses])} >

      {/* Summary */}

      <Summary
        projectSummary={summaryData}
      />


      {/* List of Assemblies */}
      <Assemblies
        projectState={[summaryData.type, summaryData.nomenclature]}
        assemblyList={assemblyList}
      />

      {/* Part List */}
      <Parts
        partList={partList}
        projectState={[summaryData.type, summaryData.nomenclature]}
        assemblyList={assemblyList}
      />


    </section>
  )
}
