// Dependency & Helpers
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { concatStrings, deepClone } from '../../helpers/reusable'

// Store

// Styles
import styles from '../../styles/projectDirectory.module.scss'

// Components
import Layout from '../../components/Layout/Layout'
import SideNav from '../../components/Project/SideNav/SideNav'
import ProjectDetail from '../../components/Project/ProjectDetail/ProjectDetail'
import ProjectSummary_Form from '../../components/Project/ProjectDetail/ProjectForms/ProjectSummary_Form'
import SearchInput from '../../components/UI/SearchInput'
import ModalButton from '../../components/UI/ModalButton'


export default function ProjectDirectory() {

  const [filterState, setFilterState] = useState(false)

  const [activeProjectTypeIndex, setActiveProjectTypeIndex] = useState(false)
  const [activeProjectIndex, setActiveProjectIndex] = useState(false)

  // Fetching all the Projects data
  const allProjects = useSelector(state => state.project)

  let filteredProjects = deepClone(allProjects);

  if (filterState) {
    // Filtering Projects w.r.t search ID 
    filteredProjects = filteredProjects.map((curCatList) => {
      curCatList.projects = curCatList.projects.filter((curProject) => {
        return curProject.nomenclature.includes(filterState.toLocaleUpperCase());
      });
      return curCatList;
    });
  }



  // Fetching data of selected Project Id (highlighted in the SideNav)
  const activeTypeProjectObject = filteredProjects[activeProjectTypeIndex];
  const activeTypeProjectList = activeTypeProjectObject && activeTypeProjectObject.projects;
  const activeProject = activeTypeProjectList && activeTypeProjectList[activeProjectIndex];


  return (
    <Layout pageClasses={[styles.container]}>
      <section className={concatStrings([`pageHeader`, styles.header])}>

        <h1 className={`pageTitle`} > Projects</h1>
        <SearchInput stateVariables={[filterState, setFilterState]} />
        <ModalButton caption='Add Project' ModalComponent={ProjectSummary_Form} />

      </section>

      <SideNav
        outerClasses={[styles.sideNav]}
        list={filteredProjects}
        detailSummaryStates={[activeProjectTypeIndex, setActiveProjectTypeIndex, activeProjectIndex, setActiveProjectIndex]}
      />
      <ProjectDetail
        outerClasses={[styles.body]}
        activeProjectData={activeProject}
      />



    </Layout>
  )
}
