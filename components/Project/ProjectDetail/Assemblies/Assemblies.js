import React, { useState } from 'react'
import { camelToSentenceCase, checkDataType, cloneAndPluck, isObjEmpty } from '../../../../helpers/reusable';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './Assemblies.module.scss'
import Button from '../../../UI/Button';
import ProjectAssembly_Form from '../ProjectForms/ProjectAssembly_Form';
import { projectActions } from '../../../../store/project/project-slice';
import { useDispatch } from 'react-redux';

export default function Assemblies({ projectState = [] }) {

  const [activeProjectType, activeProjectId, assembliesData] = projectState;

  const [showAssemblyForm, setShowAssemblyForm] = useState(false)
  const isAssembliesValid = assembliesData && assembliesData.length > 0;

  const buttonsJSX = <>
    <Button caption='Add Assembly' click={() => { setShowAssemblyForm(state => !state) }} />,
  </>


  return (
    <DetailSection title='Assemblies' outerClasses={[styles.container]} buttonsJSX={isAssembliesValid && buttonsJSX} >
      {
        showAssemblyForm &&
        < ProjectAssembly_Form
          activeProjectType={activeProjectType}
          activeProjectId={activeProjectId}
          closer={() => setShowAssemblyForm(false)}
          activeAssembliesData={assembliesData}
        // activeAssemblyData={assembliesData}
        />
      }

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

  const [showAssemblyForm, setShowAssemblyForm] = useState(false)


  return (
    <div className={styles.assembly}>
      {
        showAssemblyForm &&
        < ProjectAssembly_Form
          closer={() => setShowAssemblyForm(false)}
          activeProjectType={activeProjectType}
          activeProjectId={activeProjectId}
          activeAssembliesData={assembliesData}
          activeAssemblyData={assemblyData}
        />
      }
      <span className={styles.assembly_index}>{props.index + 1}.</span>
      <span className={styles.assembly_id}>{assemblyData.id}</span>
      <span className={styles.assembly_nomenclature}>{assemblyData.nomenclature}</span>
      <span className={styles.assembly_parent}>{assemblyData.parent || '0000'}</span>

      <Button caption='Edit' disabled={['0000', 'FAST'].includes(assemblyData.id)} click={() => setShowAssemblyForm(state => !state)} />
      <Button caption='Delete' disabled={['0000', 'FAST'].includes(assemblyData.id)} click={() => { dispatch(projectActions.deleteAssembly([activeProjectType, activeProjectId, assemblyData.id])) }} />
    </div>
  )
}