import { concatStrings } from '../../helpers/reusable';
import styles from './DetailItem.module.scss'

export default function DetailItem({ children, selectionStates = [], detailId = null, detailItemId = null, outerClasses = [] }) {

  // IMPORT of detailId can still be avoided
  const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = selectionStates
  /* 
  // Try to implement this pattern
    activeDetail = {key:'the data property', value:'the display property '}
    activeDetailItem = {key:'the data property', value:'the display property '}
   */

  const isActive =
    detailItemId != undefined && activeDetailItem == detailItemId


  function clickHandler() {
    setActiveDetailItem && setActiveDetailItem(detailItemId)
    activeDetail !== detailId && setActiveDetail && setActiveDetail(detailId)
  }

  return (
    <div
      onClick={clickHandler}
      className={concatStrings([styles.detailItem, !!isActive && styles.detailItemActive, ...outerClasses])}

    >
      {children}
    </div >
  );
}
