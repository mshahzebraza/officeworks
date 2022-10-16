// Dependency
import React from 'react';

// Store & Styles

// Components
import Modal from '../../UI/Modal';
import { Summarize } from '../../UI/Summarize/Summarize';


export default function PO_Summary({ open: isModalOpen, handleClose: modalCloser, data: poData }) {

    // console.log('poData', poData);
    if (!poData) return 'no data received ...';
    return (
        <Modal
            title='PO Detail'
            handleClose={modalCloser}
            open={isModalOpen}
            submitProps={{
                hidden: true
            }}
        >
            <Summarize
                data={poData}
                dataKeyOptions={{
                    toDelete: ['_id', '__v', 'index', 'tableData'],
                    toFetch: [['items', 'item']],
                    toUpdate: [['refId', 'referenceID'], ['category', 'PO Category'], ['items', 'Modules Procured']]
                }}
            />

        </Modal>
    )
}




