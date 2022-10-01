import { IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';



const closeIconBtnStyles = {
    position: 'absolute',
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[500],
}
export const ModalCloseIcon = ({ handleClose }) => {
    if (!handleClose) return null
    return (
        <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={closeIconBtnStyles}
        >
            <CloseIcon />
        </IconButton >
    )
}