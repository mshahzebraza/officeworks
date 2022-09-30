import { Grid } from "@mui/material";

const headerStyles = { /* border: '1px dashed green' */ pl: 1 };
export function ModalHeader({ children }) {
	return (
		<Grid
			item
			xs
			container
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			sx={headerStyles}
			as="header"
		>
			{" "}
			{children}
		</Grid>
	);
}
