import React from "react";
import { Grid } from "@mui/material";

const containerStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    maxHeight: 750,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
export function ModalContainer({ children }) {
    return (
        <Grid
            // onClick={(e) => e.stopPropagation()}
            container
            wrap="nowrap"
            gap={2}
            sx={containerStyles}
            direction="column"
        >
            {children}
        </Grid>
    );
}

export const ModalContainerRef = React.forwardRef(function ({ children }, ref) {
    return (
        <Grid
            // onClick={(e) => e.stopPropagation()}
            ref={ref}
            container
            wrap="nowrap"
            gap={2}
            sx={containerStyles}
            direction="column"
        >
            {children}
        </Grid>
    );
});
