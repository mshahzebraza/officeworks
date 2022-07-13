import React from 'react'
import { IconButton, Tooltip } from '@mui/material'

const IconButtonTooltip = (props) => {
    const { toolTip = 'icon button', children, ...rest } = props;
    return (
        <Tooltip title={toolTip}>
            <IconButton {...rest} >
                {children}
            </IconButton>
        </Tooltip>
    )
}

export default IconButtonTooltip