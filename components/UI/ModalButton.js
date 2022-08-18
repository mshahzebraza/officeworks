import React from 'react'
import { useState } from 'react';
import { Button, Tooltip } from '@mui/material'

function ModalButton({ caption = 'Show Modal', ModalComponent, outerClasses = [], tooltip = '', disabled = false, children, ...rest }) {


    const [modalState, setModalState] = useState(false)
    return (
        <>
            {/* 
            <Button
                outerClasses={outerClasses}
                click={() => setModalState(true)}
                caption={caption && caption}
                tooltip={tooltip}
                disabled={disabled}
            >
                {children}
            </Button> */}

            <Tooltip title={tooltip || caption}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setModalState(true)}
                    disabled={disabled}
                >
                    {children || caption}

                </Button>
            </Tooltip>

            {modalState && <ModalComponent {...rest} closer={() => setModalState(false)} />}


        </>
    )
}

export default ModalButton
