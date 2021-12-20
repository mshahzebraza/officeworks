import { concatStrings } from '../../helpers/reusable';
import styles from './DetailItem.module.scss'

export default function DetailItem({ isActive = false, click = () => { }, children }) {
  return (
    <div
      onClick={click}
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
