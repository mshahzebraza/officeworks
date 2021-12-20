import React from 'react'
import { concatStrings } from '../../helpers/reusable';
import styles from './Detail.module.scss'

export default function Detail({ title, isActive = false, click = () => { }, children }) {
  return (
    <details className={styles.detail} >

      <summary className={styles.detailHeader} onClick={click} >
        {
          title && <h3 className={
            concatStrings([styles.detailTitle, !!isActive && styles.detailTitleActive])
          } >
            {title}
          </h3>
        }
      </summary>

      <div className={styles.detailBody}>
        {children}
      </div>

    </details>);
}
