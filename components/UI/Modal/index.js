import { Modal } from "@mui/material";
import { ModalContent } from "./ModalContent";

export default function BasicModal({ title, closer, children }) {
    return (
        <Modal open onClose={closer} aria-labelledby={title}>
            {/* Modal Content */}
            <ModalContent title={title} closer={closer}>
                {children}
            </ModalContent>
        </Modal>
    );
}
