import React from 'react'
import styles from './POnavList.module.scss'

export default function POnavList({ data }) {
  return (
    <section className={styles.poItemList} >
      {/* {console.log(data)} */}
      {data ?
        <ul>
          {
            data.map((item, itemIdx) => {
              return <li key={itemIdx} >{item.name}</li>
            })
          }
        </ul>
        : <>No Items Available</>
      }
    </section>
  )
}
