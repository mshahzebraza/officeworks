import React from 'react'
import { Avatar, Box, Typography, Button, Tooltip, Container, IconButton } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';
import { headerStyles } from './headerStyles';
import { ButtonLink, NotificationBellMenu } from '../../customMUI';

export default function Header({ title = 'Header Title' }) {

    const mockNotifications = [{ label: 'Notification 1' }, { label: 'Notification 2' }];

    return (
        <Container sx={headerStyles.wrapper} maxWidth='xl' disableGutters >
            <Box sx={headerStyles.topRow} >
                <ButtonLink
                    href='/'
                    sx={headerStyles.link}
                    variant='text' color="white"
                >
                    Go to docs
                </ButtonLink>
                <NotificationBellMenu
                    iconColor="white"
                    notifications={mockNotifications}
                />
                <Avatar src="/images/avatar.png" ml={2} />
            </Box>
            <Box sx={headerStyles.middleRow}>
                <Typography
                    variant="h4"
                    color="#ddd"
                >
                    {title}
                </Typography>
                <Box >
                    <ButtonLink
                        href='/'
                        sx={headerStyles.link}
                        variant="text" color="white"
                    >
                        Web setup
                    </ButtonLink>
                    <Tooltip
                        title="Help"
                    >
                        <IconButton
                            color="white"
                        >
                            <HelpOutline />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

        </Container>
    )
}
