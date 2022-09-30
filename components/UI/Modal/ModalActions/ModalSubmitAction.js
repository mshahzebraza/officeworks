import { Button } from "@mui/material";

export function ModalSubmitAction({ handleSubmit, ...submitProps }) {
    if (!handleSubmit) return null;
    return (
        <Button variant='contained' color="primary" onClick={handleSubmit} {...submitProps}>
            Submit
        </Button>
    );
}
