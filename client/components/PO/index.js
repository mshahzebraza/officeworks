// Dependency
import React, { useState, useEffect } from 'react';
import { useReactiveVar } from "@apollo/client";
// Store/State
import { deletePO } from '../../handlers/po/delete';
import { poClientState, moduleClientState } from '../../store/config';
// Functions
import { deepClone } from '../../../helpers/reusable';
import { mapModulesToPO } from '../../../helpers/specific';
import { getActiveProcModals } from '../../../helpers/specific/getActiveProcModals';

// Components
import Layout from '../Layout';
import POtable from './POtable';
import Loader from '../Loader';

export default function PO() {
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
            const populatedPOlist = POstate.list
            setPOlist(populatedPOlist)
        }
    }, [POstate, ModuleState])


    // Section: Fallback Rendering
    if (loading) return <Loader />

    console.assert(!!POlist, 'No POlist. Must never happen.') // !must never happen


    return (
        <>
            {/* Modal Logic controlled from within the MT-action-buttons */}
            {getActiveProcModals(modalState, setModalState, 'po')}
            <Layout >
                <POtable
                    setModalState={setModalState}
                    deleteHandler={deletePO}
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


