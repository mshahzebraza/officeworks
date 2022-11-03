// Dependency
import React from 'react';

// Store & Styles

// Components
import Modal from '../../UI/Modal';
import { Summarize } from '../../UI/Summarize/Summarize';
import { getPOsummaryConfig } from './summaryConfig';



export default function PO_Summary({
    open: isModalOpen,
    handleClose: modalCloser,
    data: poData,
    // the default config for PO-schema
    config = getPOsummaryConfig({ currency: poData?.currency }),
    viewRawData = false
}) {
    // ! Add the component logic here

    // console.log('poData', poData);
    if (!poData) return 'no data received ...';
    console.log('data in po summary: ', poData)
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
