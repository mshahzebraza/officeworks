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


export default function ProjectDirectory() {

  const [filterState, setFilterState] = useState(false)

  const [showSummaryForm, setShowSummaryForm] = useState(false);

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



  const filterProjects = (evt) => {
    evt.preventDefault();
    setFilterState(evt.target[0].value)
    console.log(evt.target[0].value);
    // evt.target[0].value = ''
  }

  return (
    <Layout pageClasses={[styles.container]}>
      <section className={concatStrings([`pageHeader`, styles.header])}>

        <h1 className={`pageTitle`} > Projects</h1>

        <form className={`pageSearchForm`} onSubmit={filterProjects} >
          <label htmlFor="searchById">Search by ID</label>
          <input id='searchById' type="text" minLength={8} value={filterState || ''} onChange={(evt) => setFilterState(evt.target.value)} className={`pageSearchInput`} required />
          {/* <button className={`pageSearchBtn`} >Search by ID</button> */}
        </form>

        <button type='button' onClick={() => setShowSummaryForm(true)} >Add a Project</button>
        {showSummaryForm && <ProjectSummary_Form closer={() => setShowSummaryForm(false)} />}

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
