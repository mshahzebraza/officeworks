// Dependency
import Image from 'next/image'
import React, { useState } from 'react'
import { concatStrings, removeDuplicate } from '../../../helpers/reusable'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// Store & Styles
import styles from './DataRow.module.scss';
import { poActions } from '../../../store/po/po-slice'

// Components


export default function DataRow({ outerClasses = [], raw = false, children }) {

  const updatedStyles = {
    background: raw && 'unset',
    padding: raw && 'unset',
  }
  // raw attribute disables the background color and padding (useful when the parent already has background applied)

  return (
    <div className={concatStrings([styles.entry, ...outerClasses])} style={updatedStyles} >
      {children}
    </div>
  )
}
