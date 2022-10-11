import React from 'react'
import { Avatar, Tooltip } from '@mui/material';

const CellAvatar = ({ tooltip, photoPath = false, text = false }) => { // ? images can be added with this method

    const photoBorderStyles = photoPath
        ? '2px solid black'
        : '2px solid crimson'

    return (
        <Tooltip title={tooltip} >
            <Avatar
                src={photoPath}
                alt={tooltip.toString()}
                sx={{ border: photoBorderStyles }}
            />
        </Tooltip >
    )
}

export default CellAvatar