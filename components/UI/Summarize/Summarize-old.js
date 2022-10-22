import { Grid } from "@mui/material";
import { checkDataType, deepClone, replaceKeysMap, toSentenceCase } from "../../../helpers/reusable";
import { summarizer } from "../../../helpers/summarizer";
import styles from './Summarize.module.scss'
import { SummaryItem } from "./SummaryItem";

/**
 * Renders the pairs as Grids Elements for primary data types
 * In case an array of object is passed, the object must be viewed as a table
 * @param {*} param0 
 * @returns 
 */
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

    const mockData = {
        id: 'hello my id',
        unrelated: 'adskodao adosk a',
        source: 'foreign',
        // items: [
        //     { id: 'J64SY700C', qty: 25, unitPrice: 400, currency: 'USD' }
        // ]
    }
    const mockConfig = {
        renameKeys: [['id', 'Product ID']],
        deleteKeys: ['unrelated'],
        // concatenatePrimary: [],
        // renderCustomComponents: [
        //     ['items', customJsxForItems]
        // ]
    }

    // const summarizedData = summarizerNew2(
    //     {
    //         data: deepClone(dummyConfig.data),
    //         options: {
    //             replaceKeys: dummyConfig.viewConfig.updatePropertyLabels, //? keyName "items" must be changed to itemName 
    //             deleteKeys: dummyConfig.viewConfig.deleteProperties,
    //             array: {
    //                 categorizeKeys: [],
    //                 concatenateKeys: []
    //             },
    //             nestedArrayOfObjects: dataKeyOptions.toFetch
    //         }

    //     }
    // )

    // console.log('summarizedData: ', summarizedData)
    const PrimaryDataSummaryItem = ({ label, value }) => (
        <Grid container>
            <Grid item xs={4}>{label}</Grid>
            <Grid item xs={8}>{value}</Grid>
        </Grid>
    )

    const summaryItemHandlers = {
        primary: PrimaryDataSummaryItem
    }

    const summarizedDataArr = summarizer({
        data: mockData,
        renderConfig: mockConfig,
        viewRawData: false
    })
    return (
        summarizedDataArr.map(dataSet => {
            const { label, value, type = "primary" } = dataSet
            const SummaryItemJSX = summaryItemHandlers[type];

            return (<SummaryItemJSX label={label} value={value} />)
        })
    )

    return (
        <pre>
            {JSON.stringify(summarizer(), null, 2)}
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

