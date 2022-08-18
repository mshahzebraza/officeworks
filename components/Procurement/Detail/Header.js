// Dependency & Helpers
import React from 'react'
import { concatStrings, transformEntries, toSentenceCase, cloneAndPluck } from '../../../helpers/reusable'

// Styles & Stores
import styles from './Header.module.scss'
import { deleteMWOHandler } from '../../../lib/apollo_client/mwoApollo'
import { deletePOHandler } from '../../../lib/apollo_client/poApollo'

// UI Components
import ModalButton from '../../UI/ModalButton'
// import Button from '../../UI/Button'

// Major Components
import Source_Form from '../Forms/Source_Form'
import Item_Form from '../Forms/Item_Form'
import { Grid, Divider, Typography, Button, Tooltip } from '@mui/material'
import { camelCase } from 'lodash'

const dataCardStyles = {
    bgcolor: 'background.paper',
    border: '2px solid #999',
    boxShadow: 6,
    borderRadius: 1,
    px: 3,
    py: 4,
    justifyContent: 'space-between'

}

function ActionButton({ children, caption = 'Action Button', tooltip = '', disabled = false, click, ...rest }) {
    return (
        <Tooltip title={tooltip || caption}>

            <Button
                variant="contained"
                disabled={disabled}
                onClick={click}
                {...rest}
            >
                {children || caption}
            </Button>
        </Tooltip>
    )
}

export default function Header({ sourceType = 'mwo', data: activeSourceData = {}, classes }) {

    const headerData = {
        overview: sourceType === 'po' ? ['refId', 'refType', 'totalCost'] : ['mwoId', 'status'],
        meta: sourceType === 'po' ? ['fulfillmentSource', 'category', 'supplier'] : ['title'],
        controls: {
            addItem: {
                caption: `Add ${sourceType.toUpperCase()} Item`,
                ModalComponent: Item_Form,
                activeSourceId: activeSourceData[sourceType === 'po' ? 'refId' : 'mwoId'],
                sourceType
            },
            deleteSource: {
                caption: `Delete ${sourceType.toUpperCase()}`,
                click: () => {
                    sourceType === 'po' ? deletePOHandler(activeSourceData._id) : deleteMWOHandler(activeSourceData._id)
                },
            },
            editSource: {
                caption: `Update ${sourceType.toUpperCase()} Summary`,
                ModalComponent: Source_Form,
                data: activeSourceData,
                sourceType
            }
        }

    }

    const OV_data = cloneAndPluck(activeSourceData, headerData.overview)
    const meta_data = cloneAndPluck(activeSourceData, headerData.meta)

    return (
        <>
            {/* <section className={concatStrings([...classes, styles.header])} > */}
            {/* Overview */}
            <Grid
                item xs
                container
                direction='column'
                sx={dataCardStyles}
            >
                {/* <div className={styles.overview}> */}
                {transformEntries(OV_data, entryCallback)}
                {/* </div> */}
            </Grid>

            {/* Meta */}
            <Grid
                item xs
                container direction='column'
                sx={dataCardStyles}
            >
                {transformEntries(meta_data, entryCallback)}
            </Grid>
            {/* Controls */}
            <Grid
                item xs={3}
                container direction='column'
                gap={2}
                sx={dataCardStyles}
            >

                <ModalButton
                    {...headerData.controls.addItem}
                />
                <ActionButton
                    {...headerData.controls.deleteSource}
                />

                <ModalButton
                    {...headerData.controls.editSource}
                />
            </Grid>

            {/* </section> */}
        </>
    )
}

export function entryCallback(pairArr, pairIndex) {
    const [fieldText, valueText] = pairArr
    return (
        <Grid key={pairIndex} item container alignItems='center' justifyContent='space-between' >
            <Typography variant="h6" component='p'>{toSentenceCase(fieldText)}</Typography>
            <Typography variant="body1" sx={{ fontSize: 18 }} >{valueText}</Typography>
        </Grid>
    )
}