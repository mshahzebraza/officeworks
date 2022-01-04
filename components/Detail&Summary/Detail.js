import React from 'react'
import { concatStrings } from '../../helpers/reusable';
import styles from './Detail.module.scss'
import DetailBody from './DetailBody';
import DetailHeader from './DetailHeader';

export default function Detail({ defaultOpen = false, title, click = () => { }, children: data = '', states = [] }) {

  // If the click is to mutate the state, then setter function along with the value for the current instance is passes. and onclick sets the state to current instance value
  const [itemValue, setValueState] = states || [];

  function clickHandler() {
    if (states.length === 2) { // check if the state & setState for detail has been passed? 
      setValueState(itemValue);
    }
  }


  return (
    <details className={styles.detail} open={defaultOpen} >

      <DetailHeader
        click={clickHandler}
        title={title}
        data={data}
      />

      <DetailBody
        data={data}
      />

    </details >);
}
