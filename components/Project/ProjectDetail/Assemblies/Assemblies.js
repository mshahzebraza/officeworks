import React, { useState } from 'react'
import { camelToSentenceCase, checkDataType, isObjEmpty } from '../../../../helpers/reusable';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './Assemblies.module.scss'
import ProjectSummary_Form from '../ProjectForms/ProjectSummary_Form';
import Button from '../../../UI/Button';



export default function Assemblies({ assembliesData = [] }) {

  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const isAssembliesValid = assembliesData && assembliesData.length > 0;

  console.log(assembliesData);
  const assemblyListString = assembliesData
    && assembliesData.reduce((prev, cur) => prev.concat(` ${cur.nomenclature},`), '') || 'No items found'

  const buttonsJSX = <>
    <Button caption='Add Assembly' click={() => { setShowUpdateForm(state => !state) }} />,
  </>


  return (
    <DetailSection title='Assemblies' outerClasses={[styles.container]} buttonsJSX={isAssembliesValid && buttonsJSX} >
      {
        showUpdateForm && `No form`
        // <ProjectSummary_Form
        //   closer={() => setShowUpdateForm(false)}
        //   oldProjectData={projectSummary}
        // />
      }

      {
        isAssembliesValid ? <div className={styles.assemblies}>
          {
            assembliesData.map((assemblyData, index) => {
              return <Assembly {...assemblyData} key={index} />
            })
          }
        </div>
          : <p className='note'>No Assemblies Inside - Assemblies</p>
      }


    </DetailSection >
  )
}
export function Assembly(props) {
  function handleEdit(params) {
    console.log(`Edit this`);
  }
  function handleDelete(params) {
    console.log(`Delete this`);
  }

  return (
    <div className={styles.assembly}>
      <span className={styles.assembly_id}>{props.id}</span>
      <span className={styles.assembly_nomenclature}>{props.nomenclature}</span>
      <span className={styles.assembly_parent}>{props.parent || '0000'}</span>
      <Button caption='Edit' click={handleEdit} />
      <Button caption='Delete' click={handleDelete} />
    </div>
  )
}