// Dependency
import React, { useState, useEffect } from 'react';
import { useReactiveVar } from "@apollo/client";
// Store/State
import { deletePO } from '../../handlers/po/delete';
import { poClientState } from '../../store/config';
// Functions
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

    // Section: Component States
    // ? See if the POlist & loading state are really needed when fetched and list prop can be used.
    // ? also check if the clientStates can be extended to include the error,loading,data state...
    const [POlist, setPOlist] = useState(null)
    const [loading, setLoading] = useState(true);

    // Section: State Transforms
    useEffect(() => {
        if (POstate.fetched) {
            setLoading(false);
            setPOlist(POstate.list)
        }
    }, [POstate])


    // Section: Fallback Rendering
    if (!POstate.fetched) return <Loader />

    console.assert(!!POstate.list, 'No POlist. Must never happen.') // !must never happen

    // use useReducer to dispatch showCreateForm,closeCreateForm,closeModal 

    return (
        <>
            {getActiveProcModals(modalState, setModalState, 'po')}
            <Layout >
                <POtable
                    setModalState={setModalState}
                    deleteHandler={deletePO}
                    data={POstate.list}
                />

            </Layout>
        </>

    )
}
