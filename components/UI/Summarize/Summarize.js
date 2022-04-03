import { checkDataType, deepClone, replaceKeysMap, summarizer, toSentenceCase } from "../../../helpers/reusable";
import DetailItem from "../../Detail&Summary/DetailItem";
import styles from './Summarize.module.scss'


// to render item: {qty,item} structures
function RepeatedItemJSX({ item }) {
     if (!item) return <span>No items</span>;
     return (<li className={styles.dataItem}>
          <span className={styles.dataItemQty}> {item.qty} </span>
          <span className={styles.dataItemType}>{item.item}</span>
     </li>);
}

function SummaryItem({ field = 'noField', value = 'noValue', isList = false }) {

     // Check for List (Array)
     if (isList) {
          if (value?.length > 0) {
               value = value.map(
                    (item, idx) =>
                         <RepeatedItemJSX
                              key={idx}
                              item={item}
                         />
               )
          } else {
               value = <RepeatedItemJSX />
          }
     }

     // Check for empty strings
     value = value === '' ? '---' : value;



     return (
          <DetailItem>

               <div className={styles.data}>
                    {/* Place Keys in span */}
                    <span className={styles.dataField}>{field}:</span>
                    {
                         // Check for list items
                         !isList
                              // Place strings in span
                              ? <span className={styles.dataValue}>{value}</span>
                              // Place list items in ul
                              : <ul className={styles.dataValue}>{value}</ul>
                    }
               </div>
          </DetailItem>
     );
}

export function Summarize(
     {
          data,
          OwnSummaryItem = SummaryItem, // if true, will use SummaryItem as a child. Use When custom entries are required
          dataKeyOptions = {
               toDelete: false, // array of strings // ['keyToDelete'] // TODO: Improve to delete nested data later
               toFetch: false, // array of array of strings // [['objKey', 'nestedKeyToFetch']]
               toUpdate: false // array of array of strings // [['keyToUpdate', 'replacementValue']]
          }
     }
) {


     // ? Convert obj to array of arrays
     data = summarizer(
          deepClone(data), // ? not to mutate the original data object (passed in as a state sometimes)
          false,
          // ? Fetch Nested Data keys using dataKeyOptions 
          dataKeyOptions.toFetch ? dataKeyOptions.toFetch : false,
          // ? Delete Main Data Keys using dataKeyOptions
          dataKeyOptions.toDelete ? dataKeyOptions.toDelete : false
     )

     // ? Update Name of Main Keys to a different name using dataKeyOptions
     if (dataKeyOptions?.toUpdate) {
          data = replaceKeysMap(
               data,
               dataKeyOptions.toUpdate
          )
     }



     return (<div className={styles.body}>
          {
               data
                    .map(
                         ([itemField, itemValue], index) => {
                              return (
                                   <OwnSummaryItem
                                        key={index}
                                        field={toSentenceCase(itemField)}
                                        value={itemValue}
                                        isList={checkDataType(itemValue) === 'array'}
                                   />
                              )
                         }
                    )
          }

     </div>);
}

