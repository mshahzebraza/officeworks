// Dependency
import React from 'react'

// Store & Styles

// Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'
import { Summarize } from '../../UI/Summarize/Summarize'


export default function PO_Summary({ open, closer: modalCloser, poData }) {

    // console.log('poData', poData);
    if (!poData) return 'no data received ...';
    return (
        <Modal
            title='PO Detail'
            closer={modalCloser}
            handleClose={modalCloser}
            open={open}
            submitProps={{
                hidden: true
            }}
        >
            <Summarize
                data={poData}
                dataKeyOptions={{
                    toDelete: ['_id', '__v', 'index', 'tableData'],
                    toFetch: [['linkedModules', 'item']],
                    toUpdate: [['refId', 'referenceID'], ['category', 'PO Category'], ['linkedModules', 'Modules Procured']]
                }}
            />

        </Modal>
    )
}




