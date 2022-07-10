import React from 'react'
import NavAppBar from './NavAppBar'
import NavDrawer from './NavDrawer'

function NavBar({ navType }) {
    return (
        <>
            {
                navType === 'appBar' ?
                    <NavAppBar /> :
                    <NavDrawer />
            }
        </>
    )
}

export default NavBar