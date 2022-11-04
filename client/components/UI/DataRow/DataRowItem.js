import React from 'react'
import { concatStrings } from '../../../helpers/reusable'

import styles from './DataRow.module.scss';

function DataRowItem({ flex, content = 'No content', outerClasses = [] }) {
  return (
    <div
      className={concatStrings([styles.entryItems, ...outerClasses])}
      style={{ flex: flex }}
    >
      {content}
    </div>
  )
}

export default DataRowItem
