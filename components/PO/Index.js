// Dependency
import React, { useState, useEffect } from 'react';

// Store & Styles

import styles from '../../styles/poDirectory.module.scss'

// Components
import PO_Form from './Forms/PO_Form';
import POentry from './POentry'
import Layout from '../Layout/Layout';
// import { deepClone } from '../../helpers/reusable';
import ModalButton from '../UI/ModalButton';
import SearchInput from '../UI/SearchInput';


import { useReactiveVar } from "@apollo/client";
import poApollo from '../../lib/apollo_client/poApollo';
import moduleApollo from '../../lib/apollo_client/poItemApollo';
import { deepClone } from '../../helpers/reusable';
import Loader from '../Loader';
import { populateLinkedModules } from '../../helpers/specific';
// import { useRouter } from 'next/router';

export default function POpageComp(pProps) {
     // const router = useRouter();

     // Section: Component States
     // initialize component state
     const [searchInput, setSearchInput] = useState(false)
     const [POlist, setPOlist] = useState(null)
     const [loading, setLoading] = useState(true);
     const POstate = useReactiveVar(poApollo)
     const ModuleState = useReactiveVar(moduleApollo)

     // Section: State Transforms
     useEffect(() => {
          // TODO: handle the case when loading state remains true for a long time. re-route to 404 page if stuck in loading state for a long time
          // const loadingTimeout = setTimeout(() => console.error('Loading failed'), 3000)
          if (POstate.fetched && ModuleState.fetched) {
               // clearTimeout(loadingTimeout);
               setLoading(false);
               // populate POstate.list and save it to POlist
               const populatedPOlist = populatePOlist(POstate.list, ModuleState.list)
               setPOlist(populatedPOlist)

               //? Apply search filter to Limit the PO list to search results
               if (searchInput) {
                    // Filtering Projects w.r.t search ID (Case Insensitive)
                    setPOlist((prevPOlist) =>
                         prevPOlist.filter(po =>
                              po.refId
                                   .toLowerCase()
                                   .includes(
                                        searchInput.toLowerCase()
                                   )
                         )
                    )
               }


          }
     }, [POstate, ModuleState, searchInput])
     // }, [poApollo(), moduleApollo(), searchInput])


     // Section: Fallback Rendering
     if (loading) return <Loader />

     console.assert(!!POlist, 'No POlist. Must never happen.') // ?should never happen


     return (
          <Layout pageClasses={[styles.container]} >

               <section className={`pageHeader`}>
                    <h1 className={`pageTitle`} > Purchase Orders</h1>
                    <SearchInput stateVariables={[searchInput, setSearchInput]} />
                    <ModalButton caption='Add PO' ModalComponent={PO_Form} />
               </section>

               <section className={`pageBody`} >
                    <POentry
                         header={true}
                    />
                    {
                         // By default, POlist's linkedModules only contain a reference to the modules. The following code compares the references with the ModuleState and returns the full module data.
                         POlist.map((poData, idx) => {

                              return <POentry
                                   key={idx}
                                   poData={{ index: idx, ...poData }}
                              />

                         })
                    }

               </section>
          </Layout>
     )
}
function populatePOlist(POList, ModuleList) {
     const populatedPOlist = POList.map((poData, idx) => {
          poData = deepClone(poData) // ?so that the original apollo state is not mutated
          // for each of moduleRefs, find the corresponding module data in the ModuleState
          poData.linkedModules = populateLinkedModules(poData.linkedModules, ModuleList)
          return poData
     })
     return populatedPOlist;

}