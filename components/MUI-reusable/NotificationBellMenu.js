import React from 'react';
import { useState } from 'react';
import { BasicMenu } from './BasicMenu';
import { NotificationBell } from './NotificationBell';

export function NotificationBellMenu({ badgeContent = 0, iconColor = 'primary' }) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <NotificationBell
                badgeContent={badgeContent}
                iconColor={iconColor}
                anchorEl={anchorEl}
                onClick={handleOpen}
            />
            <BasicMenu
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
            />
        </>
    )
}
