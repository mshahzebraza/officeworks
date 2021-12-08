import React from 'react'
import styles from './Modal.module.scss'
import Image from 'next/image'

export default function Modal(props) {
  return (
    <>
      <div
        onClick={() => props.closer()}
        className={`${styles.backdrop} ${styles.active}`}
      >
        <div
          className={`${styles.content}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* content header */}
          <div className={styles.contentHeader}>
            <h2 className={styles.contentTitle}>
              {props.title && props.title}
            </h2>
            <button
              className={`${styles.closeBtn} ${`tooltip`}`}
              onClick={props.closer}
            >
              <Image src="/icons/close.png" alt="close" width={20} height={20} />
              {/* <span className={`tooltipContent`} >Edit Record</span> */}
            </button>
          </div>
          {/* content body */}
          {props.children}
        </div>
      </div>
    </>
  )
}
