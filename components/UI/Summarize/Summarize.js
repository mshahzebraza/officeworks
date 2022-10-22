import { Grid } from "@mui/material";
import { checkDataType, deepClone, replaceKeysMap, toSentenceCase } from "../../../helpers/reusable";
import { summarizer } from "../../../helpers/summarizer";
import { SummaryItemAoO, SummaryItemPrimary } from "./newSummaryItem";
import styles from './Summarize.module.scss'
// import { SummaryItem } from "./SummaryItem";

/**
 * Renders the pairs as Grids Elements for primary data types
 * In case an array of object is passed, the object must be viewed as a table
 * 
 * @param  {} data
 * @param  {} config
 * @param  {} viewRawData
 * 
 */

export function Summarize({
    data,
    config,
    viewRawData = false
}) {
    if (viewRawData) return renderRawData(data)
    if (!data) throw new Error('No Data received in Summarize!')
    if (!config) throw new Error('No configuration received in Summarize!')

    // data = deepClone(data);

    // deleteKeys(config.deleteKeys, dataCopy);
    // wrap the label & values in JSX. 
    // The type of wrapping JSX is decided based on the passed config props
    const resultEntries = Object.entries(data).map(([label, value], idx) => {
        // Also check if label needs to be renamed.
        const CustomSummaryItem = config.render[label] || config.render.default;

        // Delete if necessary and return null
        if (config.deleteKeys.includes(label)) return null;

        // Rename if necessary
        if (config.renameKeys[label]) label = config.renameKeys[label];

        // label = getRenamedLabelIfNecessary(config.renameKeys, label)
        return <CustomSummaryItem key={idx} label={label} value={value} />
    })

    // renameKeys(config.renameKeys, dataCopy);

    // return result;
    return <Grid container direction={'column'} gap={1} > {resultEntries}</Grid >

}

function renderRawData(data) {
    return <pre>
        {JSON.stringify(data, null, 2)}
    </pre>;
}

function getRenamedLabelIfNecessary(keysToRename, label) {
    // get the updatedLabel against the existing label
    const updatedLabel = keysToRename[label] || label
    return updatedLabel;
}

function renameKeys(keysToRename, data) {
    keysToRename.forEach(
        ([key, newKey]) => {
            if (!data.hasOwnProperty(key))
                return null;
            const temp = data[key];
            delete data[key];
            data[newKey] = temp;
        }
    );
}

function deleteKeys(keysToDelete, data) {
    keysToDelete.forEach(
        (key) => data.hasOwnProperty(key) && delete data[key]
    );
}