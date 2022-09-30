import { DialogContent } from "@mui/material";
import { ModalText } from "./ModalText";


export function ModalContent({ description, children }) {
    return (
        <DialogContent dividers={true}>
            <ModalText description={description} />
            {/* <CustomComponent /> */}
            {children}
        </DialogContent>);
}