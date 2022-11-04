import React from 'react'
import { NotificationsNoneOutlined } from '@mui/icons-material';
import { Badge, Tooltip, IconButton } from '@mui/material';

export function NotificationBell({ badgeContent = 0, iconColor = 'primary', onClick = () => { }, ...rest }) {
    const newNotificationText = `You have ${badgeContent} new notifications`;
    const noNotificationText = 'You have no new notifications';
    const notificationText = badgeContent > 0 ? newNotificationText : noNotificationText;

    return (
        <Tooltip
            title={notificationText}
        >
            <IconButton
                onClick={onClick}
                color={iconColor}
            >
                <Badge
                    badgeContent={badgeContent}
                    color={'error'}
                >
                    <NotificationsNoneOutlined />
                </Badge>
            </IconButton>
        </Tooltip>
    )
}
