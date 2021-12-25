// Dependency & Helpers
import React, { useState } from 'react'
import { concatStrings, camelToSentenceCase, mapDataToCategory, cloneAndPluck } from '../../../helpers/reusable'
// Store
// Styles
import styles from './ProjectDetail.module.scss'
// Components
import DetailItem from '../../Detail&Summary/DetailItem'
import Detail from '../../Detail&Summary/Detail'
import DetailSection from './DetailSection/DetailSection'
import SpecialModules from './SpecialModules/SpecialModules'
import StandardModules from './StandardModules/StandardModules'
import Overview from './Overview/Overview'


export default function ProjectDetail({ outerClasses, activeProjectData = {} }) {

  const [activeModuleType, setActiveModuleType] = useState('') // Purchase or Manufactured
  const [activeModule, setActiveModule] = useState('') // Pulley Shaft,BLS etc.


  const overviewData = cloneAndPluck(activeProjectData, ['type', 'nomenclature', 'application', 'status', 'stock', 'target']);

  const specialModuleCategories = ['purchased', 'manufactured', 'standard'];
  const allParts = mapDataToCategory(activeProjectData.parts, specialModuleCategories)

  const standardModuleCategories = ['bearing', 'screw', 'washer', 'misc'];
  const stdParts = mapDataToCategory(allParts.standard, standardModuleCategories, 'nomenclature', 'misc')


  return (
    <section className={concatStrings([styles.detail, ...outerClasses])} >

      {/* Overview */}
      <Overview
        projectSummary={overviewData}
      />


      {/* Spec Part List */}
      <SpecialModules
        specParts={allParts}
        detailSummaryStates={[activeModuleType, setActiveModuleType, activeModule, setActiveModule]}
        breadCrumbs={[overviewData.type, overviewData.nomenclature]}
      />

      {/* Std Part List */}
      <StandardModules
        stdParts={stdParts}
        detailSummaryStates={[activeModuleType, setActiveModuleType, activeModule, setActiveModule]}
      />

    </section>
  )
}
