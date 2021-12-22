import React from 'react'
import { concatStrings } from '../../helpers/reusable';
import styles from './Detail.module.scss'

export default function Detail({ defaultOpen = false, title, isActive = false, click = () => { }, children = '', selectionStates = [], detailId = title }) {

  // receives detailId
  const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = selectionStates

  // if all the params have been received
  isActive = (activeDetail && detailId) ? activeDetail == detailId : null;

  function clickHandler() {
    setActiveDetailItem && setActiveDetailItem('');
    setActiveDetail && setActiveDetail(detailId);
  }
  // if not received

  return (
    <details className={styles.detail} open={defaultOpen} >

      <summary className={styles.detailHeader} onClick={clickHandler} >
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
