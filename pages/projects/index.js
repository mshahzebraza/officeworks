import React from 'react'
import Layout from '../../components/Layout/Layout'
import SideNav from '../../components/SideNav/SideNav'
import styles from '../../styles/projectDirectory.module.scss'

export default function ProjectDirectory() {
  const filterProjects = (evt) => {
    evt.preventDefault();
    console.log(evt.target[0].value);
    evt.target[0].value = ''
  }

  return (
    <Layout pageClasses={styles.container}>
      <section className={`pageHeader`}>

        <h1 className={`pageTitle`} > Projects</h1>

        <form className={`pageSearchForm`} onSubmit={filterProjects} >
          <input type="text" minLength={8} className={`pageSearchInput`} required />
          <button className={`pageSearchBtn`} >Search by ID</button>
        </form>

        {/* <button type='button' onClick={() => setShowModal(true)} >Add a PO</button> */}
        {/* {showModal && <AddPO_Modal closer={() => setShowModal(false)} />} */}

      </section>
      <SideNav />
      {/* <section className={styles.body}>

        <span>ProjectsNav</span>
        <span>Project Overview</span>
        <span>Project Target</span>
        <span>Project Part Details</span>

        <details>
          <summary>Spec Parts</summary>
          <p>Spec Part 1</p>
          <p>Spec Part 2</p>
          <p>Spec Part 3</p>
        </details>
        <details>
          <summary>Mfg Parts</summary>
          <p>Mfg Part 1</p>
          <p>Mfg Part 2</p>
          <p>Mfg Part 3</p>
        </details>
        <details>
          <summary>Fasteners</summary>
          <details>
            <summary>Screws</summary>
            <p>Screw 1</p>
            <p>Screw 2</p>
            <p>Screw 3</p>
          </details>
          <details>
            <summary>Washers</summary>
            <p>Washer 1</p>
            <p>Washer 2</p>
            <p>Washer 3</p>
          </details>
        </details>

      </section> */}
    </Layout>
  )
}
