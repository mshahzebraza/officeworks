import React from "react";
import { Dialog } from "@mui/material";
import { ModalHeader } from "./ModalHeader";
import { ModalContent } from "./ModalContent";
import { ModalActions } from "./ModalActions";

export default function Modal({
    title,
    description,
    closer,
    submit,
    children,
    // handleClose,
    // open=false
}) {
    return (
        <Dialog
            open/* ={open} */
            onClose={closer}
            aria-labelledby={title}
            fullWidth={true}
            maxWidth={'md'}
        >

            <ModalHeader handleClose={closer} title={title} />

            <ModalContent description={description} children={children} />

            <ModalActions handleClose={closer} handleSubmit={submit} />

        </Dialog>


    );
}
