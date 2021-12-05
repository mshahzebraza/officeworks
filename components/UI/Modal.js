import React from 'react'
import styles from './Modal.module.scss'

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
          <button onClick={props.closer} >Close</button>
          {props.children}
        </div>
      </div>
    </>
  )
}
