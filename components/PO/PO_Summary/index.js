// Dependency
import React from 'react'

// Store & Styles

// Components
import Portal from '../../UI/Portal'
import Modal from '../../UI/Modal'
import { Summarize } from '../../UI/Summarize/Summarize'


export default function PO_Summary({ closer, poData }) {

    // console.log('poData', poData);
    if (!poData) return 'no data received ...';
    return (
        <Portal>
            <Modal
                title='PO Detail'
                closer={closer}
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
        </Portal>
    )
}




