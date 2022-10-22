import { checkDataType, deepClone, replaceKeysMap, summarizer, summarizerNew2, toSentenceCase } from "../../../helpers/reusable";
import styles from './Summarize.module.scss'
import { SummaryItem } from "./SummaryItem";


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

    return (
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    )

    // return (
    //     <div className={styles.body}>
    //         <CustomSummaryItem
    //             key={1}
    //             field={toSentenceCase('itemField')}
    //             value={'itemValue'}
    //             isList={true}
    //         />
    //     </div>
    // )

    data = summarizerNew2(
        deepClone(data),
        {
            replaceKeys: dataKeyOptions.toUpdate, //? keyName "items" must be changed to itemName 
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

