// Dependency
import React from 'react'

// Store & Styles

// Components
import Modal from '../../UI/Modal';
import { Summarize } from '../../UI/Summarize/Summarize';


export default function MWO_Summary({ open: isModalOpen, handleClose: modalCloser, data: mwoData }) {

    return (
        <Modal
            title='MWO Summary'
            handleClose={modalCloser}
            open={isModalOpen}
            submitProps={{
                hidden: true
            }}
        >
            <Summarize
                data={mwoData}
                dataKeyOptions={{
                    toDelete: ['_id', '__v', 'index'],
                    toFetch: [['linkedModules', 'item']],
                    toUpdate: [['mwoId', 'MWO ID'], ['linkedModules', 'Modules Ordered']]
                }}
            />
        </Modal>
    )
}