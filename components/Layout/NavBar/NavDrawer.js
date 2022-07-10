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

import { mainNavbarItems } from "../../constants/navbarItems";
import { useRouter } from 'next/dist/client/router';

const navbarStyles = {
    brand: {
        fontSize: '1.25rem',
        letterSpacing: '0.1em',
        fontWeight: '400',
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    drawer: {
        width: 275,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 275,
            boxSizing: 'border-box',
            backgroundColor: '#101f33',
            color: '#ddd',
        },
        '& .Mui-selected': {
            color: 'red',
        },
    },
    icons: { color: '#ddd', ml: 2 },
    text: { color: '#ddd', fontSize: '2rem !important', fontWeight: '600' },
}

export default function NavDrawer() {
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
