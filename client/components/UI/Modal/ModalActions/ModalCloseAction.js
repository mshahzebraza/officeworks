import { Button } from "@mui/material";

export function ModalCloseAction({ handleClose, ...closeProps }) {
    const { text, hidden, ...restCloseProps } = closeProps;
    if (!handleClose) return null;
    if (!!hidden) return null;
    return (
        <Button /* color="red" */ variant='contained' onClick={handleClose} {...restCloseProps} >
            {text || "Cancel"}
        </Button>);
}
