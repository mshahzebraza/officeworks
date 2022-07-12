// Dependency
import React, { useState, useEffect } from 'react';

// Store & Styles

import styles from '../../styles/poDirectory.module.scss'

// Components
import POentry from './POentry'
import Layout from '../Layout/Layout';
// import { deepClone } from '../../helpers/reusable';
import ModalButton from '../UI/ModalButton';
import SearchInput from '../UI/SearchInput';


import { useReactiveVar } from "@apollo/client";
import poApollo from '../../lib/apollo_client/poApollo';
import moduleApollo from '../../lib/apollo_client/moduleApollo';
import { deepClone } from '../../helpers/reusable';
import Loader from '../Loader';
import { populateLinkedModules } from '../../helpers/specific';
import Source_Form from '../Procurement/Forms/Source_Form';
import POtable from './POtable';
import { Paper } from '@mui/material'

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


    // Section: Fallback Rendering
    if (loading) return <Loader />

    console.assert(!!POlist, 'No POlist. Must never happen.') // ?should never happen


    return (
        <Layout pageClasses={[styles.container]} >
            <Paper>
                <POtable
                // loading={loading}

                />
            </Paper>
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
