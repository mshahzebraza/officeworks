import React from 'react'
import { camelToSentenceCase } from '../../../../helpers/reusable';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './Overview.module.scss'





export default function Overview({ projectData }) {

  const ovBtnDataList = [
    {
      caption: 'Edit',
      click: () => {
        console.log(`Hey Edit`);
      }
    },

  ]


  return (
    <DetailSection title='Overview' outerClasses={[styles.container]} btnDataList={ovBtnDataList} >
      <div className={styles.summary}>
        {
          ['type', 'nomenclature', 'application', 'status', 'stock'].map(
            (el, idx) =>
              <OVitem key={idx} label={camelToSentenceCase(el)} value={projectData[el]}></OVitem>
          )
        }

      </div>
      <div className={styles.target}>
        <span className={styles.targetCaption} >Target</span>
        <span className={styles.targetValue} >00</span>
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


