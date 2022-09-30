import React from "react";
import { ModalContainer, ModalContainerRef } from "./ModalContainer";
import { ModalHeader } from "./ModalHeader";
import { ModalTitle } from "./ModalTitle";
import { ModalCloseBtn } from "./ModalCloseBtn";
import { Divider } from "@mui/material";
import { ModalBody } from "./ModalBody";

export const ModalContent = ({ title, closer, children }) => {
    return (
        <ModalContainer>
            {/* Modal Header */}
            <ModalHeader>
                {/* Modal Title */}
                <ModalTitle title={title} />
                {/* Modal Button */}
                <ModalCloseBtn closer={closer} />
            </ModalHeader>

            {/* Divider */}
            <Divider />

            {/* Modal Body */}
            <ModalBody>{children}</ModalBody>
        </ModalContainer>
    );
};

export const ModalContentRef = React.forwardRef(
    ({ title, closer, children }, ref) => {
        return (
            <ModalContainerRef ref={ref}>
                {/* Modal Header */}
                {/* <ModalHeader> */}
                {/* Modal Title */}
                {/* <ModalTitle title={title} /> */}
                {/* Modal Button */}
                {/* <ModalCloseBtn closer={closer} /> */}
                {/* </ModalHeader> */}

                {/* Divider */}
                {/* <Divider /> */}

                {/* Modal Body */}
                {/* <ModalBody> */}
                {"children"}
                {/* </ModalBody> */}
            </ModalContainerRef>
        );
    }
);
