import React, { useState } from 'react'
import { camelToSentenceCase } from '../../../../helpers/reusable';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './Overview.module.scss'
import UpdateProjectSummary_Modal from './UpdateProjectSummary_Modal';



export default function Overview({ projectSummary }) {

  const [showUpdateForm, setShowUpdateForm] = useState(false)


  const summaryBtnDataList = projectSummary.type && projectSummary.nomenclature &&
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
    <DetailSection title='Overview' outerClasses={[styles.container]} btnDataList={summaryBtnDataList} >
      {
        showUpdateForm && <UpdateProjectSummary_Modal
          closer={() => setShowUpdateForm(false)}
          projData={projectSummary}
        />
      }
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


