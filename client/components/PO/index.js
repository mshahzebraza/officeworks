// Dependency
import React, { useState, useEffect, useReducer } from 'react';
import { useReactiveVar } from "@apollo/client";
// Store/State
import { deletePO } from '../../handlers/po/delete';
import { poClientState } from '../../store/config';
// Functions
import { ActiveProcModals } from '../../../helpers/specific/ActiveProcModals';
import { modalReducer } from "../../../helpers/specific/poModalReducer";
// Components
import Layout from '../Layout';
import POtable from './POtable';
import Loader from '../Loader';

export default function PO() {
    const INITIAL_MODAL_STATE = {
        createForm: { show: false, data: undefined },
        updateForm: { show: false, data: undefined },
        summary: { show: false, data: undefined },
    }
    const POstate = useReactiveVar(poClientState)
    const [activeModalsState, dispatchModal] = useReducer(modalReducer, INITIAL_MODAL_STATE)

    // Section: Fallback Rendering
    if (!POstate.fetched) return <Loader />

    console.assert(!!POstate.list, 'No POlist. Must never happen.') // !must never happen

    return (
        <>
            <ActiveProcModals
                procurementType='po'
                activeModalsState={activeModalsState}
                dispatchModal={dispatchModal}
            />
            <Layout >
                <POtable
                    dispatchModal={dispatchModal}
                    deleteHandler={deletePO}
                    data={POstate.list}
                />

            </Layout>
        </>

    )
}
