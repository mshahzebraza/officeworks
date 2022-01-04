// Dependency & Helpers
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { camelToSentenceCase, checkDataType, isObjEmpty } from '../../../../helpers/reusable';
// Store
import { projectActions } from '../../../../store/project/project-slice';
// Styles
import styles from './Summary.module.scss'
// Components
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import ProjectSummary_Form from '../ProjectForms/ProjectSummary_Form';
import Button from '../../../UI/Button';
import ModalButton from '../../../UI/ModalButton';


export default function Summary({ projectSummary = {} }) {
  const dispatch = useDispatch();

  const isSummaryValid = projectSummary && !isObjEmpty(projectSummary);


  const buttonsJSX = <>
    <ModalButton caption='Update Summary' activeSummaryData={projectSummary} ModalComponent={ProjectSummary_Form} />
    <Button caption='Delete Project' click={() => { dispatch(projectActions.deleteProject(projectSummary.nomenclature)) }} />
  </>


  return (
    <DetailSection
      title='Summary'
      outerClasses={[styles.container]}
      buttonsJSX={isSummaryValid && buttonsJSX}
    >

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
      (!!value.length ? value.reduce((prev, cur) => prev.concat(`${cur}, `), '') : '-')
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


