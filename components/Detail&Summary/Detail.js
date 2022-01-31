import React from 'react'
import { concatStrings } from '../../helpers/reusable';
import styles from './Detail.module.scss'
import DetailBody from './DetailBody';
import DetailHeader from './DetailHeader';


export default function Detail({
  outerClasses = [],
  defaultOpen = false,
  title = 'Title Missing',
  click = () => { },
  children: data = '',
  detailStates = [] }) {

  // Empty Prop
  /* 
  This prop should be passed as 'true' if there is no title but we still want the items to be positioned as they usually are
   */

  // If the click is to mutate the state, then setter function along with the value for the current instance is passes. and onclick sets the state to current instance value
  const [itemValue, setValueState] = detailStates || [];

  function clickHandler() {
    if (detailStates.length === 2) { // check if the state & setState for detail has been passed? 
      setValueState(itemValue);
    }
  }

  return (
    <details className={concatStrings([styles.detail, ...outerClasses])} open={defaultOpen} >

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
