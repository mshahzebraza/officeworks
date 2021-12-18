import React from 'react'
import styles from './Modal.module.scss'
import Image from 'next/image'


function BackDrop({ closer, children }) {
  return (
    <div
      className={`${styles.backdrop} ${styles.active}`}
      onClick={closer}
    >
      {children}
    </div>);
}


export default function Modal({ title, closer, children }) {
  return (
    <>
      <BackDrop closer={() => closer()}>
        <div
          className={`${styles.content}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* content header */}
          <div className={styles.contentHeader}>
            <h2 className={styles.contentTitle}>
              {title && title}
            </h2>
            <button
              className={`${styles.closeBtn} ${`tooltip`}`}
              onClick={closer}
            >
              <Image src="/icons/close.png" alt="close" width={20} height={20} />
              {/* <span className={`tooltipContent`} >Edit Record</span> */}
            </button>
          </div>
          {/* content body */}
          {children}
        </div>
      </BackDrop>
    </>
  )
}
