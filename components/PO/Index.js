// Dependency
import React, { useState, useEffect } from 'react';

// Store & Styles

import styles from '../../styles/poDirectory.module.scss'

// Components
import PO_Form from './PO_Form'
import POentry from './POentry'
import Layout from '../Layout/Layout';
// import { deepClone } from '../../helpers/reusable';
import ModalButton from '../UI/ModalButton';
import SearchInput from '../UI/SearchInput';


import { useReactiveVar } from "@apollo/client";
import poApollo from '../../lib/apollo_client/poApollo';
import moduleApollo from '../../lib/apollo_client/poItemApollo';
import { deepClone } from '../../helpers/reusable';




export default function POpageComp(pProps) {

     // initialize component state
     const [searchInput, setSearchInput] = useState(false)
     const [POlist, setPOlist] = useState(null)

     // Fetching all the Projects data
     const POlistState = useReactiveVar(poApollo)
     const ModuleListState = useReactiveVar(moduleApollo)


     useEffect(() => {
          setPOlist(POlistState)

     }, [POlistState])
     if (!POlist) return <p>Loading PO List...</p> // TODO: Loading spinner must be shown only until fetching is not complete. Right now it would show even if the fetched data is invalid

     // Apply search filter to Limit the PO list to search results
     if (searchInput) {
          // Filtering Projects w.r.t search ID (Case Insensitive)
          POlist = POlist.filter((curPO) => curPO.refId.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()));
     }

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
                         // By default, POlist's linkedModules only contain a reference to the modules. The following code compares the references with the ModuleListState and returns the full module data.
                         POlist?.map((poData, idx) => {
                              poData = deepClone(poData) // ?so that the original apollo state is not mutated

                              // for each of moduleRefs, find the corresponding module data in the ModuleListState
                              const transformedLinkedModules = poData.linkedModules.map((module) => {
                                   const { item: moduleRef, ...rest } = module;
                                   const matchingModule = ModuleListState.find(module => module._id === moduleRef)
                                   delete matchingModule?.linkedPOs;
                                   delete matchingModule?.linkedMWOs;
                                   return {
                                        ...matchingModule,
                                        ...rest,
                                   }
                              })
                              poData.linkedModules = transformedLinkedModules

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
