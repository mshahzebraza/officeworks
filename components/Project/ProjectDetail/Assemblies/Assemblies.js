import React, { useState } from 'react'
import { camelToSentenceCase, checkDataType, cloneAndPluck, isObjEmpty } from '../../../../helpers/reusable';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './Assemblies.module.scss'
import Button from '../../../UI/Button';
import ProjectAssembly_Form from '../ProjectForms/ProjectAssembly_Form';
import { projectActions } from '../../../../store/project/project-slice';
import { useDispatch } from 'react-redux';
import ModalButton from '../../../UI/ModalButton';
import DataRow from '../../../UI/DataRow/DataRow';
import DataRowItem from '../../../UI/DataRow/DataRowItem';


export default function Assemblies({ projectState = [] }) {

  const [activeProjectType, activeProjectId, assembliesData] = projectState;

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
          {
            assembliesData.map((assemblyData, index, assembliesData) => {
              return <Assembly
                key={index}
                activeProjectId={activeProjectId}
                activeProjectType={activeProjectType}
                index={index}
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
export function Assembly(props) {
  const { activeProjectType, activeProjectId, assemblyData, assembliesData } = props;
  const dispatch = useDispatch();
  // console.log(props);



  return (
    <DataRow outerClasses={[styles.assembly]}>
      <DataRowItem
        flex={1}
        outerClasses={[styles.assembly_index]}
        content={props.index + 1}
      />
      <DataRowItem
        flex={2}
        outerClasses={[styles.assembly_id]}
        content={assemblyData.id}
      />
      <DataRowItem
        flex={6}
        outerClasses={[styles.assembly_nomenclature]}
        content={assemblyData.nomenclature}
      />
      <DataRowItem
        flex={2}
        outerClasses={[styles.assembly_parent]}
        content={assemblyData.parent || '0000'}
      />
      <DataRowItem
        flex={3}
        outerClasses={[styles.assembly_controls]}
        content={<>
          <ModalButton
            caption='Edit'
            disabled={['0000', 'FAST'].includes(assemblyData.id)}
            ModalComponent={ProjectAssembly_Form}
            activeProjectType={activeProjectType}
            activeProjectId={activeProjectId}
            activeAssembliesData={assembliesData}
            activeAssemblyData={assemblyData}
          />
          <Button caption='Delete' disabled={['0000', 'FAST'].includes(assemblyData.id)} click={() => { dispatch(projectActions.deleteAssembly([activeProjectType, activeProjectId, assemblyData.id])) }} />

        </>}
      />

    </DataRow>
  )
}