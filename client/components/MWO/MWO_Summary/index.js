// Dependency
import React from 'react'

// Store & Styles

// Components
import Modal from '../../UI/Modal';
import { Summarize } from '../../Dialogs/Summary_Dialog';
import { getMWOsummaryConfig } from './summaryConfig';


export default function MWO_Summary({
    open: isModalOpen,
    handleClose: modalCloser,
    data: mwoData,
    config = getMWOsummaryConfig(),
    viewRawData = false
}) {
    if (!mwoData) return 'no data received ...';
    console.log('data in mwo summary: ', mwoData)
    return (
        <Modal
            title='MWO Summary'
            handleClose={modalCloser}
            open={isModalOpen}
            submitProps={{ hidden: true }}
            closeProps={{ text: 'Close' }}
        >
            <Summarize
                data={mwoData}
                config={config}
                viewRawData={viewRawData || !config}
            />
        </Modal>
    )
}