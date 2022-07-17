import React from 'react'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';


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
                    <NotificationsNoneOutlinedIcon />
                </Badge>
            </IconButton>
        </Tooltip>
    )
}
