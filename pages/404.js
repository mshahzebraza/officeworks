import { useRouter } from 'next/router'
import { Grid, Typography } from '@mui/material'
import { ButtonLink } from '../client/components/customMUI'


const fileStyles = {
    backdrop: {
        background: ' #2d2d2d',
        background: ' -webkit-linear-gradient(to right, #2d2d2d, #2d2d2d)',
        background: 'linear-gradient(to right, #2d2d2d, #2d2d2d)',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    }
}
const FallBackBackdrop = ({ children }) => {
    return (
        <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
            component='main'
            sx={fileStyles.backdrop}
            gap={2}

        >
            {children}
        </Grid>
    )
}
const FallBackTitle = ({ children }) => {
    return (
        <Typography variant="h1" component="p" color="#ddd">
            {children}
        </Typography>
    )
}
const FallBackSubTitle = ({ children }) => {
    return (
        <Typography variant="h5" component="p" color="#ddd" mb={2}>
            {children}
        </Typography>
    )
}
const FallBackGoTo = ({ children, href, ...rest }) => {
    return (
        <ButtonLink href={href} variant="outlined" size='large' color="white" sx={{ fontWeight: 300 }} {...rest}>
            {children}
        </ButtonLink>
    )
}


export default function defaultFallback(props) {
    const router = useRouter()
    const { query: { goto = '', caption = 'Home' }, isReady } = router;
    if (!isReady) return <div>Router Loading...</div>

    return (
        <FallBackBackdrop>
            <FallBackTitle>404</FallBackTitle>
            <FallBackSubTitle>Page Not Found!</FallBackSubTitle>
            <FallBackGoTo href={`/${goto}`}  >
                {`Go to ${caption}`}
            </FallBackGoTo>
        </FallBackBackdrop>
    )
}