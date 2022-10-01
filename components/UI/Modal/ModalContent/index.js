import { DialogContent } from "@mui/material";
import { ModalText } from "./ModalText";

const modalContentStyles = {
    px: 3
}

export function ModalContent({ description, children }) {
    return (
        <DialogContent dividers={true} sx={modalContentStyles} >
            <ModalText description={description} />
            {/* <CustomComponent /> */}
            {children}
        </DialogContent>);
}