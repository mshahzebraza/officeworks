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
import ModalButton from '../../../components/UI/ModalButton';
import SearchInput from '../../../components/UI/SearchInput';

export default function MWO(pProps) {

  const [filterState, setFilterState] = useState(false)

  // Fetching all the MWO List data
  const mwoList = useSelector((state) => state.mwo);

  let filteredMWOlist = deepClone(mwoList);

  if (filterState) {
    // Filtering Projects w.r.t search ID 
    filteredMWOlist = filteredMWOlist.filter((curMWO) => {
      return curMWO.mwoId.includes(filterState.toLocaleUpperCase())
    });
  }

  console.log('mwoList', mwoList);
  console.log('filteredMWOlist', filteredMWOlist);


  return (
    <Layout pageClasses={[styles.container]} >

      <section className={`pageHeader`}>
        <h1 className={`pageTitle`} > Mfg Work Orders</h1>
        <SearchInput stateVariables={[filterState, setFilterState]} />
        <ModalButton caption='Add MWO' ModalComponent={MWO_Form} />
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


