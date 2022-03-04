// Dependency & Helpers
import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
import { concatStrings, deepClone } from '../../helpers/reusable'

// Store

// Styles
import styles from '../../styles/projectDirectory.module.scss'

// Components
import Layout from '../Layout/Layout'
import SideNav from './SideNav/SideNav'
import ProjectDetail from './ProjectDetail/ProjectDetail'
import ProjectSummary_Form from './ProjectDetail/ProjectForms/ProjectSummary_Form'
import SearchInput from '../UI/SearchInput'
import ModalButton from '../UI/ModalButton'
import { useReactiveVar } from '@apollo/client'
import projectApollo from '../../lib/apollo_client/projectApollo'


export default function ProjectPageComp() {
  // Fetching all the Projects data
  // const projectList = useSelector(state => state.projectList)

  const [filterState, setFilterState] = useState(false)

  const [activeProjectIndex, setActiveProjectIndex] = useState(false)

  let filteredProjects = useReactiveVar(projectApollo);

  // Filtering Projects w.r.t search ID 
  if (filterState) {
    filteredProjects = filteredProjects?.filter((curProject) => {
      return curProject.summary?.nomenclature?.toLocaleLowerCase().includes(filterState?.toLocaleLowerCase());
    });
  }

  // Fetching data of selected Project Id (highlighted in the SideNav)
  const activeProject = filteredProjects?.[activeProjectIndex];


  return (
    <Layout pageClasses={[styles.container]}>
      <section className={concatStrings([`pageHeader`, styles.header])}>

        <h1 className={`pageTitle`} > sProjects</h1>
        <SearchInput stateVariables={[filterState, setFilterState]} />
        <ModalButton caption='Add Project' ModalComponent={ProjectSummary_Form} />

      </section>

      <SideNav
        outerClasses={[styles.sideNav]}
        list={filteredProjects}
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
