// Dependency
import React, { useEffect, useState } from 'react';

// Store & Styles
import { useReactiveVar } from '@apollo/client';
import mwoApollo, { deleteMWOHandler } from '../../lib/apollo_client/mwoApollo';

// Components
import { Paper } from '@mui/material'
import Layout from '../Layout';
import { deepClone } from '../../helpers/reusable';
import ModalButton from '../UI/ModalButton';
import SearchInput from '../UI/SearchInput';
import moduleApollo from '../../lib/apollo_client/moduleApollo';
import { mapModulesToPO as populateitems } from '../../helpers/specific';
import Loader from '../Loader';
import MWOtable from './MWOtable';
import getActiveProcurementModals from '../Procurement/procurementModalHandler';




export default function MWOPageComp(pProps) {

    const [modalState, setModalState] = useState({
        addForm: { state: false, data: undefined },
        editForm: { state: false, data: undefined },
        summaryDialog: { state: false, data: undefined },
    })

    const MWOstate = useReactiveVar(mwoApollo);
    const ModuleState = useReactiveVar(moduleApollo)
    // const [searchInput, setSearchInput] = useState(false)

    // Section: Component States
    const [MWOlist, setMWOlist] = useState(null)
    const [loading, setLoading] = useState(true);

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

        }
    }, [MWOstate, ModuleState])

    // Section: Fallback Rendering
    if (loading) return <Loader />


    return (
        <>
            {/* Modal Toggle Logic */}
            {getActiveProcurementModals(modalState, setModalState, 'mwo')}
            {/* Normal JSX */}
            <Layout >
                <MWOtable
                    setModalState={setModalState}
                    deleteHandler={deleteMWOHandler}
                    data={MWOlist}
                />
            </Layout>
        </>
    )

}



function populateMWOlist(MWOList, ModuleList) {
    const populatedMWOlist = MWOList.map((currentRecord, idx) => {
        currentRecord = deepClone(currentRecord) // ?so that the original apollo state is not mutated
        // for each of moduleRefs, find the corresponding module data in the ModuleState
        currentRecord.items = populateitems(currentRecord.items, ModuleList)
        return { ...currentRecord, id: idx }
    })
    return populatedMWOlist;

}
