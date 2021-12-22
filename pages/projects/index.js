// Dependency & Helpers
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { concatStrings } from '../../helpers/reusable'

// Store

// Styles
import styles from '../../styles/projectDirectory.module.scss'

// Components
import Layout from '../../components/Layout/Layout'
import SideNav from '../../components/Project/SideNav/SideNav'
import ProjectDetail from '../../components/Project/ProjectDetail/ProjectDetail'


export default function ProjectDirectory() {


  const [activeProjectType, setActiveProjectType] = useState('')
  const [activeProjectNomenclature, setActiveProjectNomenclature] = useState('')

  // Fetching all the Projects data
  const allProjects = useSelector(state => state.project)

  // Fetching data of selected Project Id (highlighted in the SideNav)
  const activeTypeProjectObject = allProjects.find(category => category.name === activeProjectType);
  const activeTypeProjectList = activeTypeProjectObject && activeTypeProjectObject.projects;
  const activeProject = activeTypeProjectList && activeTypeProjectList.find(project => project.nomenclature === activeProjectNomenclature);


  const filterProjects = (evt) => {
    evt.preventDefault();
    console.log(evt.target[0].value);
    evt.target[0].value = ''
  }

  return (
    <Layout pageClasses={[styles.container]}>
      <section className={concatStrings([`pageHeader`, styles.header])}>

        <h1 className={`pageTitle`} > Projects</h1>

        <form className={`pageSearchForm`} onSubmit={filterProjects} >
          <input type="text" minLength={8} className={`pageSearchInput`} required />
          <button className={`pageSearchBtn`} >Search by ID</button>
        </form>


      </section>

      <SideNav
        outerClasses={[styles.sideNav]}
        list={allProjects}
        detailSummaryStates={[activeProjectType, setActiveProjectType, activeProjectNomenclature, setActiveProjectNomenclature]}
      />

      <ProjectDetail
        outerClasses={[styles.body]}
        activeProjectData={activeProject}
      />

    </Layout>
  )
}
