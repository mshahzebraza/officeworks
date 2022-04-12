// Dependency
import React, { useState, useEffect } from 'react'
import { cloneAndPluck, deepClone } from '../../../helpers/reusable'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import moduleApollo from '../../../lib/apollo_client/poItemApollo'
import poApollo from '../../../lib/apollo_client/poApollo'

// Store & Styles
import styles from '../../../styles/poDetail.module.scss'

// Components
import POheader from './POheader'
import POnavList from './POnavList'
import POitemDetail from './POitemDetail'
import Layout from '../../Layout/Layout'
import Loader from '../../Loader'
import { populateLinkedModules } from '../../../helpers/specific'


export default function POdetailPageComp({ pageId = 'refId' }) {
     { // ?Detail of Rerenders is as follows:
          // On detail page refresh, the page renders 04 times, each time with different state
          // 1: poState : invalid, moduleState : invalid
          // 2: poState : valid, moduleState : invalid
          // 3: poState : valid, moduleState : valid
          // 4: In the last (3rd) render, the loading and activePOdata state was changed (along with the transformation logic) therefore, the page rerenders again
          console.warn('The component renders 04 times on direct pageLoad.');
     }
     const router = useRouter();
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
               setLoading(false);
               // console.log('indexDetail -> poState.list : ', poState.list);
               // console.log('indexDetail -> moduleState.list : ', moduleState.list);

               findAndSetActivePOdata(poState.list, moduleState.list, pageId, setActivePOdata);
          }
     }, [poState, moduleState])

     // Section: Fallback Rendering
     if (loading) return <Loader />
     if (!activePOdata) return router.push('/404') && null;

     console.assert(!!activePOdata?.linkedModules, 'Must Not Happen')

     // Section: Component Rendering
     return (
          <Layout pageClasses={[styles.page]} >

               {/* Header */}
               {
                    <POheader
                         classes={[styles.header]}
                         activePOuuid={activePOdata._id}
                         activePOid={activePOdata.refId}
                         data={activePOdata}
                    />
               }

               {/* Navigation List */}
               {
                    // TODO: No need of ternary operator here as the "Empty LinkedModules" case is already handled earlier
                    activePOdata?.linkedModules?.length > 0
                         ? <POnavList
                              classes={[styles.navList]}
                              itemList={activePOdata.linkedModules}
                              activeIndex={activeItemIndex}
                              setActiveIndex={setActiveItemIndex}
                         />
                         : <p className='note'>No Modules Inside - detailPage/NavList</p>
               }


               {/* Detail */}
               {

                    // ? execute below if modules length === 0
                    activePOdata?.linkedModules?.length > 0 &&
                    <POitemDetail
                         classes={[styles.itemDetail]}
                         activePOid={activePOdata.refId}
                         itemList={activePOdata.linkedModules} // detail for the current PO modules- nested/item/detail level
                         activeItemIndex={activeItemIndex}
                         setActiveItemIndex={setActiveItemIndex}
                    /> || <p className='note'>No Modules Inside - detailPage/ItemDetail</p>
               }
          </Layout>
     )
}


function findAndSetActivePOdata(POlist, ModuleList, pageId, setActivePOdata) {

     const activePO = deepClone(POlist.find(po => po.refId === pageId));
     if (!!activePO) {
          activePO.linkedModules = populateLinkedModules(activePO.linkedModules, ModuleList)
          console.log('setting activePO');
          console.log('indexDetail -> activePO : ', activePO);
          setActivePOdata(activePO);
     } else {
          setActivePOdata(null);
     }

}

