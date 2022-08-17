import React from 'react'
import styles from './Modal.module.scss'
import Image from 'next/image'
import { Grid, Typography, Button, Modal, Tooltip, IconButton, Divider } from '@mui/material';
import { Close } from '@mui/icons-material';

const containerStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function ModalContainer({ children }) {
    return (
        <Grid
            onClick={(e) => e.stopPropagation()}
            container
            wrap='nowrap'
            gap={2}
            sx={containerStyles}
            direction='column'
        >
            {children}
        </Grid>
    );
}

const headerStyles = { /* border: '1px dashed green' */ pl: 1 };
function ModalHeader({ children }) {
    return (
        <Grid
            item xs
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={headerStyles}
            as="header"
        > {children}</Grid>
    );

}

function ModalTitle({ title = 'Modal Title' }) {
    return (<Grid item>
        <Typography id="modal-modal-title" variant="h5" component="h2">
            {title}
        </Typography>
    </Grid>);
}

function ModalCloseBtn(props) {
    return (
        <Grid item>
            <Tooltip title="Close">
                <IconButton aria-label="close-modal" onClick={props.closer} size="small" variant='contained' >
                    <Close sx={{ color: '#000' }} fontSize="inherit" />
                </IconButton>
            </Tooltip>
        </Grid>);
}


const bodyStyles = { height: 600, "overflow-y": 'auto', p: 1, pr: 2 };
function ModalBody({ children }) {
    return (
        <Grid
            item xs={12}
            container
            sx={bodyStyles}
            as="main"
        >{children}</Grid>
    );
}




export default function BasicModal({ title, closer, children }) {
    return (
        <Modal
            // open={open}
            open
            onClose={closer}
            aria-labelledby={title}
        >
            <ModalContainer>
                {/* Modal Header */}
                <ModalHeader>
                    {/* Modal Title */}
                    <ModalTitle title={title} />
                    {/* Modal Button */}
                    <ModalCloseBtn closer={closer} />
                </ModalHeader>

                {/* Divider */}
                <Divider />

                {/* Modal Body */}
                <ModalBody>
                    {/* Box */}
                    {children}
                </ModalBody>
            </ModalContainer>

        </Modal>
    )
}
