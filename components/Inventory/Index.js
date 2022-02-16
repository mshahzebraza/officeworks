// Dependency & Helpers
import React, { useState } from 'react'
import { concatStrings } from '../../helpers/reusable'
// Store

// Styles
import styles from '../../styles/projectDirectory.module.scss'

// Components
import Layout from '../../components/Layout/Layout'
import SearchInput from '../UI/SearchInput'
import ModalButton from '../UI/ModalButton'


export default function ProjectPageComp() {
  // Fetching all the Projects data
  // const projectList = useSelector(state => state.projectList)

  const [filterState, setFilterState] = useState(false)

  const [activeProjectIndex, setActiveProjectIndex] = useState(false)


  // let filteredProjects = useReactiveVar(projectApollo);


  // Filtering Projects w.r.t search ID
  if (filterState) {
    // filteredProjects = filteredProjects?.filter((curProject) => {
    //   return curProject.summary?.nomenclature?.toLocaleLowerCase().includes(filterState?.toLocaleLowerCase());
    // });
  }





  return (
    <Layout pageClasses={[styles.container]}>
      <section className={concatStrings([`pageHeader`, styles.header])}>

        <h1 className={`pageTitle`} > Inventory</h1>
        <SearchInput stateVariables={[filterState, setFilterState]} />
        <ModalButton caption='Add Inv (Txn)' ModalComponent={'ProjectSummary_Form'} />

      </section>
      <section className={`pageBody`} >
        {/* <POentry
          header={true}
        /> */}
        <div className="s">
          'Hello Inventory'

        </div>
      </section>




    </Layout>
  )
}
