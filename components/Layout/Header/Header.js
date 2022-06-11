import React from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'




export default function Header() {
     return (
          <header className={styles.header}>
               {/* Logo */}
               <div className={styles.brand}>
                    <Link href={'/'}>
                         <a>Office Works</a>
                    </Link>
               </div>
               {/* Nav */}
               <nav className={styles.nav}>
                    {/* Nav */}
                    <ul className={styles.navList}>
                         {/* <NavItem text={'Procurement'} path={`/procurement`}></NavItem> */}
                         <NavItem text={'POs'} path={`/po`}></NavItem>
                         <NavItem text={'MWOs'} path={`/mwo`}></NavItem>

                         <NavItem text={'Module'} path={`/module`}></NavItem>
                         <NavItem text={'Transactions'} path={`/transaction`}></NavItem>
                         <NavItem text={'Projects'} path={`/project`}></NavItem>
                    </ul>
               </nav>
               {/* toolbox */}
               <div className={styles.toolbox}>
                    Signup
               </div>
          </header>
     )
}

function NavItem({ text, path }) {
     return (<li className={styles.navItem}>
          <Link href={path}>
               <a className={styles.navLink}>{text}</a>
          </Link>
     </li>);
}