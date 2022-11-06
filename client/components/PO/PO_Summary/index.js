// Dependency
import React from 'react';

// Store & Styles

// Components
import Modal from '../../UI/Modal';
import { Summarizer } from '../../UI/Summarizer';
import { getPOsummaryConfig } from './summaryConfig';



export default function PO_Summary({
    open: isModalOpen,
    handleClose: modalCloser,
    data: poData,
    // the default config for PO-schema
    config = getPOsummaryConfig({ currency: poData?.currency }),
    viewRawData = false
}) {
    if (!poData) return 'no data received ...';
    return (
        <Modal
            title='PO Summary'
            handleClose={modalCloser}
            open={isModalOpen}
            submitProps={{ hidden: true }}
            closeProps={{ text: 'Close' }}
        >
            <Summarizer
                data={poData}
                config={config}
                viewRawData={viewRawData || !config}
            />
        </Modal>
    )
}
