import { DialogTitle, Dialog, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import React from 'react'
import { ModalCloseIcon } from "./ModalCloseIcon";

export function ModalHeader({ title = "Modal Title", handleClose }) {
    return (
        <DialogTitle id={title}>
            {title}
            <ModalCloseIcon handleClose={handleClose || function () { }} />
        </DialogTitle>
    );
}

