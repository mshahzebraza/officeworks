import React from 'react'
import styles from './Detail.module.scss'

function DetailBody({ data = [] }) {
  return (
    data.length > 0 &&
    <div className={styles.detailBody}>
      {data}
    </div>

  )
}

export default DetailBody
