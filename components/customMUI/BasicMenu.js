import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export function BasicMenu({ anchorEl, handleClose = () => { }, open = false, menuItems = [] }) {

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
                                </MenuItem>
                            )
                        })
                        : <MenuItem onClick={handleClose}>
                            No menu item
                        </MenuItem>
                }
            </Menu>
        </div>
    )
}
