import React from 'react';
import { useState } from 'react';
import { BasicMenu } from './BasicMenu';
import { NotificationBell } from './NotificationBell';

export function NotificationBellMenu({ notifications = [], iconColor = 'primary' }) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget) // set anchorEl to the current event.currentTarget (DOM Element)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <NotificationBell
                badgeContent={notifications.length}
                iconColor={iconColor}
                anchorEl={anchorEl}
                onClick={handleOpen}
            />
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                menuItems={notifications}
            />
        </>
    )
}
