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
     { // Detail of Rerenders is as follows:
          // On detail page refresh, the page renders thrice, each time with different state
          // 1: POlistState : invalid, ModuleListState : invalid
          // 2: POlistState : valid, ModuleListState : invalid
          // 3: POlistState : valid, ModuleListState : valid
          console.warn('The component renders thrice on direct pageLoad.');
     }
     const router = useRouter();

     console.log('POdetailPageComp >pageId ', pageId);



     const [activeItemIndex, setActiveItemIndex] = useState(0); // Control the active/visible item in the PO for item details
     const ModuleListState = useReactiveVar(moduleApollo) /* || [] */
     const POlistState = useReactiveVar(poApollo) /* || [] */

     // check & show loading state if the state is empty
     if (POlistState.length === 0 || ModuleListState.length === 0) {
          console.warn('POlistState/ModuleList is empty. Must Not Happen');
          return <div>No items found / Loading Items...</div>
     }

     // check the POlist for the refId!==pageId, return 404 if not found
     const activePOdata = POlistState.find(el => el.refId === pageId)
     if (!activePOdata) {
          console.warn('"activePOdata" is empty. Check pageId. Must Not Happen');
          // TODO: either 404 or redirect to the first PO or to poList page
          return <div>404 Not Found</div>
     }

     // ?populate linkedModules with the data from ModuleListState - moduleApollo dependency means it refreshes when changes are made to ModuleListState
     const transformedLinkedModules = activePOdata.linkedModules.map((linkedModule) => {
          const { item: moduleRef, ...rest } = linkedModule;
          if (moduleRef === undefined) { //? if un-transformed data is not available then ...
               // delete linkedModule.linkedPOs;
               // delete linkedModule.linkedMWOs;
               // delete linkedModule.__v;
               return linkedModule;
          }

          console.log('');
          const matchingModule = ModuleListState.find(module => {
               console.log('module', module);
               return module._id === moduleRef
          })
          console.assert(matchingModule, 'matchingModule is empty. Must Not Happen', matchingModule);
          // BUG: sometimes the matchingModule is not found in the ModuleListState. Probably because the ModuleListState is not updated yet.
          // !trying to mutate the matchingModule directly doesn't work as it is a direct fragment of the ApolloState
          // ? find method returns a reference for a reference data-type, not a copy of the object
          // const matchingModuleClone = deepClone(matchingModule);
          const matchingModuleClone = { ...matchingModule };
          delete matchingModuleClone.linkedPOs;
          delete matchingModuleClone.linkedMWOs;
          delete matchingModuleClone.__v;

          return {
               ...matchingModuleClone,
               ...rest,
          }

     })

     activePOdata.linkedModules = transformedLinkedModules
     console.log('activePOdata.linkedModules', activePOdata.linkedModules);




     // prepare module data for NavList (limited to 'name' and 'id' only)
     const navListData = activePOdata.linkedModules?.map(({ name, id }, order) => {
          return {
               name,
               id,
               order
          }
     });

     console.assert(!!activePOdata?.linkedModules, 'Must Not Happen')

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
                              // const itemListArray = props.data.modules.map((el, elIdx) => {el.name})
                              data={navListData} // list of modules in current PO - with item-name & item-ID 
                              activeItemVersion={navListData[activeItemIndex] && navListData[activeItemIndex].id}
                              activeIndex={activeItemIndex}
                              setActiveIndex={setActiveItemIndex}
                         />
                         : <p className='note'>No Modules Inside - detailPage/NavList</p>
               }


               {console.log('activePOdata.linkedModules', activePOdata.linkedModules)}
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