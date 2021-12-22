import React from 'react'
import { camelToSentenceCase } from '../../../../helpers/reusable';
import DetailItem from '../../../Detail&Summary/DetailItem';
import DetailSection from '../DetailSection/DetailSection';
import styles from './Overview.module.scss'





export default function Overview({ projectData }) {
  return (
    <DetailSection title='Overview' >
      {
        ['type', 'nomenclature', 'application', 'status', 'stock'].map(
          (el, idx) =>
            <OVitem key={idx} label={camelToSentenceCase(el)} value={projectData[el]}></OVitem>
        )
      }
    </DetailSection>
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


