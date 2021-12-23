import React, { useState } from 'react'
import { camelToSentenceCase, cloneAndPluck } from '../../../../helpers/reusable';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './Overview.module.scss'
import UpdateProjOV_Modal from './UpdateProjOV_Modal';



export default function Overview({ projectData }) {

  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const projectDataOV = cloneAndPluck(projectData, ['type', 'nomenclature', 'application', 'status', 'stock', 'target']);

  const ovBtnDataList = projectDataOV.type && projectDataOV.nomenclature &&
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
    <DetailSection title='Overview' outerClasses={[styles.container]} btnDataList={ovBtnDataList} >
      {
        showUpdateForm && <UpdateProjOV_Modal
          closer={() => setShowUpdateForm(false)}
          projData={projectDataOV}
        />
      }
      <div className={styles.summary}>
        {
          ['type', 'nomenclature', 'application', 'status', 'stock'].map(
            (el, idx) =>
              <OVitem key={idx} label={camelToSentenceCase(el)} value={projectDataOV[el]}></OVitem>
          )
        }

      </div>
      <div className={styles.target}>
        <span className={styles.targetCaption} >Target</span>
        <span className={styles.targetValue} >{projectDataOV.target || 0}</span>
        <button className={styles.targetBtn} > Reset Target</button>
      </div>
    </DetailSection >
  )
}


function OVitem({ label, value }) {
  return (<DetailItem>
    <p className={styles.ovInfo}>
      <span className={styles.ovInfoLabel}>{label}</span>
      <span className={styles.ovInfoValue}>{value}</span>
    </p>
  </DetailItem>);
}


