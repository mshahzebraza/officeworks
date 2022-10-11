// Dependency
import React, { useState, useEffect } from 'react'
import { cloneAndPluck, deepClone } from '../../../helpers/reusable'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import moduleApollo from '../../../lib/apollo_client/moduleApollo'
import poApollo from '../../../lib/apollo_client/poApollo'

// Store & Styles
import styles from '../../../styles/poDetail.module.scss'

// Components
import Layout from '../../Layout'
import Loader from '../../Loader'
import { mapModulesToPO } from '../../../helpers/specific'
import Header from '../../Procurement/Detail/Header'
import ItemDetail from '../../Procurement/Detail/ItemDetail'
import NavList from '../../Procurement/Detail/NavList'
import Grid from '@mui/material/Grid'


export default function POdetailPageComp({ pageId }) {
    { // ?Detail of Rerenders is as follows:
        // On detail page refresh, the page renders 04 times, each time with different state
        // 1: poState : invalid, moduleState : invalid
        // 2: poState : valid, moduleState : invalid
        // 3: poState : valid, moduleState : valid
        // 4: In the last (3rd) render, the loading and activePOdata state was changed (along with the transformation logic) therefore, the page rerenders again
        console.warn('The component renders 04 times on direct pageLoad.');
    }
    const router = useRouter();
    console.log('POdetailPageComp: pageId:', pageId);

    // Section: Component States
    const [loading, setLoading] = useState(true);
    const [activePOdata, setActivePOdata] = useState(null)
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const moduleState = useReactiveVar(moduleApollo)
    const poState = useReactiveVar(poApollo)

    // Section: State Transforms
    useEffect(() => {
        // TODO: handle the case when loading state remains true for a long time. re-route to 404 page if stuck in loading state for a long time
        // const loadingTimeout = setTimeout(() => console.error('Loading failed'), 3000)
        if (poState.fetched && moduleState.fetched) {
            // clearTimeout(loadingTimeout);
            // Stop execution if item to be populated is not found
            // const activePO = deepClone(poState.list.find(po => po.refId === pageId));
            const activePO = deepClone(poState.list.find(po => {
                const [sourceType, sourceId] = pageId.split('__');
                if (po.refId === sourceId && po.refType === sourceType) return true;
            }));


            const populatedActivePO = populateActivePO(activePO, moduleState.list);

            setActivePOdata(populatedActivePO);
            setLoading(false);

            if (!populatedActivePO) return null
        }
    }, [poState, moduleState])

    // Section: Fallback Rendering
    if (loading) return <Loader />
    if (!activePOdata) return router.push('/404?goto=po&caption=PO%20List') && null;

    console.log('activePOdata', activePOdata)

    console.assert(!!activePOdata?.items, 'Must Not Happen')

    // Section: Component Rendering
    return (
        <Layout /* pageClasses={[styles.page]} */ pageTitle={`${pageId.split('__')[0]}: ${pageId.split('__')[1]}`} >

            <Grid container gap={2} component='section' >
                {/* Header */}
                <Grid item xs={12} container gap={2}  >
                    <Header
                        classes={[styles.header]}
                        data={activePOdata}
                        sourceType='po'
                    />
                </Grid>
                {/* Navigation List */}
                <Grid item xs={2.5} >
                    {
                        // TODO: No need of ternary operator here as the "Empty items" case is already handled earlier
                        activePOdata?.items?.length > 0
                            ? <NavList
                                classes={[styles.navList]}
                                itemList={activePOdata.items}
                                activeIndex={activeItemIndex}
                                setActiveIndex={setActiveItemIndex}
                            />
                            : <p className='note'>No Modules Inside - detailPage/NavList</p>
                    }
                </Grid>
                {/* Detail */}
                <Grid item xs component='section'>
                    {

                        // ? execute below if modules length > 0
                        activePOdata?.items?.length > 0 &&
                        <ItemDetail
                            sourceType='po'
                            classes={[styles.itemDetail]}
                            activeSourceId={activePOdata.refId}
                            itemData={activePOdata.items[activeItemIndex]} // detail for the current PO modules- nested/item/detail level
                        /> || <p className='note'>No Modules Inside - detailPage/ItemDetail</p>
                    }
                </Grid>
            </Grid>

        </Layout >
    )
}


function populateActivePO(activePO, ModuleList, pageId) {

    if (!!activePO) {
        activePO.items = mapModulesToPO(
            activePO.items,
            ModuleList
        )
        return activePO
    } else {
        return null
    }

}

