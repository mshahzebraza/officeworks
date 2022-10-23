import { Grid } from "@mui/material";
import { arrayOfObjectsSummarize } from "./arrayOfObjectsSummarize";
import { arraySummarize } from "./arraySummarize";
import { checkArrType } from "./checkArrType";
import { checkObjType } from "./checkObjType";
import { checkDataType } from "./checkDataType";
import { isArray, isObject, isArrayOfStrings, isArrayOfObjects, isEmptyArray, deepClone } from "./reusable";


/**
 *
 *
 * @param {{}} data
 * @param {{}} renderConfig - this should contain the info about deletion, renaming, customRendering of values
 * @returns {}
 */


/* 
Must return the label, value, and type of each data-set.
And ensure that all of the values in the AoO must be of primary data-type
 */
export function summarizer({
    data = false,
    config = false,
}) {
    if (!data) throw new Error('No Data received in summarizer!')
    if (!config) throw new Error('No configuration received in summarizer!')
    let dataCopy = deepClone(data);

    deleteKeys(config.deleteKeys, dataCopy);
    // wrap the label & values in JSX. 
    // The type of wrapping JSX is decided based on the passed config props
    dataCopy = Object.entries(data).map(([label, value], idx) => {
        const CustomSummaryItem = config.render[label] || config.render.default;
        return <CustomSummaryItem key={idx} label={label} value={value} />
    })

    renameKeys(config.renameKeys, dataCopy);

    return result

}



function getAdvDataType(data) {
    let type = checkDataType(data);

    if (type === 'string' || type === 'number') type = 'Primary'

    // type = 'arrayOfObjects'
    if (type === 'array' && checkArrType(data) === 'object') {
        // check if every AoO object's property is of primary data type
        const isAoOofPrimary = data.every(dataObj => {
            const objType = checkObjType(dataObj)
            return objType === 'string' || 'number'
        })
        if (isAoOofPrimary) type = 'AoOofPrimary'
    }

    if (type === 'array' && checkArrType(data) !== 'array') {
        type = checkArrType(data)
    }

    return type;
}



/**
 * Received:
 * {
 *  id: "myStringName",
 *  colData: {
 *      name: 'someName'
 *  },
 *  arrColData: [
 *      {name:'anna',qty:12},
 *      {name:'eros',qty:11},
 *  ]
 * }
 * 
 * Result:
 * [
 *  {type:'string', label:'id', value: 'myStringName' },
 *  {type:'object', label:'colData', value: {name: 'someName'} },
 *  {type:'arrayOfObjects', label:'arrColData', value: [{name:'anna',qty:12},{name:'eros',qty:11},] },
 * ]
 */