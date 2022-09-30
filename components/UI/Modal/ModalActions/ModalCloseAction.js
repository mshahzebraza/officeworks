import { Button } from "@mui/material";

export function ModalCloseAction({ handleClose }) {
    if (!handleClose) return null;
    return (
        <Button color="primary" variant='contained' onClick={handleClose}>
            Cancel
        </Button>);
}
