// Dependency
import React, { useState, useEffect } from 'react'
import { cloneAndPluck, deepClone } from '../../../helpers/reusable'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import moduleApollo from '../../../lib/apollo_client/poItemApollo'
import mwoApollo from '../../../lib/apollo_client/mwoApollo'

// // Store & Styles

import styles from '../../../styles/mwoDetail.module.scss'

// // Components
import MWOheader from './MWOheader'
// import MWOnavList from './MWOdetail/MWOnavList'
// import MWOitemDetail from './MWOdetail/MWOitemDetail'
import Layout from '../../Layout/Layout'
import Loader from '../../Loader'
import { populateLinkedModules } from '../../../helpers/specific'


export default function MWOdetailPageComp({ pageId = 'refId' }) {
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
               setLoading(false);
               const populatedActiveMWO = populateActiveMWO(mwoState.list, moduleState.list, pageId);
               setActiveMWOdata(populatedActiveMWO);
          }
     }, [mwoState, moduleState])

     // Section: Fallback Rendering
     if (loading) return <Loader />
     if (!activeMWOdata) return router.push('/404') && null;

     console.assert(!!activeMWOdata?.linkedModules, 'Must Not Happen')

     // Section: Component Rendering
     return (
          <Layout pageClasses={[styles.page]} >

               {/* Header */}
               {
                    <MWOheader
                         classes={[styles.header]}
                         activeMWOuuid={activeMWOdata._id}
                         // activeMWOid={activeMWOdata.mwoId}
                         data={activeMWOdata}
                    />
               }

               {/* Navigation List */}
               {
                    // TODO: No need of ternary operator here as the "Empty LinkedModules" case is already handled earlier
                    activeMWOdata?.linkedModules?.length > 0
                         ? <MWOnavList
                              classes={[styles.navList]}
                              itemList={activeMWOdata.linkedModules}
                              activeIndex={activeItemIndex}
                              setActiveIndex={setActiveItemIndex}
                         />
                         : <p className='note'>No Modules Inside - detailPage/NavList</p>
               }


               {/* Detail */}
               {

                    // ? execute below if modules length === 0
                    activeMWOdata?.linkedModules?.length > 0 &&
                    <MWOitemDetail
                         classes={[styles.itemDetail]}
                         activeMWOid={activeMWOdata.refId}
                         itemList={activeMWOdata.linkedModules} // detail for the current MWO modules- nested/item/detail level
                         activeItemIndex={activeItemIndex}
                         setActiveItemIndex={setActiveItemIndex}
                    /> || <p className='note'>No Modules Inside - detailPage/ItemDetail</p>
               }
          </Layout>
     )
}


function populateActiveMWO(MWOlist, ModuleList, pageId) {

     const activeMWO = deepClone(MWOlist.find(mwo => mwo.mwoId === pageId));
     if (!!activeMWO) {
          activeMWO.linkedModules = populateLinkedModules(activeMWO.linkedModules, ModuleList)
          return activeMWO;
     } else {
          return null;
     }

}

