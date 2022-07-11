import React from 'react'
import {
    Toolbar,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material'

import { mainNavbarItems } from "../../../constants/navbarItems";
import { useRouter } from 'next/dist/client/router';
import { navbarStyles } from './navbarStyles';

export default function NavBar() {
    return (
        <>
            {/* header */}
            <Drawer
                sx={navbarStyles.drawer}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                {<List>
                    {mainNavbarItems.map((itemData, index) => (
                        <NavItem key={index} {...itemData} />
                    ))}
                </List>}
            </Drawer>
        </>
    )
}

function NavItem(props) {
    const router = useRouter();

    const { id = 'id', route = '/', icon: Icon, label = 'default' } = props;
    return <ListItem disablePadding onClick={() => { router.push(route) }} >
        <ListItemButton>
            <ListItemIcon sx={navbarStyles.icons}>
                <Icon />
            </ListItemIcon>
            <ListItemText sx={navbarStyles.text} primary={label} />
        </ListItemButton>
    </ListItem>
}
