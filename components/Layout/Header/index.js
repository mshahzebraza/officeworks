import React from 'react'
import { Avatar, Box, Typography, Button, Tooltip, IconButton, Container } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { ButtonLink, NotificationBellMenu } from '../../customMUI';
import { headerStyles } from './headerStyles';

function Header({ title = 'Header Title' }) {

    return (
        <Container sx={headerStyles.wrapper} maxWidth='xl' disableGutters >
            <Box sx={headerStyles.topRow}>
                <ButtonLink
                    sx={headerStyles.link}
                    variant='standard'
                >
                    Go to docs
                </ButtonLink>
                <NotificationBellMenu
                    iconColor="white"
                />
                <Avatar src="/images/avatar.png" />
            </Box>
            <Box sx={headerStyles.middleRow}>
                <Typography
                    variant="h1"
                    color="white"
                >
                    {title}
                </Typography>
                <Box>
                    <Button
                        sx={headerStyles.webButton}
                        variant="outlined"
                    >
                        Web setup
                    </Button>
                    <Tooltip
                        title="Help"
                    >
                        <IconButton
                            color="white"
                            sx={headerStyles.helpIcon}
                        >
                            <HelpIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Container>
    )
}

export default Header