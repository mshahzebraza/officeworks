// Dependency
import React from 'react'

// Components
import Modal from '../../UI/Modal';
import { Summarizer } from '../../UI/Summarizer';
import { getMWOsummaryConfig } from './summaryConfig';

export default function MWO_Summary({
    open: isModalOpen,
    handleClose: modalCloser,
    data: mwoData,
    config = getMWOsummaryConfig(),
    viewRawData = false
}) {
    if (!mwoData) return 'no data received ...';
    return (
        <Modal
            title='MWO Summary'
            handleClose={modalCloser}
            open={isModalOpen}
            submitProps={{ hidden: true }}
            closeProps={{ text: 'Close' }}
        >
            <Summarizer
                data={mwoData}
                config={config}
                viewRawData={viewRawData || !config}
            />
        </Modal>
    )
}