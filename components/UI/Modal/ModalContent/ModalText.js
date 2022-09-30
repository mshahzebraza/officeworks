import { DialogContentText } from "@mui/material";

export function ModalText({ description }) {
    if (!description) return null

    return (
        <DialogContentText>
            {description}
            { /* {Array(100).fill('Dialog Text').map((el, idx) => <li key={idx}>{el}</li>)} */}
        </DialogContentText>);
}
