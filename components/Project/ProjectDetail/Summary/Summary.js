import React, { useState } from 'react'
import { camelToSentenceCase, checkDataType, isObjEmpty } from '../../../../helpers/reusable';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './Summary.module.scss'
import ProjectSummary_Form from '../ProjectForms/ProjectSummary_Form';
import Button from '../../../UI/Button';



export default function Summary({ projectSummary }) {

  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const isSummaryValid = !isObjEmpty(projectSummary);


  const buttonsJSX = <>
    <Button caption='Edit Overview' click={() => { setShowUpdateForm(state => !state) }} />,
    <Button caption='Delete Project' click={() => { console.log('New Delete') }} />,
  </>


  return (
    <DetailSection title='Summary' outerClasses={[styles.container]} buttonsJSX={isSummaryValid && buttonsJSX} >
      {
        showUpdateForm && <ProjectSummary_Form
          closer={() => setShowUpdateForm(false)}
          oldProjectData={projectSummary}
        />
      }

      {
        isSummaryValid ? <>
          <div className={styles.summary}>
            {
              ['type', 'nomenclature', 'application', 'status', 'stock'].map(
                (el, idx) =>
                  <SummaryItem key={idx} label={camelToSentenceCase(el)} value={projectSummary[el]}></SummaryItem>
              )
            }

          </div>
          <div className={styles.target}>
            <span className={styles.targetCaption} >Target</span>
            <span className={styles.targetValue} >{projectSummary.target || 0}</span>
            <button className={styles.targetBtn} > Reset Target</button>
          </div>
        </>
          : <p className='note'>No Project Selected - Summary</p>
      }


    </DetailSection >
  )
}


function SummaryItem({ label, value }) {
  let dataReturned;
  if (value) {
    dataReturned = checkDataType(value) === 'array' ?
      value.reduce((prev, cur) => prev.concat(`${cur}, `), '')
      : value
  } else {
    dataReturned = '-'
  }

  return (<DetailItem>
    <p className={styles.ovInfo}>
      <span className={styles.ovInfoLabel}>{label}</span>
      <span className={styles.ovInfoValue}>{dataReturned}</span>
    </p>
  </DetailItem>);
}


