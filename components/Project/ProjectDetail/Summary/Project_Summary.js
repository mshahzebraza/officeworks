// Dependency & Helpers
import React from 'react'
import { isObjEmpty } from '../../../../helpers/reusable';
// Store
// Styles
import styles from './Project_Summary.module.scss'
// Components
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import ProjectSummary_Form from '../ProjectForms/ProjectSummary_Form';
import Button from '../../../UI/Button';
import ModalButton from '../../../UI/ModalButton';
import { deleteProjHandler } from '../../../../lib/apollo_client/projectApollo';
import { Summarize } from '../../../UI/Summarize/Summarize';


export default function Project_Summary({ projectSummary = {} }) {
  // const dispatch = useDispatch();

  const isSummaryValid = projectSummary && !isObjEmpty(projectSummary);

  // console.log('projectSummary', summarizer(projectSummary, [['application', ' ,']]));


  const buttonsJSX = <>
    <ModalButton caption='Update Summary' activeSummaryData={projectSummary} ModalComponent={ProjectSummary_Form} />
    <Button caption='Delete Project' click={() => deleteProjHandler(projectSummary.nomenclature)} />
  </>


  return (
    <DetailSection
      title='Summary'
      outerClasses={[styles.container]}
      buttonsJSX={isSummaryValid && buttonsJSX}
    >

      {
        isSummaryValid ? <>
          {/* Summary Block */}

          <div className={styles.summary}>
            <Summarize data={projectSummary} dataKeyOptions={{ toDelete: ['_id', 'target'] }} />
          </div>

          {/* Target Block */}
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

