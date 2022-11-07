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
 * @param  {} closeProps - { text, hidden, ...buttonProps }
 * @param  {} submitProps
 * @param  {} contentProps Props for Modal-Content
 * @param  {Boolean} [hideActions=true] - set to FALSE if component is rendered in ModalContent-children (i.e. if access to formik Props is needed)
 * @param  {string} maxWidth set the width of the dialog
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
    contentProps = {},
    hideActions = false,
    maxWidth = 'md',
}) {


    // ! Modal-Component is not re-rendered on each formikState change. Only the contents (Formik.Form) is re-rendered on form-state-change
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby={title}
            fullWidth={true}
            maxWidth={maxWidth}
        >
            <ModalHeader
                handleClose={handleClose}
                title={title}
            />

            <ModalContent
                description={description}
                children={children}
                contentProps={contentProps}
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
