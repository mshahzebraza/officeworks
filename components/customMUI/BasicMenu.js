import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export function BasicMenu({ anchorEl, handleClose = () => { }, open = false, menuItems = [], fallback = 'No menu items available' }) {

    return (
        <div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    menuItems.length > 0
                        ? menuItems.map((item, index) => {
                            return (
                                <MenuItem key={index} onClick={handleClose}>
                                    {item.label}
                                    {/* There could be icons as well defined in the menuItems.icon */}
                                </MenuItem>
                            )
                        })
                        : <MenuItem onClick={handleClose}>
                            {fallback}
                        </MenuItem>
                }
            </Menu>
        </div>
    )
}
