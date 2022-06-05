// Dependency & Helpers
import React, { useState } from 'react'
import { concatStrings } from '../../../helpers/reusable'
// Store
// Styles
import styles from './ProjectDetail.module.scss'
// Components
import Summary from './Summary/Project_Summary'
import Assemblies from './Assemblies/Assemblies'
import Parts from './Parts/Parts'
import moduleApollo from '../../../lib/apollo_client/moduleApollo'


export default function ProjectDetail({ outerClasses, activeProjectData = {} }) {

     // TODO: Why is it needed?
     // Following state is related to module (name & category)
     const [activeModuleType, setActiveModuleType] = useState('') // Purchase or Manufactured // not related to sideNav
     const [activeModule, setActiveModule] = useState('') // Pulley Shaft,BLS etc. // not related to sideNav

     const moduleState = moduleApollo()
     const moduleStateList = [...moduleState.list]


     // Destructuring activeProjectData
     const {
          summary: summaryData,
          assemblies: assemblyList,
          parts: partList = []
     } = activeProjectData;

     // TODO: Mutate partList to add inventory field to each of the part equal to the matching module's inv.total

     {
          console.log('partList: ', partList);
          const newPartList = partList.map(
               part => {
                    const matchingModule = moduleStateList.find(
                         module => module.id === part.id
                    )
                    console.log('matchingModule: ', matchingModule);
                    return {
                         ...part,
                         inv: matchingModule?.inv?.total
                    }
               }
          )
          console.log('newPartList: ', newPartList);
     }



     // Stop execution if no project is selected
     if (!summaryData || !summaryData.type || !summaryData.nomenclature) {
          return <p className='note'>No Project Selected - ProjectDetail</p>
     }

     // TODO: Target should be fetched from 'summaryData' and passed down to PartEntries.
     // console.log('Project Target: ', summaryData.target);

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
