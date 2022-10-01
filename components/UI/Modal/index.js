import React from "react";
import { Dialog } from "@mui/material";
import { ModalHeader } from "./ModalHeader";
import { ModalContent } from "./ModalContent";
import { ModalActions } from "./ModalActions";

export default function Modal({
    title,
    description,
    children,

    open = true,
    handleClose,
    handleSubmit,
    closeProps,
    submitProps
}) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby={title}
            fullWidth={true}
            maxWidth={'md'}
        >
            <ModalHeader handleClose={handleClose} title={title} />

            <ModalContent description={description} children={children} />

            <ModalActions
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                closeProps={closeProps}
                submitProps={submitProps}
            />

        </Dialog>


    );
}
