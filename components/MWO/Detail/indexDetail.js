// Dependency
import React, { useState, useEffect } from 'react'
import { cloneAndPluck, deepClone } from '../../../helpers/reusable'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import moduleApollo from '../../../lib/apollo_client/moduleApollo'
import mwoApollo from '../../../lib/apollo_client/mwoApollo'

// // Store & Styles

import styles from '../../../styles/mwoDetail.module.scss'

// // Components

import Layout from '../../Layout/Layout'
import Loader from '../../Loader'
import { populateitems } from '../../../helpers/specific'
import Header from '../../Procurement/Detail/Header'
import NavList from '../../Procurement/Detail/NavList'
import ItemDetail from '../../Procurement/Detail/ItemDetail'


export default function MWOdetailPageComp({ pageId = 'mwoId' }) {
    { // ?Detail of Rerenders is as follows:
        // On detail page refresh, the page renders 04 times, each time with different state
        // 1: mwoState : invalid, moduleState : invalid
        // 2: mwoState : valid, moduleState : invalid
        // 3: mwoState : valid, moduleState : valid
        // 4: In the last (3rd) render, the loading and activeMWOdata state was changed (along with the transformation logic) therefore, the page rerenders again
        console.warn('Manual Warning: The component renders 04 times on direct pageLoad.');
    }

    const router = useRouter();
    // Section: Component States
    const [loading, setLoading] = useState(true);
    const [activeMWOdata, setActiveMWOdata] = useState(null)
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const moduleState = useReactiveVar(moduleApollo)
    const mwoState = useReactiveVar(mwoApollo)

    // Section: State Transforms
    useEffect(() => {
        // TODO: handle the case when loading state remains true for a long time. re-route to 404 page if stuck in loading state for a long time
        // const loadingTimeout = setTimeout(() => console.error('Loading failed'), 3000)
        if (mwoState.fetched && moduleState.fetched) {
            // clearTimeout(loadingTimeout);
            // Stop execution if item to be populated is not found
            const activeMWO = deepClone(mwoState.list.find(mwo => mwo.mwoId === pageId));

            const populatedActiveMWO = populateActiveMWO(activeMWO, moduleState.list);

            setActiveMWOdata(populatedActiveMWO);
            setLoading(false);

            if (!populatedActiveMWO) return null
        }
    }, [mwoState, moduleState])

    // Section: Fallback Rendering
    if (loading) return <Loader />
    if (!activeMWOdata) return router.push('/404?goto=procurement/mwo&caption=MWO%20List') && null;

    console.assert(!!activeMWOdata?.items, 'Must Not Happen')

    // Section: Component Rendering
    return (
        <Layout pageClasses={[styles.page]} >

            {/* Header */}
            {
                <Header
                    classes={[styles.header]}
                    data={activeMWOdata}
                    sourceType='mwo'
                />
            }

            {/* Navigation List */}
            {
                // TODO: No need of ternary operator here as the "Empty items" case is already handled earlier
                activeMWOdata?.items?.length > 0
                    ? <NavList
                        classes={[styles.navList]}
                        itemList={activeMWOdata.items}
                        activeIndex={activeItemIndex}
                        setActiveIndex={setActiveItemIndex}
                    />
                    : <p className='note'>No Modules Inside - detailPage/NavList</p>
            }


            {/* Detail */}

            {

                // ? execute below if modules length === 0
                activeMWOdata?.items?.length > 0 &&
                <ItemDetail
                    sourceType='mwo'
                    classes={[styles.itemDetail]}
                    activeSourceId={activeMWOdata.mwoId}
                    itemData={activeMWOdata.items[activeItemIndex]}
                /> || <p className='note'>No Modules Inside - detailPage/ItemDetail</p>
            }
        </Layout>
    )
}


function populateActiveMWO(activeMWO, ModuleList, pageId) {
    if (!!activeMWO) {
        activeMWO.items = populateitems(
            activeMWO.items,
            ModuleList
        )
        return activeMWO;
    } else {
        return null;
    }

}

