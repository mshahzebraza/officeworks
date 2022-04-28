// Dependency
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux'

// Store & Styles
import styles from '../../styles/poDirectory.module.scss'
import { useReactiveVar } from '@apollo/client';
import mwoApollo from '../../lib/apollo_client/mwoApollo';

// Components
import MWO_Form from './Forms/MWO_Form';
import MWOentry from './MWOentry'
import Layout from '../Layout/Layout';
import { checkDataType, deepClone } from '../../helpers/reusable';
import ModalButton from '../UI/ModalButton';
import SearchInput from '../UI/SearchInput';
import moduleApollo from '../../lib/apollo_client/poItemApollo';
import { populateLinkedModules } from '../../helpers/specific';
import Loader from '../Loader';

export default function MWOPageComp(pProps) {
     // Section: Component States
     // initialize component state
     const [searchInput, setSearchInput] = useState(false)
     const [MWOlist, setMWOlist] = useState(null)
     const [loading, setLoading] = useState(true);
     const MWOstate = useReactiveVar(mwoApollo);
     const ModuleState = useReactiveVar(moduleApollo)

     // Section: State Transforms
     useEffect(() => {
          // TODO: handle the case when loading state remains true for a long time. re-route to 404 page if stuck in loading state for a long time
          // const loadingTimeout = setTimeout(() => console.error('Loading failed'), 3000)
          if (MWOstate.fetched && ModuleState.fetched) {
               // clearTimeout(loadingTimeout);
               setLoading(false);
               // populate MWOstate.list and save it to MWOlist
               const populatedMWOlist = populateMWOlist(MWOstate.list, ModuleState.list)
               setMWOlist(populatedMWOlist)

               //? Apply search filter to Limit the PO list to search results
               if (searchInput) {
                    // Filtering Projects w.r.t search ID (Case Insensitive)
                    setMWOlist((prevMWOlist) =>
                         prevMWOlist.filter(mwo =>
                              mwo.mwoId
                                   .toLowerCase()
                                   .includes(
                                        searchInput.toLowerCase()
                                   )
                         )
                    )
               }


          }
     }, [MWOstate, ModuleState, searchInput])


     // Section: Fallback Rendering
     if (loading) return <Loader />

     return (
          <Layout pageClasses={[styles.container]} >

               <section className={`pageHeader`}>
                    <h1 className={`pageTitle`} > Mfg Work Orders</h1>
                    <SearchInput stateVariables={[searchInput, setSearchInput]} />
                    <ModalButton caption='Add MWO' ModalComponent={MWO_Form} />
               </section>

               <section className={`pageBody`} >
                    <MWOentry
                         header={true}
                    />
                    {
                         MWOlist.map((mwoData, idx) => {
                              return <MWOentry
                                   key={idx}
                                   mwoData={{ index: idx, ...mwoData }}
                              />
                         })
                    }
               </section>

          </Layout>
     )

}



function populateMWOlist(MWOList, ModuleList) {
     const populatedMWOlist = MWOList.map((mwoData, idx) => {
          mwoData = deepClone(mwoData) // ?so that the original apollo state is not mutated
          // for each of moduleRefs, find the corresponding module data in the ModuleState
          mwoData.linkedModules = populateLinkedModules(mwoData.linkedModules, ModuleList)
          return mwoData
     })
     return populatedMWOlist;

}
