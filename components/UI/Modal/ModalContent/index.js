import { DialogContent } from "@mui/material";
import { ModalText } from "./ModalText";

const modalContentStyles = {
    px: 3
}

export function ModalContent({ description, children, contentWrapperComponent: ContentWrapper }) {
    const content = getContent(ContentWrapper, children)

    return (
        <>
            <DialogContent dividers={true} sx={modalContentStyles} >
                <ModalText description={description} />
                {/* <CustomComponent /> */}
                {content}
            </DialogContent>
        </>
    );
}



function getContent(ContentWrapper, children) {
    if (ContentWrapper) return (
        <ContentWrapper>
            {children}
        </ContentWrapper>
    )
    return children;
}
