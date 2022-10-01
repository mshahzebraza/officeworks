import { Button } from "@mui/material";

export function ModalSubmitAction({ handleSubmit, ...submitProps }) {
    const { text = 'Submit', hidden, ...restSubmitProps } = submitProps;
    if (!!hidden) return null;
    // if (!handleSubmit) return null;
    return (
        <Button type='submit' variant='contained' color="primary" onClick={handleSubmit} {...restSubmitProps}>
            {text}
        </Button>
    );
}
