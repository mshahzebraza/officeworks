import React from 'react'
import { concatStrings } from '../../helpers/reusable'
import styles from './Detail.module.scss'


function DetailHeader({ click = () => { }, data = [], title = '' }) {
  return (

    <summary className={styles.detailHeader} onClick={click} >
      {
        title && <h3 className={
          concatStrings([styles.detailTitle, !data.length > 0 && styles.detailTitleEmpty])
        } >
          {title}
        </h3>
      }
    </summary>


  )
}

export default DetailHeader
