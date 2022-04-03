// Dependency
import React, { useState, useEffect } from 'react'
import { cloneAndPluck, deepClone } from '../../helpers/reusable'
import { useRouter } from 'next/router'
import { useReactiveVar } from '@apollo/client'
import poApollo from '../../lib/apollo_client/poApollo'
import moduleApollo from '../../lib/apollo_client/poItemApollo'

// Store & Styles
import styles from '../../styles/poDetail.module.scss'

// Components
import POheader from './POdetail/POheader'
import POnavList from './POdetail/POnavList'
import POitemDetail from './POdetail/POitemDetail'
import Layout from '../Layout/Layout'

export default function POdetailPageComp({ pageId = 'refId' }) {
     const router = useRouter();

     console.log('---------');

     const [activeItemIndex, setActiveItemIndex] = useState(0); // Control the active/visible item in the PO for item details
     // BUG: server log shows that the POlistState is not updated when IndexDetail is refreshed.
     const ModuleListState = useReactiveVar(moduleApollo) || []
     const POlistState = useReactiveVar(poApollo) || []
     console.log('IndexDetail >POlistState ', POlistState);
     console.log('IndexDetail >ModuleListState ', ModuleListState);
     // console.log('IndexDetail >POlistState > zxc', POlistState?.[0]?.linkedModules?.[2]);

     // BUG: wrapping the following in deepClone seems necessary to let the app read the nested module data:
     // BUG: However, if I try to refresh the detailPage it still throws error.(it looks like null is being passed in deepClone)
     // BUG: looks like multiple passes are made, and the initial passes don't contain the updated State
     const activePOdata = deepClone(POlistState?.find(el => el.refId === pageId))

     // ?populate linkedModules with the data from ModuleListState - moduleApollo dependency means it refreshes when changes are made to ModuleListState
     const transformedLinkedModules = activePOdata?.linkedModules?.map((linkedModule) => {
          const { item: moduleRef, ...rest } = linkedModule;
          const matchingModule = ModuleListState?.find(module => module._id === moduleRef)
          console.assert(!!matchingModule, 'No MatchingModule1. Must Not Happen')
          console.assert(!!matchingModule, 'No MatchingModule. Must Not Happen')
          delete matchingModule?.linkedPOs;
          delete matchingModule?.linkedMWOs;
          delete matchingModule?.__v;

          return {
               ...matchingModule,
               ...rest,
          }
     })
     if (activePOdata?.linkedModules) activePOdata?.linkedModules = transformedLinkedModules

     // prepare module data for NavList (limited to 'name' and 'id' only)
     const navListData = activePOdata?.linkedModules?.map(({ name, id }, order) => {

          return {
               name,
               id,
               order
          }
     });

     // BUG: Router won't work without useEffect
     useEffect(() => {
          if (!(POlistState && ModuleListState))
               return <p>Loading PO/Module List ...  Generate a reusable component</p>

          // TODO: DO NOT wait and redirect
          if (POlistState.length === 0) {
               router.push('/procurement/po/')
               return <p>PO List is empty... Generate a reusable component</p>
          }

          if (!activePOdata) { // if poData is invalid
               POlistState[0]
                    ? router.push(`/procurement/po/${POlistState[0].refId}`)
                    : router.push('/procurement/po/')
               return <div>Invalid(or Empty) PO data. Redirecting to main PO page</div>
          }
     }, [])

     console.assert(!!activePOdata?.linkedModules, 'Must Not Happen')

     return (
          <Layout pageClasses={[styles.page]} >

               {/* Header */}
               {
                    activePOdata &&
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
                              // const itemListArray = props.data.modules.map((el, elIdx) => {el.name})
                              data={navListData} // list of modules in current PO - with item-name & item-ID 
                              activeItemVersion={navListData[activeItemIndex] && navListData[activeItemIndex].id}
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
                         moduleListData={activePOdata.linkedModules} // detail for the current PO modules- nested/item/detail level
                         activeModuleIndex={activeItemIndex}
                         setActiveModuleIndex={setActiveItemIndex}
                    /> || <p className='note'>No Modules Inside - detailPage/ItemDetail</p>
               }
          </Layout>
     )
}

{// !Rerendering 03 times (5 times when detailPage is refreshed)- try to investigate the reason
     // 1. Component renders with null state. After some time the Apollo States change, triggers useEffect and its the setState triggers component re-render
     // 2. Component renders with complete state data but still useEffect runs (--- although the values of dependencies are same but the variables are created anew !!!) - but this should trigger a loop
     // 3. !POitemDetail not rerendered & useEffect not triggered (Apollo States do not change) 
}
{// ? Reason for not using useReactiveVar to set the States directly:
     /*
          // const [ModuleList, setModuleList] = useState(useReactiveVar(moduleApollo))
          // const [POlist, setPOlist] = useState(useReactiveVar(poApollo))
          */
     /* ApolloStates e.g. useReactiveVar(poApollo) get updated when the ApolloFunctions change the data but they don't trigger the state update. SetState has to be used for that. Therefore, useEffect is used to trigger the state update by tracking the change in the ApolloStates. */
}



{ //? code before using the apolloState as primary state 
     /* 
     
     console.log('---------');
     // Initialize the component state with null but track the data for state in useEffect
     const [ModuleList, setModuleList] = useState(null)
     const [POlist, setPOlist] = useState(null)
     const [activeItemIndex, setActiveItemIndex] = useState(0); // Control the active/visible item in the PO for item details

     const ModuleListState = useReactiveVar(moduleApollo)
     const POlistState = useReactiveVar(poApollo)
     // Fetching all the Projects data and storing it in the Variables
     // TODO: try to use the ReactiveVar state as the primary state without setState hooks. i.e. const "state = useReactiveVar(moduleApollo) || null"
     console.log('POlistState', POlistState);

     // Track the changes in ApolloState and update the component state accordingly
     useEffect(() => {
          console.log('useEffect > POlistState');
          setPOlist(POlistState)
          setModuleList(ModuleListState) // TODO: moduleListState is not meant to update in this component. It should be used here to read data only

     }, [POlistState, ModuleListState])

     const activePOdata = POlist?.find(el => el.refId === pageId)
     console.log('IndexDetail >POlist > zxc', POlist?.[0]?.linkedModules?.[2]);

     // ?populate linkedModules with the data from ModuleListState - moduleApollo dependency means it refreshes when changes are made to ModuleListState
     const transformedLinkedModules = activePOdata?.linkedModules?.map((module) => {
          const { item: moduleRef, ...rest } = module;
          console.log('ModuleRef', moduleRef);
          const matchingModule = ModuleListState?.find(module => module._id === moduleRef)
          console.assert(!!matchingModule, 'No MatchingModule. Must Not Happen')
          console.assert(!!matchingModule, 'No MatchingModule. Must Not Happen')
          delete matchingModule?.linkedPOs;
          delete matchingModule?.linkedMWOs;
          delete matchingModule?.__v;

          return {
               ...matchingModule,
               ...rest,
          }
     })
     console.log('transformedLinkedModules', transformedLinkedModules);
     activePOdata?.linkedModules = transformedLinkedModules

      */
}