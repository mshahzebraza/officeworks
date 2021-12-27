import React, { useState } from 'react'
import { camelToSentenceCase, isObjEmpty } from '../../../../helpers/reusable';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './Summary.module.scss'
import UpdateProjectSummary_Modal from '../ProjectForms/UpdateProjectSummary_Modal';



export default function Summary({ projectSummary }) {

  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const isSummaryValid = !isObjEmpty(projectSummary);


  const assemblyListString = projectSummary.assemblies && projectSummary.assemblies.reduce((prev, cur) => prev.concat(` ${cur.nomenclature},`), '') || 'No items found'

  const summaryBtnDataList = isSummaryValid &&
    [
      {
        caption: 'Edit Overview',
        click: () => {
          setShowUpdateForm(state => !state)
          console.log(`Hey Edit`);
        }
      },
      {
        caption: 'Delete Project',
        click: () => {
          console.log(`Hey Delete`);
        }
      }
    ]


  return (
    <DetailSection title='Summary' outerClasses={[styles.container]} btnDataList={summaryBtnDataList} >
      {
        showUpdateForm && <UpdateProjectSummary_Modal
          closer={() => setShowUpdateForm(false)}
          projData={projectSummary}
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
            <SummaryItem label={`Assemblies`} value={assemblyListString}>

            </SummaryItem>

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
  return (<DetailItem>
    <p className={styles.ovInfo}>
      <span className={styles.ovInfoLabel}>{label}</span>
      <span className={styles.ovInfoValue}>{value}</span>
    </p>
  </DetailItem>);
}


