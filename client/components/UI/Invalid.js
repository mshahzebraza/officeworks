// Dependency
import React from 'react'

// Store & Styles

// Components
import Portal from '../UI/Portal'
import Modal from '../UI/Modal'


export default function InvalidModal({ closer, invalidReason }) {

    return (
        <Portal>
            <Modal
                title={`Invalid Action`}
                closer={closer}
            >
                <div>
                    Can't continue:
                    <p>{invalidReason}</p>
                </div>
            </Modal>
        </Portal>
    )
}

