import { Box, Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const fileStyles = {
    backdrop: {
        background: ' #2d2d2d',
        background: ' -webkit-linear-gradient(to right, #2d2d2d, #2d2d2d)',
        background: 'linear-gradient(to right, #2d2d2d, #2d2d2d)',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        position: 'relative',
        display: 'inline-flex'
    },
    loaderContainer: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaderLabel: {
        color: "#009be5",
        fontWeight: 600
    }
}
const LoaderBackdrop = ({ children }) => {
    return (
        <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
            // component='main'
            sx={fileStyles.backdrop}
        >
            {children}
        </Grid>
    )
}
const LoaderContainer = ({ children }) => {
    return (
        <Box
            sx={fileStyles.loaderContainer}
        >
            {children}
        </Box>
    )
}
const LoaderLabel = ({ children }) => {
    return (
        <Typography variant="h2" component="p" sx={fileStyles.loaderLabel}
        >
            {children}
        </Typography>
    )
}

export default function Loader(props) {

    return (
        <LoaderBackdrop>
            <CircularProgress size={400} thickness={1.1} />
            <LoaderContainer>
                <LoaderLabel >
                    Loading ...
                </LoaderLabel>
            </LoaderContainer>
        </LoaderBackdrop>
    )
}