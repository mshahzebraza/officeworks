// Dependency
import React, { useState } from 'react';
import { useSelector } from 'react-redux'

// Store & Styles
import styles from '../../../styles/poDirectory.module.scss'

// Components
import PO_Form from '../../../components/PO/PO_Form'
import POentryBar from '../../../components/PO/POentryBar'
import Layout from '../../../components/Layout/Layout';
import { deepClone } from '../../../helpers/reusable';




export default function PO(pageProps) {

  const [filterState, setFilterState] = useState(false)


  const [showModal, setShowModal] = useState(false);


  // Fetching all the Projects data
  const poList = useSelector((state) => state.po);
  console.log(poList);
  let filteredPOlist = deepClone(poList);

  if (filterState) {
    // Filtering Projects w.r.t search ID 
    filteredPOlist = filteredPOlist.filter((curPO) => curPO.refId.includes(filterState.toLocaleUpperCase()));
  }


  console.log(filteredPOlist);


  function filterPO(evt) {
    evt.preventDefault()
    const searchTerm = evt.target[0].value;
    evt.target[0].value = ''
    console.log(searchTerm);
  }

  return (
    <Layout pageClasses={[styles.container]} >
      <section className={`pageHeader`}>

        <h1 className={`pageTitle`} > Purchase Orders</h1>

        <form className={`pageSearchForm`} onSubmit={filterPO} >
          <label htmlFor="searchById">Search by ID</label>
          <input id='searchById' type="text" minLength={8} value={filterState || ''} onChange={(evt) => setFilterState(evt.target.value)} className={`pageSearchInput`} required />
          {/* <button className={`pageSearchBtn`} >Search by ID</button> */}
        </form>

        <button type='button' onClick={() => setShowModal(true)} >Add a PO</button>
        {showModal && <PO_Form closer={() => setShowModal(false)} />}

      </section>

      <section className={`pageBody`} >
        {
          filteredPOlist.map((poData, idx) => {
            return <POentryBar
              key={idx}
              poData={poData}
              poIndex={idx}
            />
          })
        }
      </section>
    </Layout>
  )
}
