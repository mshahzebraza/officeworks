import React from "react";
import { Dialog } from "@mui/material";
import { ModalHeader } from "./ModalHeader";
import { ModalContent } from "./ModalContent";
import { ModalActions } from "./ModalActions";
/**
 * @param  {} title
 * @param  {} description
 * @param  {JSX.Element} children
 * @param  {} open=true
 * @param  {} handleClose
 * @param  {} handleSubmit
 * @param  {} closeProps
 * @param  {} submitProps
 * @param  {Boolean} [hideActions=true] - set to FALSE if component is rendered in ModalContent-children (i.e. if access to formik Props is needed)
 */

export default function Modal({
    title,
    description,
    children,

    open = true,
    handleClose,
    handleSubmit,
    closeProps,
    submitProps,
    hideActions = false
}) {


    // ! Modal-Component is not re-rendered on each formikState change. Only the contents (Formik.Form) is re-rendered on form-state-change
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby={title}
            fullWidth={true}
            maxWidth={'md'}
        >
            <ModalHeader
                handleClose={handleClose}
                title={title}
            />

            <ModalContent
                description={description}
                children={children}
            />

            <ModalActions
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                closeProps={closeProps}
                submitProps={submitProps}
                hide={hideActions}
            />

        </Dialog>


    );
}
