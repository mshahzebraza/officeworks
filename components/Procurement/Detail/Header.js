// Dependency & Helpers
import React from 'react'
import { concatStrings, transformEntries, toSentenceCase, cloneAndPluck } from '../../../helpers/reusable'

// Styles & Stores
import styles from './Header.module.scss'
import { deleteMWOHandler } from '../../../lib/apollo_client/mwoApollo'
import { deletePOHandler } from '../../../lib/apollo_client/poApollo'

// UI Components
import ModalButton from '../../UI/ModalButton'
import Button from '../../UI/Button'

// Major Components
import Source_Form from '../Forms/Source_Form'
import Item_Form from '../Forms/Item_Form'
import { Grid, Divider } from '@mui/material'

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
                container direction='column'
                px={2} py={4}
                className={styles.overview}
            >
                {/* <div className={styles.overview}> */}
                {transformEntries(OV_data, entryCallback)}
                {/* </div> */}
            </Grid>

            {/* Meta */}
            <Grid
                item xs={5}
                container direction='column'
                px={2} py={4}
                // className={styles.overview}
                className={styles.meta}
            >
                {transformEntries(meta_data, entryCallback)}
            </Grid>
            {/* Controls */}
            <Grid
                item xs={2}
                container direction='column'
                px={2} py={4}
                className={styles.controls}
            >

                <ModalButton
                    {...headerData.controls.addItem}
                />
                <Button
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
    return (
        <h3 key={`summaryPair-${pairIndex}`} className={concatStrings(['pair', styles.pair])} >
            <span className={concatStrings(['pairField', styles.pairField])} >{toSentenceCase(pairArr[0])}</span>
            <span className={concatStrings(['pairValue', styles.pairValue])} >{pairArr[1]}</span>
        </h3>
    )
}