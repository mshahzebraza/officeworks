import { Grid } from "@mui/material";
import { renderRawData } from "../../../helpers/reusable";

/**
 * Renders the pairs as Grids Elements for primary data types
 * In case an array of object is passed, the object must be viewed as a table
 * 
 * @param  {} data
 * @param  {} config
 * @param  {} viewRawData
 * 
 */

export function SummaryDialog({
    data,
    config,
    viewRawData = false
}) {
    if (viewRawData) return renderRawData(data)
    if (!data) throw new Error('No Data received in Summarize!')
    if (!config) throw new Error('No configuration received in Summarize!')

    // wrap the label & values in JSX. 
    // The type of wrapping JSX is decided based on the passed config props
    const resultEntries = Object.entries(data).map(([label, value], idx) => {
        // Also check if label needs to be renamed.
        const CurrentSummaryItem = config.render[label] || config.render.default;

        // Delete if necessary and return null
        if (config.deleteKeys.includes(label)) return null;

        // Rename if necessary
        if (config.renameKeys[label]) label = config.renameKeys[label];

        // label = getRenamedLabelIfNecessary(config.renameKeys, label)
        return <CurrentSummaryItem key={idx} label={label} value={value} />
    })


    // return result;
    return <Grid container direction={'column'} gap={1} > {resultEntries}</Grid >

}
