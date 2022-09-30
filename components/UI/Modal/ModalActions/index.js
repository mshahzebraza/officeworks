import { Button, DialogActions } from "@mui/material";
import { ModalSubmitAction } from "./ModalSubmitAction";
import { ModalCloseAction } from "./ModalCloseAction";

export function ModalActions({
    handleClose,
    handleSubmit,
    submitProps = {},
}) {
    return (
        <DialogActions>
            <ModalCloseAction handleClose={handleClose} />
            <ModalSubmitAction handleSubmit={handleSubmit} submitProps={submitProps} />
        </DialogActions>
    );
}

{/* <FormikSubmit disabled={(!isValid || !dirty || isSubmitting)} >
    {
        isValid ?
            dirty
                ? `Submit ${isNewSubmission ? '(Add)' : '(Update)'}`
                : 'No edits made'
            : 'Incomplete/Invalid Data'
    }
</FormikSubmit> */}