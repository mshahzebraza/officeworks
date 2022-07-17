import React from 'react'
import { useState } from 'react';
import Button from './Button';

function ModalButton({ caption = 'Show Modal', ModalComponent, outerClasses = [], tooltip = '', disabled, children, ...rest }) {


    const [modalState, setModalState] = useState(false)
    return (
        <>
            <Button
                outerClasses={outerClasses}
                click={() => setModalState(true)}
                caption={caption && caption}
                tooltip={tooltip}
                disabled={disabled}
            >
                {children}
            </Button>

            {modalState && <ModalComponent {...rest} closer={() => setModalState(false)} />}

        </>
    )
}

export default ModalButton
