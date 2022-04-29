import { checkDataType, deepClone, replaceKeysMap, summarizer, summarizerNew2, toSentenceCase } from "../../../helpers/reusable";
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
          //? if true, will use SummaryItem as a child. Use When custom entries are required
          CustomSummaryItem = SummaryItem,
          //? Only pass the keys which are available in the data. 
          dataKeyOptions = {
               //? Will not show in the final Summary Modal
               toDelete: [], // array of strings // ['keyToDelete'] 
               //? Any nested Keys from AoOs to be categorized and shown in the final Summary Modal
               toFetch: [], // array of array of strings // [['objKey', 'nestedKeyToFetch']]
               //? to Replace keys with new ones in the final Summary Modal
               toUpdate: [] // array of array of strings // [['keyToUpdate', 'replacementValue']]
          }
     }
) {


     data = summarizerNew2(
          deepClone(data),
          {
               replaceKeys: dataKeyOptions.toUpdate, //? keyName "linkedModules" must be changed to itemName 
               deleteKeys: dataKeyOptions.toDelete,
               array: {
                    categorizeKeys: [],
                    concatenateKeys: []
               },
               nestedArrayOfObjects: dataKeyOptions.toFetch
          }
     )


     return (<div className={styles.body}>
          {
               Object.entries(data)
                    .map(
                         ([itemField, itemValue], index) => {
                              return (
                                   <CustomSummaryItem
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

