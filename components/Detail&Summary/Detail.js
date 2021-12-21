import React from 'react'
import { concatStrings } from '../../helpers/reusable';
import styles from './Detail.module.scss'

export default function Detail({ defaultOpen = false, title, isActive = false, click = () => { }, children = '' }) {
  return (
    <details className={styles.detail} open={defaultOpen} >

      <summary className={styles.detailHeader} onClick={click} >
        {
          title && <h3 className={
            concatStrings([styles.detailTitle, !!isActive && styles.detailTitleActive, !children.length > 0 && styles.detailTitleEmpty])
          } >
            {title}
          </h3>
        }
      </summary>

      {
        <div className={styles.detailBody}>
          {children}
        </div>
      }

    </details>);
}
