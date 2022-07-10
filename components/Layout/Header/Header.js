import React from 'react'
import { ButtonLink } from '../../MUI-reusable'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { makeStyles } from '@mui/styles'
import { Box, Container } from '@mui/material'

const useStyles = makeStyles(theme => ({
    brand: {
        fontSize: 'calc((2 / 16) * 10rem)',
        letterSpacing: '0.1em',
        fontWeight: '800',
        textTransform: 'uppercase',
    }
}))



function Brand() {
    const classes = useStyles();
    return (
        <Box>
            <ButtonLink href={'/'} variant='standard' className={classes.brand}>
                {
                    /* <Typography variant="h6"> */
                }
                Office Works
            </ButtonLink>
        </Box>
    );
}



function NavList() {
    return (<Box component='ul'>
        <ButtonLink href={'/po'} variant='standard'>POs</ButtonLink>
        <ButtonLink href={'/mwo'} variant='standard'>MWOs</ButtonLink>
        <ButtonLink href={'/module'} variant='standard'>Modules</ButtonLink>
        <ButtonLink href={'/transaction'} variant='standard'>Transactions</ButtonLink>
        <ButtonLink href={'/project'} variant='standard'>Projects</ButtonLink>
    </Box>);
}

function Actions() {
    return (<Box>
        <ButtonLink href={'/'} variant='standard'>Signup</ButtonLink>
    </Box>);
}


export default function Header() {
    return (
        <>
            {/* header */}
            <AppBar position="fixed" color="primary" >
                <Container disableGutters maxWidth='lg' >
                    {/* Nav */}
                    <Toolbar disableGutters component='nav' sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }} >
                        {/* Brand */}
                        <Brand />
                        {/* Nav List */}
                        <NavList />
                        {/* Actions */}
                        <Actions />
                    </Toolbar>
                </Container>
            </AppBar>

        </>
    )
}
