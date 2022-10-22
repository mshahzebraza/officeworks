// Dependency
import React from 'react';

// Store & Styles

// Components
import Modal from '../../UI/Modal';
import { Summarize } from '../../UI/Summarize/Summarize';
import { SummaryItem } from '../../UI/Summarize/newSummaryItem';
import { Grid } from '@mui/material'


export default function PO_Summary({
    open: isModalOpen,
    handleClose: modalCloser,
    data: poData,
    config = {
        // toFetch: [['items', 'item']],
        // new config ... 
        deleteKeys: ['id', '_id', '__v', 'index', 'tableData'],
        // renameKeys: [['refId', 'referenceID'], ['category', 'PO Category'], ['items', 'Modules Procured']],
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
            items: ({ label, value }) => <SummaryItem label={label} value={<SummaryItemValue_Items value={value} />} />,
            status: ({ label, value }) => <SummaryItem label={label} value={`phase-${value}`} />,
        }
        // pullNested: []
    }

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
        >
            <Summarize
                data={poData}
                config={config}
            // viewRawData
            />

        </Modal>
    )
}

export function SummaryItemValue_Items({ value: AoOdata }) {
    const dataHeaders = Object.keys(AoOdata[0])
    const propertyConfig = {
        id: {
            span: 2,
            label: 'ID'
        },
        qty: {
            span: 2,
            label: 'Quantity'
        },
        unitPrice: {
            span: 2,
            label: 'Unit Price',
            render: (price) => `${price}/- XXX`
        },
        remarks: {
            span: 6,
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
                AoOdata.map((object, idx) => {
                    const dataEntries = Object.entries(object)
                    return (
                        <Grid
                            key={'AoOdata' + idx} item xs={12} container
                        >
                            {
                                dataEntries.map(([dataKey, dataValue], idx) => {
                                    const entryConfig = propertyConfig[dataKey];
                                    const entryWidth = entryConfig?.span || 2
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