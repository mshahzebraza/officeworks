import { Grid } from "@mui/material";
import { listOfModuleTypes } from "../../../constants/listOfModuleTypes";
import { isEmptyArray } from "../../../../helpers/reusable";
import { attachModuleTypes } from "../../../../helpers/specific";
import { SummaryRow } from "../../UI/Summarize/summaryRow";

export function getMWOsummaryConfig() {

    return ({
        // new config ... 
        deleteKeys: ['id', '_id', '__v', 'index', 'tableData',],
        renameKeys: {
            mwoType: 'MWO Type',
            mwoId: 'MWO ID',
            title: 'MWO Title/Description',
            status: 'Status',
            initiatorId: 'Initiator ID',
            items: 'Ordered Modules',
            remarks: 'Remarks',
        },
        render: {
            default: ({ label, value }) => <SummaryRow label={label} value={value} />,
            items: ({ label, value }) => {
                // prevents rendering of a separate row if no items are present
                if (isEmptyArray(value)) return null;

                return (<SummaryRow label={label} value={<SummaryRow_ItemField value={value} />} />)
            },
            status: ({ label, value }) => <SummaryRow label={label} value={`phase-${value}`} />,
        }
        // pullNested: []
    })
}

/**
 * Renders the JSX for nested fields of "Items" field in a table format
 * @param  {[{}]} value list of Items containing the properties like item's Id, item's qty etc.
 * @param  {string} currency the currency in which PO was issued. This is to append the unitPrices of items with the currency
 */
function SummaryRow_ItemField({ value: listOfItems }) {
    // adds the "type" property to the summary-object ("listOfItems")
    listOfItems = attachModuleTypes(listOfItems, listOfModuleTypes)
    // fetches the keys of item properties to be used as header in the table rendered in summary
    const dataHeaders = Object.keys(listOfItems[0])
    const propertyConfig = {
        id: {
            span: 2,
            label: 'ID'
        },
        qty: {
            span: 2,
            label: 'Quantity'
        },
        // module-type: added using attachModuleType
        type: {
            span: 2,
            label: 'Type'
        },
        remarks: {
            span: 4,
            label: 'Remarks'
        },
    }

    return (
        <>
            {/* Header */}
            <Grid item xs={12} container >
                {
                    dataHeaders.map((dataHeader, idx) => {
                        const headerConfig = propertyConfig[dataHeader];
                        const headerWidth = headerConfig?.span || 2
                        return (
                            <Grid
                                key={idx} item xs={headerWidth}
                                sx={{ p: 1, border: '1px dashed black', fontWeight: 600 }}
                            >
                                {headerConfig?.label || dataHeader}
                            </Grid>
                        )
                    })
                }
            </Grid>
            {/* Body */}
            {
                listOfItems.map((object, idx) => {
                    const dataEntries = Object.entries(object)
                    return (
                        <Grid
                            key={'listOfItems' + idx} item xs={12} container
                        >
                            {
                                dataEntries.map(([dataKey, dataValue], idx) => {
                                    const entryConfig = propertyConfig[dataKey];
                                    const entryWidth = entryConfig?.span || 2
                                    const entryTransformer = entryConfig?.transformer
                                    if (entryTransformer) dataValue = entryTransformer(dataValue)

                                    return (
                                        <Grid key={idx} item xs={entryWidth}
                                            sx={{ p: 1, border: '1px dashed black' }}
                                        >
                                            {dataValue}
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    )
                })
            }
        </>
    )
}
