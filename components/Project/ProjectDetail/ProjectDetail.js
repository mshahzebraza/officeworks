// Dependency & Helpers
import React, { useState } from 'react'
import { concatStrings, camelToSentenceCase, mapDataToCategory, cloneAndPluck, isObjEmpty } from '../../../helpers/reusable'
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


export default function ProjectDetail({ outerClasses, activeProjectData = {} }) {

  // Following state is related to project (name & category)
  // const [activeProjectType, activeProjectNomenclature] = projectSelectionStates

  // Following state is related to module (name & category)
  const [activeModuleType, setActiveModuleType] = useState('') // Purchase or Manufactured // not related to sideNav
  const [activeModule, setActiveModule] = useState('') // Pulley Shaft,BLS etc. // not related to sideNav

  // console.log('activeModuleType', activeModuleType);
  // console.log('activeModule', activeModule);

  const summaryData = cloneAndPluck(activeProjectData, ['type', 'nomenclature', 'application', 'status', 'stock', 'target']);

  const specialModuleCategories = ['purchased', 'manufactured', 'standard'];
  const allParts = mapDataToCategory(activeProjectData.parts, specialModuleCategories)

  const specParts = cloneAndPluck(allParts, ['purchased', 'manufactured'])
  const otherParts = cloneAndPluck(allParts, ['others'])

  const standardModuleCategories = ['bearing', 'screw', 'washer', 'misc'];
  const stdParts = mapDataToCategory(allParts.standard, standardModuleCategories, 'nomenclature', 'misc')



  return (
    <section className={concatStrings([styles.detail, ...outerClasses])} >

      {/* Overview */}

      <Summary
        projectSummary={summaryData}
      />



      {/* Spec Part List */}
      <SpecialModules
        specParts={specParts}
        detailSummaryStates={[activeModuleType, setActiveModuleType, activeModule, setActiveModule]}
        isProjectValid={!!summaryData.type && !!summaryData.nomenclature}
      />

      {/* Std Part List */}
      <StandardModules
        stdParts={stdParts}
        detailSummaryStates={[activeModuleType, setActiveModuleType, activeModule, setActiveModule]}
        isProjectValid={!!summaryData.type && !!summaryData.nomenclature}
      />

    </section>
  )
}
