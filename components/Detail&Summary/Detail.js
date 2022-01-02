import React from 'react'
import { concatStrings } from '../../helpers/reusable';
import styles from './Detail.module.scss'

export default function Detail({ defaultOpen = false, title, click = () => { }, children = '', states = [] }) {

  // If the click is to mutate the state, then setter function along with the value for the current instance is passes. and onclick sets the state to current instance value
  const [itemValue, setValueState] = states || [];

  function clickHandler() {
    if (states.length === 2) { // check if the state & setState for detail has been passed? 
      setValueState(itemValue);
    }
  }


  return (
    <details className={styles.detail} open={defaultOpen} >

      <summary className={styles.detailHeader} onClick={clickHandler} >
        {
          title && <h3 className={
            concatStrings([styles.detailTitle, !children.length > 0 && styles.detailTitleEmpty])
          } >
            {title}
          </h3>
        }
      </summary>

      {
        children.length > 0 && <div className={styles.detailBody}>
          {children}
        </div>
      }

    </details>);
}
