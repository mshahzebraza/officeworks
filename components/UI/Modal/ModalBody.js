import { Grid } from "@mui/material";

const bodyStyles = { height: 600, overflowY: "auto", p: 1, pr: 2 };
export function ModalBody({ children }) {
	return (
		<Grid item xs={12} container sx={bodyStyles} as="main">
			{children}
		</Grid>
	);
}
