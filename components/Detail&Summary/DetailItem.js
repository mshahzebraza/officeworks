import { concatStrings } from '../../helpers/reusable';
import styles from './DetailItem.module.scss'

export default function DetailItem({ children: data, selectionStates = [], detailId = null, detailItemId = null, outerClasses = [] }) {

  /* 
    You can omit passing the following props if you don't want to know which entry is currently selected  OR the 'highlight effect (which comes with the state management)
      1. detailId
      2. detailItemId
      3. selectionStates
      
    NOTE: Sometimes, we may not want to get the state of selected detailItem, but we have to pass in these states to get the highlight effect.
   */


  // IMPORT of detailId can still be avoided
  const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = selectionStates

  const isActive =
    detailItemId != undefined
    && activeDetail === detailId
    && activeDetailItem === detailItemId

  function clickHandler() {
    setActiveDetailItem && setActiveDetailItem(detailItemId)
    activeDetail !== detailId && setActiveDetail && setActiveDetail(detailId)
  }

  return (
    <div
      onClick={clickHandler}
      className={concatStrings([styles.detailItem, !!isActive && styles.detailItemActive, ...outerClasses])}

    >
      {data}
    </div >
  );
}
