import { Grid, IconButton, Tooltip } from '@mui/material'
import { MTableBodyRow } from 'material-table'
import React from 'react'
import { useState } from 'react'
import { tableIcons } from '../../../constants/tableIcons'
import IconButtonTooltip from '../IconButtonTooltip'


const styles = {
    rowContainer: {
        display: 'contents',
        // position: 'relative',
    },
    overlayRow: {
        position: 'absolute',
        // top: 0,
        // right: 0,
        width: '100%',
        zIndex: 1,
        // display: 'flex',
    },
    overlayContent: {
        height: '100%',
        backgroundColor: '#fff',
    }
}




const RowOverlay = (props) => {

    const [showOverlay, setShowOverlay] = useState(false)

    return (
        <Grid container style={styles.rowContainer} onMouseOver={() => setShowOverlay(true)} onMouseLeave={() => setShowOverlay(false)} >
            {showOverlay && <Grid item sm={12} align='right' style={styles.overlayRow} >
                <Grid sm={2} style={styles.overlayContent}  >
                    I'm an overlay
                </Grid>
            </Grid>}

            <MTableBodyRow {...props} />

        </Grid>
    )
}

export default RowOverlay;


