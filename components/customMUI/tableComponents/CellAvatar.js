import React from 'react'
import { Box, Grid, Button, Avatar, Typography, Tooltip } from '@mui/material';

const CellAvatar = ({ data: avatarData, fallback = false, text = false }) => { // ? images can be added with this method


    return (
        <Grid container gap={2} alignItems='center' >
            {/* Tooltip Avatar */}
            <Tooltip title={avatarData?.name || text} >
                <Avatar
                    src={avatarData?.photoPath}
                    alt={avatarData?.name}
                    sx={{ border: !fallback ? '2px solid black' : '2px solid crimson' }}
                />
            </Tooltip >
            {/* Avatar Text */}
            {text && <Typography>
                {text}
            </Typography>}
        </Grid>
    )
}

export default CellAvatar