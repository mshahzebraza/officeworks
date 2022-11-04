// Dependency
import React, { useState, useEffect } from 'react';

// Store & Styles

// Components
import Layout from '../Layout';
// import { deepClone } from '../../helpers/reusable';

import { useReactiveVar } from "@apollo/client";
import poClientState, { deletePOHandler } from '../../lib/apollo_client/poClientState';
import moduleClientState from '../../lib/apollo_client/moduleClientState';
import { deepClone } from '../../helpers/reusable';
import Loader from '../Loader';
import { mapModulesToPO } from '../../helpers/specific';
import POtable from './POtable';
import getActiveProcurementModals from '../../../helpers/specific/procurementModalHandler';




export default function PO(pProps) {

    const [modalState, setModalState] = useState({
        addForm: { state: false, data: undefined },
        editForm: { state: false, data: undefined },
        summaryDialog: { state: false, data: undefined },
    })
    const POstate = useReactiveVar(poClientState)
    const ModuleState = useReactiveVar(moduleClientState)

    // Section: Component States
    const [POlist, setPOlist] = useState(null)
    const [loading, setLoading] = useState(true);

    // Section: State Transforms
    useEffect(() => {
        // TODO: handle the case when loading state remains true for a long time. re-route to 404 page if stuck in loading state for a long time
        // const loadingTimeout = setTimeout(() => console.error('Loading failed'), 3000)
        if (POstate.fetched && ModuleState.fetched) {
            setLoading(false);
            // populate POstate.list and save it to POlist
            const populatedPOlist = populatePOlist(POstate.list, ModuleState.list)
            setPOlist(populatedPOlist)
        }
    }, [POstate, ModuleState])


    // Section: Fallback Rendering
    if (loading) return <Loader />

    console.assert(!!POlist, 'No POlist. Must never happen.') // !must never happen


    return (
        <>
            {/* Modal Logic controlled from within the MT-action-buttons */}
            {getActiveProcurementModals(modalState, setModalState, 'po')}
            <Layout >
                <POtable
                    setModalState={setModalState}
                    deleteHandler={deletePOHandler}
                    data={POlist}
                />

            </Layout>
        </>

    )
}

function populatePOlist(POList, ModuleList) {

    const populatedPOlist = POList.map((currentRecord, idx) => {
        currentRecord = deepClone(currentRecord) // ?so that the original apollo state is not mutated
        // for each of moduleRefs, find the corresponding module data in the ModuleState
        currentRecord.items = mapModulesToPO(currentRecord.items, ModuleList)
        return { ...currentRecord, id: idx }
    })

    return populatedPOlist;
}


