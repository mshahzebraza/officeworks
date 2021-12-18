import React from 'react'
import { concatStrings } from '../../helpers/reusable'
import Header from './Header/Header'
import styles from './Layout.module.scss'

export default function Layout({ children, pageClasses = [] }) {


  return (
    <div className={styles.layoutContainer} >
      <Header />
      {/* <nav>Nav</nav> */}
      <main className={concatStrings([styles.main, ...pageClasses])}>
        {children}
      </main>
    </div>
  )
}
