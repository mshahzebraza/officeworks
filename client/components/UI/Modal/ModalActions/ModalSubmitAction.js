import { Button } from "@mui/material";

/**
 * @param  {Boolean} submitProps.hidden - in case the submit button is not needed
 */

export function ModalSubmitAction({ handleSubmit, ...submitProps }) {
    const { text = 'Submit', hidden, ...restSubmitProps } = submitProps;
    if (!!hidden) return null;
    return (
        <Button
            type='submit'
            variant='contained'
            color="primary"
            onClick={handleSubmit}
            {...restSubmitProps}
        >
            {text}
        </Button>
    );
}
