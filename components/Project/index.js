// Dependency & Helpers
import React, { useEffect, useState } from 'react'
import { concatStrings, deepClone } from '../../helpers/reusable'

// Store

// Styles
import styles from '../../styles/projectDirectory.module.scss'
// Components
import Layout from '../Layout/Layout'
import Loader from '../Loader'
import SideNav from './SideNav/SideNav'
import ProjectDetail from './ProjectDetail/ProjectDetail'
import ProjectSummary_Form from './ProjectDetail/ProjectForms/ProjectSummary_Form'
import SearchInput from '../UI/SearchInput'
import ModalButton from '../UI/ModalButton'
import { useReactiveVar } from '@apollo/client'
import projectApollo from '../../lib/apollo_client/projectApollo'


export default function ProjectPageComp() {
     // Fetching all the Projects data


     // Section: Component States
     // initialize component state
     const [searchInput, setSearchInput] = useState(false)
     const [projectList, setProjectList] = useState(null)
     const [loading, setLoading] = useState(true);
     const ProjectState = useReactiveVar(projectApollo)
     const [activeProjectIndex, setActiveProjectIndex] = useState(null)


     // Section: State Transforms
     useEffect(() => {
          if (ProjectState.fetched) {
               setLoading(false);
               setProjectList(ProjectState.list)

               // Filtering Projects w.r.t search ID 
               if (searchInput) {
                    // Filtering Projects w.r.t search ID (Case Insensitive)
                    setProjectList((prevProjectList) =>
                         prevProjectList.filter(project => {
                              return project.summary.nomenclature
                                   .toLowerCase()
                                   .includes(
                                        searchInput.toLowerCase()
                                   )
                         })
                    )
               }
          }

     }, [ProjectState, searchInput])

     // Section: Fallback Rendering
     if (loading) return <Loader />

     console.assert(!!projectList, 'No projectList. Must never happen.') // ?should never happen


     // Fetching data of selected Project Id (highlighted in the SideNav)
     const activeProject = projectList?.[activeProjectIndex];

     return (
          <Layout pageClasses={[styles.container]}>
               <section className={concatStrings([`pageHeader`, styles.header])}>

                    <h1 className={`pageTitle`} > Projects</h1>
                    <SearchInput stateVariables={[searchInput, setSearchInput]} />
                    <ModalButton caption='Add Project' ModalComponent={ProjectSummary_Form} />

               </section>

               <SideNav
                    outerClasses={[styles.sideNav]}
                    list={projectList}
                    projectIndexStates={[activeProjectIndex, setActiveProjectIndex]}
               // detailSummaryStates={[activeProjectTypeIndex, setActiveProjectTypeIndex, activeProjectIndex, setActiveProjectIndex]}
               // detailSummaryStates={[activeProjectIndex, setActiveProjectIndex]}
               />
               <ProjectDetail
                    outerClasses={[styles.body]}
                    activeProjectData={activeProject}
               />



          </Layout>
     )
}
