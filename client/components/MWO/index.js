// Dependency
import React, { useReducer } from 'react';
import { useReactiveVar } from "@apollo/client";
// Store & Styles
import { deleteMWO } from '../../handlers/mwo/delete';
import { mwoClientState } from '../../store/config';
import { INITIAL_MODAL_STATE } from "../../../client/constants/initialProcModalStates";
// Functions
import { ActiveProcModals } from '../../../helpers/specific/ActiveProcModals';
import { modalReducer } from "../../../helpers/specific/mwoModalReducer";
// Components
import Layout from '../Layout';
import MWOtable from './MWOtable';
import Loader from '../Loader';

export default function MWO() {
    const MWOstate = useReactiveVar(mwoClientState)
    const [activeModalsState, dispatchModal] = useReducer(modalReducer, INITIAL_MODAL_STATE)

    // Section: Fallback Rendering
    if (!MWOstate.fetched) return <Loader />

    console.assert(!!MWOstate.list, 'No MWOlist. Must never happen.') // !must never happen

    return (
        <>
            <ActiveProcModals
                procurementType='mwo'
                activeModalsState={activeModalsState}
                dispatchModal={dispatchModal}
            />
            <Layout >
                <MWOtable
                    dispatchModal={dispatchModal}
                    deleteHandler={deleteMWO}
                    data={MWOstate.list}
                />
            </Layout>
        </>
    )

}