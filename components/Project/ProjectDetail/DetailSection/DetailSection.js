import React from 'react'
import styles from './DetailSection.module.scss'

export default function DetailSection({ title, children }) {
  return (
    <section className={styles.detailSection} >
      <h2 className={styles.detailTitle}>
        {title}
      </h2>
      {
        children && <div className={styles.detailBody}>
          {children}
        </div>

      }
    </section>

  );
}