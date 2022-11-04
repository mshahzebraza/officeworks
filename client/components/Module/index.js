// Dependency & Helpers
import React, { useEffect, useState } from 'react'
import { concatStrings } from '../../helpers/reusable'
import { useReactiveVar } from '@apollo/client'


// Store

// Styles
import styles from '../../styles/inventoryDirectory.module.scss'

// Components
import Layout from '../Layout'
import SearchInput from '../UI/SearchInput'
import ModalButton from '../UI/ModalButton'
import ModuleEntry from './ModuleEntry'
import moduleClientState from '../../lib/apollo_client/moduleClientState'
import Loader from '../Loader'
import Module_Form from './Forms/Module_Form'


export default function Module() {

    // Section: Component States
    // initialize component state
    const [searchInput, setSearchInput] = useState(false)
    const [moduleList, setModuleList] = useState(null)
    const [loading, setLoading] = useState(true);
    const ModuleState = useReactiveVar(moduleClientState)


    // Section: State Transforms
    useEffect(() => {
        if (ModuleState.fetched) {
            setLoading(false);
            setModuleList(ModuleState.list)

            // Filtering Modules w.r.t search ID 
            if (searchInput) {
                // Filtering Modules w.r.t search ID (Case Insensitive)
                setModuleList((prevModuleList) =>
                    prevModuleList.filter(module => {
                        return module.id
                            .toLowerCase()
                            .includes(
                                searchInput.toLowerCase()
                            )
                    })
                )
            }
        }

    }, [ModuleState, searchInput])


    // Section: Fallback Rendering
    if (loading) return <Loader />

    console.assert(!!moduleList, 'No moduleList. Must never happen.') // ?should never happen

    console.log("moduleList", moduleList);
    return (
        <Layout pageClasses={[styles.container]}>
            <section className={concatStrings([`pageHeader`, styles.header])}>

                <h1 className={`pageTitle`} > Modules</h1>
                <SearchInput stateVariables={[searchInput, setSearchInput]} />
                <ModalButton caption='Add Module' ModalComponent={Module_Form} />

            </section>
            <section className={`pageBody`} >
                <ModuleEntry header />
                {/* Create a list of ModuleEntry against each of filtered store items */}
                {
                    moduleList?.map((module, index) => {
                        return <ModuleEntry key={index} moduleData={{ ...module, index: index }} />
                    })
                }

            </section>

        </Layout >
    )
}
