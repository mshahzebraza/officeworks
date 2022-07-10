import React from 'react'
import { ButtonLink } from '../../MUI-reusable'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Box, Container, List } from '@mui/material'

const styles = {
    brand: {
        fontSize: '1.25rem',
        letterSpacing: '0.1em',
        fontWeight: '400',
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}



function Brand() {
    return (
        <Box sx={styles.newBox}>
            <ButtonLink href={'/'} variant='standard' sx={styles.brand}>
                Office Works
            </ButtonLink>
        </Box >
    );
}

function NavList() {
    return (<List >
        <ButtonLink href={'/po'} variant='standard'>POs</ButtonLink>
        <ButtonLink href={'/mwo'} variant='standard'>MWOs</ButtonLink>
        <ButtonLink href={'/module'} variant='standard'>Modules</ButtonLink>
        <ButtonLink href={'/transaction'} variant='standard'>Transactions</ButtonLink>
        <ButtonLink href={'/project'} variant='standard'>Projects</ButtonLink>
    </List>);
}

function Actions() {
    return (<Box>
        <ButtonLink href={'/'} variant='standard'>Signup</ButtonLink>
    </Box>);
}


export default function NavAppBar() {
    return (
        <>
            {/* header */}
            <AppBar position="fixed" color="primary" >
                <Container disableGutters maxWidth='lg' >
                    {/* Nav */}
                    <Toolbar disableGutters component='nav' sx={styles.toolBar} >
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
