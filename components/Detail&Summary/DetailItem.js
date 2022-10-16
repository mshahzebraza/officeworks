import { concatStrings } from '../../helpers/reusable';
import styles from './DetailItem.module.scss'

export default function DetailItem({
  children: data,
  detailStates = [],
  detailItemStates = [],
  detailId = null,
  detailItemId = null,
  outerClasses = [],
  strict = false,
  noHover = false,
}) {

  // Use of Props
  /*
    1. detailId, detailItemId : contains the data of the CURRENT (NOT active) instance of detail / detailItem. Every instance has a unique value and is usually dependant on 'map-index'
    2. detailStates,detailItemStates : contains the state data of the ACTIVE (NOT current) detail / detailItem. This value can correspond to only one detail / detailItem instance. This is used to highlight the entry when its compared to the Id props of all instances.
    3. strict: if this is true then both 'id' and 'state' props of both 'Detail' & 'DetailItem' needs to be equal. However, if it is false, then only 'DetailItem' would be checked
   */

  // What this means?
  /*
    - We can omit passing 'Id props' & 'State Props', but then we would not get any 'state Manipulation' Or 'Highlight Features'. That way the DetailItem would just behave as a div with some styles.
    - Please note that passing only one of 'State' or 'Id' Props also would not allow aforementioned features as two values are needed for comparison. 
   */

  // IMPORT of detailId can still be avoided
  const [activeDetail, setActiveDetail] = detailStates;
  const [activeDetailItem, setActiveDetailItem] = detailItemStates;

  // const isActive =
  //   detailItemId != undefined
  //   && activeDetailItem === detailItemId
  //   && activeDetail === detailId // this check should not be performed everyTime

  const isActive =
    detailItemId != undefined
    && activeDetailItem === detailItemId
    && !strict || activeDetail === detailId // for strict = false, the final check will always be true

  const styleList = [styles.detailItem, ...outerClasses]
  isActive && styleList.push(styles.detailItemActive);
  noHover && styleList.push(styles.noHover);


  function clickHandler() {
    setActiveDetailItem && setActiveDetailItem(detailItemId)
    activeDetail !== detailId && setActiveDetail && setActiveDetail(detailId)
  }

  return (
    <div
      onClick={clickHandler}
      className={concatStrings(styleList)}

    >
      {data}
    </div >
  );
}
