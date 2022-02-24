import React, { useState } from 'react'
import DetailSection from '../DetailSection/DetailSection';
import styles from './Assemblies.module.scss'
import ProjectAssembly_Form from '../ProjectForms/ProjectAssembly_Form';
import ModalButton from '../../../UI/ModalButton';
import { AssemblyEntry } from './AssemblyEntry';


export default function Assemblies({
  projectState = [],
  assemblyList: assembliesData
}) {

  const [activeProjectType, activeProjectId] = projectState;

  const isAssembliesValid = assembliesData && assembliesData.length > 0; // would always be non-zero bcz main assembly is always there.

  const buttonsJSX = <>
    <ModalButton
      caption='Add Assembly'
      ModalComponent={ProjectAssembly_Form}
      activeProjectType={activeProjectType}
      activeProjectId={activeProjectId}
      activeAssembliesData={assembliesData}
    />
  </>


  return (
    <DetailSection title='Assemblies' outerClasses={[styles.container]} buttonsJSX={isAssembliesValid && buttonsJSX} >

      {
        isAssembliesValid ? <div className={styles.assemblies}>
          <AssemblyEntry
            header={true}
          />
          {
            assembliesData.map((assemblyData, index, assembliesData) => {
              return <AssemblyEntry
                key={index}
                activeProjectId={activeProjectId}
                activeProjectType={activeProjectType}
                assemblyIndex={index}
                assemblyData={assemblyData}
                assembliesData={assembliesData}
              />
            })
          }
        </div>
          : <p className='note'>No Assemblies Inside - Assemblies</p>
      }


    </DetailSection >
  )
}
