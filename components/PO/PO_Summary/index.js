// Dependency
import React from 'react';

// Store & Styles

// Components
import Modal from '../../UI/Modal';
import { Summarize } from '../../UI/Summarize/Summarize';
import { SummaryItem } from '../../UI/Summarize/newSummaryItem';
import { Grid } from '@mui/material'
import { isEmptyArray } from '../../../helpers/reusable';



export default function PO_Summary({
    open: isModalOpen,
    handleClose: modalCloser,
    data: poData,
    // the default config for PO-schema
    config = getDefaultPOsummaryConfig({ currency: poData?.currency }),
    viewRawData = false

}) {
    // ! Add the component logic here

    // console.log('poData', poData);
    if (!poData) return 'no data received ...';
    return (
        <Modal
            title='PO Summary'
            handleClose={modalCloser}
            open={isModalOpen}
            submitProps={{
                hidden: true
            }}
            closeProps={{
                text: 'Close'
            }}
        // contentProps={{ styles: { height: 500 } }}
        >
            <Summarize
                data={poData}
                config={config}
                viewRawData={viewRawData || !config}
            />

        </Modal>
    )
}

function getDefaultPOsummaryConfig({ currency }) {

    return ({
        // new config ... 
        deleteKeys: ['id', '_id', '__v', 'index', 'tableData', 'currency'],
        renameKeys: {
            refType: 'Reference Type',
            refId: 'Reference ID',
            category: 'PO Category',
            fulfillmentSource: 'Fulfillment Source',
            currency: 'Currency',
            totalCost: 'Total Cost',
            status: 'Status',
            initiatorId: 'Initiator ID',
            supplier: 'Supplier',
            items: 'Procured Modules',
            remarks: 'Remarks',
            id: 'ID',
        },
        render: {
            default: ({ label, value }) => <SummaryItem label={label} value={value} />,
            items: ({ label, value }) => {
                // prevents rendering of a separate row if no items are present
                if (isEmptyArray(value)) return null;

                return (<SummaryItem label={label} value={<SummaryItemValue_Items value={value} currency={currency} />} />)
            },
            status: ({ label, value }) => <SummaryItem label={label} value={`phase-${value}`} />,
            totalCost: ({ label, value }) => <SummaryItem label={label} value={`${currency} ${value}`} />,
        }
        // pullNested: []
    })
}

export const listOfModuleTypes = [
    { type: 'motor', id: 'J52SY350A' },
    { type: 'motor', id: 'J64SY700C' },
    { type: 'screw', id: 'M5x12' },
    { type: 'potentiometer', id: 'MSL-130-100-S-N' },
    { type: 'motor', id: 'Oipiisda-121' },
]


/**
 * check if the a certain partID belongs to a module-type and attaches the relevant module-type property to each of the module-data object in moduleDataCollection.
 * NOTE: Ensure that the common key between both the object is "id". Otherwise
 * @param  {[{}]} moduleDataCollection a data collection of several modules/items having the module-id field in them
 * @param  {[{}]} listOfModuleTypes a list of data against each id and its corresponding module type
 * @param  {[]} searchKeys [ dataModuleKey, dataTypeKey ] keys to be compared from both the data collection. Both are set to 'id' be default 
 * @example J64SY700C is a "Motor" Module-Type
 */
export function attachModuleTypes(moduleDataCollection, listOfModuleTypes, searchKeys = ['id', 'id']) {
    const [searchKeyForData, searchKeyForType] = searchKeys;
    return moduleDataCollection.map(
        (moduleData) => {
            // find the module whose id is stored in the listOfModuleTypes
            const matchingModule = listOfModuleTypes.find(
                ({ [searchKeyForType]: moduleId }) => moduleId === moduleData[searchKeyForData]
            );
            // add a type property to moduleData based on the matching id's moduleType in listOfModuleTypes
            // set a default value if matchingModule is not found
            moduleData.type = matchingModule?.type ?? 'No Type Found'; // 
            return moduleData;
        }
    );
}
/**
 * Renders the JSX for nested fields of "Items" field in a table format
 * @param  {[{}]} value list of Items containing the properties like item's Id, item's qty etc.
 * @param  {string} currency the currency in which PO was issued. This is to append the unitPrices of items with the currency
 */
function SummaryItemValue_Items({ value: listOfItems, currency }) {
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
        type: {
            span: 2,
            label: 'Type'
        },
        unitPrice: {
            span: 2,
            label: 'Unit Price',
            transformer: (price) => `${currency} ${price}`
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
