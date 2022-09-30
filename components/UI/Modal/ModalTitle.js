import { Grid, Typography } from "@mui/material";

export function ModalTitle({ title = "Modal Title" }) {
	return (
		<Grid item>
			<Typography id="modal-modal-title" variant="h5" component="h2">
				{title}
			</Typography>
		</Grid>
	);
}
