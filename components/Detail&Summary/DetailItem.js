import { concatStrings } from '../../helpers/reusable';
import styles from './DetailItem.module.scss'

export default function DetailItem({ isActive = false, click = () => { }, children, selectionStates = [], detailId = null, detailItemId = null }) {

  // IMPORT of detailId can still be avoided
  const [activeDetail, setActiveDetail, activeDetailItem, setActiveDetailItem] = selectionStates

  isActive = (activeDetailItem && detailItemId)
    ? activeDetailItem == detailItemId
    : null;

  function clickHandler() {
    setActiveDetailItem && setActiveDetailItem(detailItemId)
    activeDetail !== detailId && setActiveDetail && setActiveDetail(detailId)
  }

  return (
    <div
      onClick={clickHandler}
      className={concatStrings([styles.detailItem, !!isActive && styles.detailItemActive])}
    // className={
    //   `${styles.detailItem} 
    //   ${!!isActive && styles.detailItemActive}`
    // }
    >
      {children}
    </div >
  );
}
