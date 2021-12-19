import React from 'react'
import styles from './SideNav.module.scss'



export default function SideNav() {
  return (
    <section className={styles.nav} >
      <Detail title={`Ball Lead Screw`} >
        <DetailItem><p>Details of Title 01 here</p></DetailItem>
        <DetailItem><p>Details of Title 01 here</p></DetailItem>

        <Detail title={`Nest 1`} >
          <DetailItem><p>Nest Details</p></DetailItem>
          <Detail title={`Nest 2`} >
            <DetailItem><p>Nest Details</p></DetailItem>
          </Detail>
        </Detail>
      </Detail>
      <br />
      <hr />
      <h3>Item</h3>
      <h4>Sub Item</h4>
      <span>x</span>
      <span>x</span>
      <span>x</span>
    </section>
  )
}


function Detail({ title, children }) {
  return (
    <details className={styles.detail}>

      <summary className={styles.detailHeader} >
        <h3 className={styles.detailTitle} >
          {title}
        </h3>
      </summary>

      <div className={styles.detailBody}>
        {children}
      </div>

    </details>);
}



function DetailItem({ children }) {
  return (<div className={styles.detailItem}>{children}</div>);
}

