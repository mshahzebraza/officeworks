// Dependency & Helpers
import React, { useState } from 'react'
import { concatStrings, camelToSentenceCase, mapDataToCategory, cloneAndPluck, isObjEmpty, genLog } from '../../../helpers/reusable'
// Store
// Styles
import styles from './ProjectDetail.module.scss'
// Components
import DetailItem from '../../Detail&Summary/DetailItem'
import Detail from '../../Detail&Summary/Detail'
import DetailSection from './DetailSection/DetailSection'
import SpecialModules from './SpecialModules/SpecialModules'
import StandardModules from './StandardModules/StandardModules'
import Summary from './Summary/Summary'
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


  // const specialModuleCategories = ['specStd', 'mfg', 'std'];
  // const allParts = mapDataToCategory(partList, specialModuleCategories)

  // const specParts = cloneAndPluck(allParts, ['specStd', 'mfg'])

  // const { others: otherParts } = cloneAndPluck(allParts, ['others'])
  // // otherParts && otherParts.length > 0 && genLog('Assign Valid Category for the following parts - ProjectDetail', otherParts);

  // const standardModuleCategories = ['bearing', 'screw', 'washer', 'misc'];
  // const stdParts = mapDataToCategory(allParts.standard, standardModuleCategories, 'nomenclature', 'misc')
  // console.log('std-after', stdParts);


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

      {/* Spec Part List */}
      {/* <SpecialModules
        specParts={specParts}
        projectState={summaryData && [summaryData.type, summaryData.nomenclature]}
        assemblyList={assemblyList}
      /> */}

      {/* Std Part List */}
      {/* <StandardModules
        stdParts={stdParts}
        projectState={summaryData && [summaryData.type, summaryData.nomenclature]}
        assemblyList={assemblyList}
      /> */}

    </section>
  )
}
