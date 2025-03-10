import { useRouter } from 'next/router'
import { Grid, SxProps, Theme, Typography } from '@mui/material'
import { ButtonLink } from '../client/components/customMUI'
import type { NextPage } from 'next'

interface FallBackBackdropProps {
    children: React.ReactNode;
}

interface FallBackTitleProps {
    children: React.ReactNode;
}

interface FallBackSubTitleProps {
    children: React.ReactNode;
}

interface FallBackGoToProps {
    children: React.ReactNode;
    href: string;
    [key: string]: any;
}

const fileStyles: Record<string, SxProps<Theme>> = {
    backdrop: {
        // background: ' #2d2d2d',
        // background: ' -webkit-linear-gradient(to right, #2d2d2d, #2d2d2d)',
        // 
        background: `
        #2d2d2d,
            linear-gradient(
                to right,
                #2d2d2d,
                #2d2d2d
            )
        `,
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    }
}

const FallBackBackdrop: React.FC<FallBackBackdropProps> = ({ children }) => {
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

const FallBackTitle: React.FC<FallBackTitleProps> = ({ children }) => {
    return (
        <Typography variant="h1" component="p" color="#ddd">
            {children}
        </Typography>
    )
}

const FallBackSubTitle: React.FC<FallBackSubTitleProps> = ({ children }) => {
    return (
        <Typography variant="h5" component="p" color="#ddd" mb={2}>
            {children}
        </Typography>
    )
}

const FallBackGoTo: React.FC<FallBackGoToProps> = ({ children, href, ...rest }) => {
    return (
        <ButtonLink href={href} variant="outlined" size='large' color="white" sx={{ fontWeight: 300 }} {...rest}>
            {children}
        </ButtonLink>
    )
}

const Custom404: NextPage = () => {
    const router = useRouter()
    const { query: { goto = '', caption = 'Home' }, isReady } = router;
    if (!isReady) return <div>Router Loading...</div>

    return (
        <FallBackBackdrop>
            <FallBackTitle>404</FallBackTitle>
            <FallBackSubTitle>Page Not Found!</FallBackSubTitle>
            <FallBackGoTo href={`/${goto}`}>
                {`Go to ${caption}`}
            </FallBackGoTo>
        </FallBackBackdrop>
    )
}

export default Custom404 