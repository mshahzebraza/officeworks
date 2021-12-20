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


  // const [activeDetailItem, setActiveDetailItem] = useState('')
  // const [activeDetail, setActiveDetail] = useState('')
  const [activeProjectCategory, setActiveProjectCategory] = useState('')
  const [activeProjectNomenclature, setActiveProjectNomenclature] = useState('')

  const allProjects = useSelector(state => state.project)

  const activeCategoryObject = allProjects.find(category => category.name === activeProjectCategory);
  const activeCategoryProjects = activeCategoryObject && activeCategoryObject.projects;
  const activeProject = activeCategoryProjects && activeCategoryProjects.find(project => project.nomenclature === activeProjectNomenclature);
  console.log(activeProject);

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

        {/* <button type='button' onClick={() => setShowModal(true)} >Add a PO</button> */}
        {/* {showModal && <AddPO_Modal closer={() => setShowModal(false)} />} */}

      </section>
      <SideNav
        outerClasses={[styles.sideNav]}
        list={allProjects}
        activeDetail={activeProjectCategory}
        setActiveDetail={setActiveProjectCategory}
        activeDetailItem={activeProjectNomenclature}
        setActiveDetailItem={setActiveProjectNomenclature}
      />
      {/* <div className={styles.body}>sad</div> */}
      <ProjectDetail
        outerClasses={[styles.body]}
        activeCategory={activeProjectCategory}
        activeNomenclature={activeProjectNomenclature}
        activeProject={activeProject}
      />

    </Layout>
  )
}
