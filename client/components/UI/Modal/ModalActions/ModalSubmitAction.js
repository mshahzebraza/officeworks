import { Button } from "@mui/material";

/**
 * @param  {Boolean} submitProps.hidden - in case the submit button is not needed
 * @param  {Boolean} submitProps.form - to connect the submit button with the form - use if submit button is not inside the form
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
