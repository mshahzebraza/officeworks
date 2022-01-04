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


export default function ProjectDetail({ outerClasses, activeProjectData = {} }) {

  // Following state is related to module (name & category)
  const [activeModuleType, setActiveModuleType] = useState('') // Purchase or Manufactured // not related to sideNav
  const [activeModule, setActiveModule] = useState('') // Pulley Shaft,BLS etc. // not related to sideNav


  const summaryData = cloneAndPluck(activeProjectData, ['type', 'nomenclature', 'application', 'status', 'stock', 'target', 'assemblies']);

  const specialModuleCategories = ['purchased', 'manufactured', 'standard'];
  const allParts = mapDataToCategory(activeProjectData.parts, specialModuleCategories)

  const specParts = cloneAndPluck(allParts, ['purchased', 'manufactured'])
  const { others: otherParts } = cloneAndPluck(allParts, ['others'])
  otherParts && otherParts.length > 0 && genLog('Assign Valid Category for the following parts - ProjectDetail', otherParts);

  const standardModuleCategories = ['bearing', 'screw', 'washer', 'misc'];
  const stdParts = mapDataToCategory(allParts.standard, standardModuleCategories, 'nomenclature', 'misc')


  return (
    <section className={concatStrings([styles.detail, ...outerClasses])} >

      {/* Summary */}

      <Summary
        projectSummary={summaryData}
      />


      {/* List of Assemblies */}
      <Assemblies
        projectState={[summaryData.type, summaryData.nomenclature, summaryData.assemblies]}
      />

      {/* Spec Part List */}
      <SpecialModules
        specParts={specParts}
        moduleState={[activeModuleType, setActiveModuleType, activeModule, setActiveModule]}
        projectState={[summaryData.type, summaryData.nomenclature, summaryData.assemblies]}
      />

      {/* Std Part List */}
      <StandardModules
        stdParts={stdParts}
        moduleState={[activeModuleType, setActiveModuleType, activeModule, setActiveModule]}
        projectState={[summaryData.type, summaryData.nomenclature, summaryData.assemblies]}
      />

    </section>
  )
}
