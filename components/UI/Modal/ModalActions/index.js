import { Button, DialogActions } from "@mui/material";
import { ModalSubmitAction } from "./ModalSubmitAction";
import { ModalCloseAction } from "./ModalCloseAction";

const modalActionStyles = {
    px: 3,
    py: 2,
}
/**
 * @param  {} handleClose
 * @param  {} handleSubmit
 * @param  {} submitProps={}
 * @param  {} closeProps={}
 * @param  {Boolean} [hide=false] - returns null if hide is TRUTHY
 */

export function ModalActions({
    handleClose,
    handleSubmit,
    submitProps = {},
    closeProps = {},
    hide = false,
}) {

    if (hide) return null
    return (
        <DialogActions sx={modalActionStyles} >
            <ModalCloseAction handleClose={handleClose} {...closeProps} />
            <ModalSubmitAction handleSubmit={handleSubmit} {...submitProps} />
        </DialogActions>
    );
}
