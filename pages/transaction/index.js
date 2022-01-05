// Dependency & Helpers
import React, { useState } from 'react'
import { concatStrings } from '../../helpers/reusable'
import { useSelector } from 'react-redux'
// Store
// Styles
import styles from '../../styles/inventoryDirectory.module.scss'

// Components
import Layout from '../../components/Layout/Layout'
import SearchInput from '../../components/UI/SearchInput'
import ModalButton from '../../components/UI/ModalButton'

export default function TransactionDirectory(pProps) {

  let data;
  const poList = useSelector(state => state.poList)
  const mwoList = useSelector(state => state.mwoList)


  data = {
    poInv: filterPOtransaction(poList),
    mwoInv: filterMWOtransaction(mwoList)
  }


  console.log('data', data);
  const [filterState, setFilterState] = useState(false)
  return (
    <Layout pageClasses={[styles.container]}>
      <section className={concatStrings([`pageHeader`, styles.header])}>

        <h1 className={`pageTitle`} > Transaction</h1>
        <SearchInput stateVariables={[filterState, setFilterState]} />
        {/* <ModalButton caption='Add Project' ModalComponent={ProjectSummary_Form} /> */}

      </section>




    </Layout>
  )
}


export function filterPOtransaction(poList) {
  let result;


  result = poList.reduce((acc, cur, arr) => {
    if (!cur.items) return acc;

    return acc.concat(cur.items);
  }, []);

  return result;
}

export function filterMWOtransaction(mwoList) {
  let result;


  result = mwoList.reduce((acc, cur, arr) => {
    if (!cur.items) return acc;

    return acc.concat(cur.items);
  }, []);

  return result;
}


/* 


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
  // Fetching all the Projects data
  const projectList = useSelector(state => state.projectList)

  const [filterState, setFilterState] = useState(false)

  const [activeProjectIndex, setActiveProjectIndex] = useState(false)


  let filteredProjects = deepClone(projectList);

  // Filtering Projects w.r.t search ID 
  if (filterState) {
    filteredProjects = filteredProjects.filter((curProject) => {
      return curProject.nomenclature.includes(filterState.toLocaleUpperCase());
    });
  }

  // Fetching data of selected Project Id (highlighted in the SideNav)
  const activeProject = filteredProjects[activeProjectIndex];




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



 */