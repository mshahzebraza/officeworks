// Dependency
import React, { useState } from 'react';
import { useSelector } from 'react-redux'

// Store & Styles
import styles from '../../../styles/poDirectory.module.scss'

// Components
import MWO_Form from '../../../components/MWO/MWO_Form'
import MWOentryBar from '../../../components/MWO/MWOentryBar'
import Layout from '../../../components/Layout/Layout';
import { checkDataType, deepClone } from '../../../helpers/reusable';

export default function MWO(pProps) {

  const [filterState, setFilterState] = useState(false)

  const [showModal, setShowModal] = useState(false);

  // Fetching all the MWO List data
  const mwoList = useSelector((state) => state.mwo);

  let filteredMWOlist = deepClone(mwoList);
  if (filterState) {
    // Filtering Projects w.r.t search ID 
    filteredMWOlist = filteredMWOlist.filter((curMWO) => {
      // console.log(curMWO.mwoId, filterState);
      return curMWO.mwoId.includes(filterState.toLocaleUpperCase())
    });
  }

  console.log('mwoList', mwoList);
  console.log('filteredMWOlist', filteredMWOlist);

  function filterMWO(evt) {
    evt.preventDefault()
    const searchTerm = evt.target[0].value;
    evt.target[0].value = ''
    console.log(searchTerm);
  }


  return (
    <Layout pageClasses={[styles.container]} >
      <section className={`pageHeader`}>

        <h1 className={`pageTitle`} > Mfg Work Orders</h1>

        <form className={`pageSearchForm`} onSubmit={filterMWO} >
          <label htmlFor="searchById">Search by ID</label>
          <input id='searchById' type="text" minLength={8} value={filterState || ''} onChange={(evt) => setFilterState(evt.target.value)} className={`pageSearchInput`} required />
          {/* <button className={`pageSearchBtn`} >Search by ID</button> */}
        </form>

        <button onClick={() => setShowModal(true)} >Add a MWO</button>
        {showModal && <MWO_Form closer={() => setShowModal(false)} />}

      </section>

      <section className={`pageBody`} >
        {
          filteredMWOlist && checkDataType(filteredMWOlist) === 'array' && filteredMWOlist.length > 0 &&
          filteredMWOlist.map((poData, idx) => {
            return <MWOentryBar
              key={idx}
              mwoIndex={idx}
              mwoData={poData}
            />
          }) || <p className='note'>No MWO Found - MWO Page</p>
        }
      </section>

    </Layout>
  )

}


