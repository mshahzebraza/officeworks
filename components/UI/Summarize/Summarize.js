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
    // const customComponents = {
    //     items: <CustomRenderComponentForItems/>
    // }
    const summarizedDataArr = summarizer({
        data: mockData,
        renderConfig: mockConfig,
        // viewRawData: false
    })

    return (
        summarizedDataArr.map((dataSet, idx) => {
            const { label, value, type } = dataSet
            // check the type of value
            const SummaryItemJSX = summaryItemHandlers[type];
            return (<PrimaryDataSummaryItem label={label} value={value} key={idx} />)
        })
    )
}

const summaryItemHandlers = {
    string: PrimaryDataSummaryItem,
    number: PrimaryDataSummaryItem,
    arrayOfObjects: AoODataSummaryItem
    // object:
    // arrayOfObjects:
    // arrayOfStrings:
    // arrayOfNumbers:

}
// console.log('summarizedData: ', summarizedData)
function PrimaryDataSummaryItem({ label, value, ...rest }) {
    return (
        <Grid container {...rest}>
            <Grid item xs={4}>{label}</Grid>
            <Grid item xs={8}>{value}</Grid>
        </Grid>
    )
}
function AoODataSummaryItem({ label, value: AoOdata }) {
    return (
        <Grid container >
            <Grid item xs={4} >{label}</Grid>
            <Grid item xs={12} container >
                <Grid item xs={2}>Type</Grid>
                <Grid item xs={2}>ID</Grid>
                <Grid item xs={2}>Price</Grid>
                <Grid item xs={6}>Remarks</Grid>
            </Grid>
            {
                AoOdata.map(object => {
                    return (
                        <Grid item xs={12} container >
                            <Grid item xs={2}>Type</Grid>
                            <Grid item xs={2}>ID</Grid>
                            <Grid item xs={2}>Price</Grid>
                            <Grid item xs={6}>Remarks</Grid>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}
