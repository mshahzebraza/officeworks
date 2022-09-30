import { Grid, Tooltip, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export function ModalCloseBtn(props) {
	return (
		<Grid item>
			<Tooltip title="Close">
				<IconButton
					aria-label="close-modal"
					onClick={props.closer}
					size="small"
					variant="contained"
				>
					<Close sx={{ color: "#000" }} fontSize="inherit" />
				</IconButton>
			</Tooltip>
		</Grid>
	);
}
