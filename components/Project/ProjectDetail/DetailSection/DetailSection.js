import React from 'react'
import { buttonGenerator, concatStrings } from '../../../../helpers/reusable';
import styles from './DetailSection.module.scss'

export default function DetailSection({ title, children, outerClasses = [], btnDataList = false }) {

  const controlsButtons = btnDataList &&
    btnDataList.map((btnData, btnDataKey) => {
      return buttonGenerator(btnData.caption, btnData.click, [], btnDataKey)
    })

  return (
    <section className={styles.detailSection} >

      <div className={styles.detailHeader}>
        <h2 className={styles.detailTitle}>
          {title}
        </h2>
        <div className={styles.detailControls}>
          {
            controlsButtons
          }
        </div>
      </div>

      {
        children && <div className={[concatStrings([styles.detailBody, ...outerClasses])]}>
          {children}
        </div>

      }
    </section>

  );
}