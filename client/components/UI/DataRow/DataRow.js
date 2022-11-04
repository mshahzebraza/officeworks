// Dependency
import Image from 'next/image'
import React from 'react'
import { concatStrings } from '../../../helpers/reusable'


// Store & Styles
import styles from './DataRow.module.scss';

// Components


export default function DataRow({ outerClasses = [], raw = false, children, header = false }) {

  const styleList = [styles.entry, ...outerClasses]
  header && styleList.push(styles.header)
  raw && styleList.push(styles.raw)
  // raw attribute disables the background color and padding (useful when the parent already has background applied)

  return (
    <div className={concatStrings(styleList)} >
      {children}
    </div>
  )
}
