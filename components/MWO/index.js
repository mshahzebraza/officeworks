// Dependency
import React, { useState } from 'react';
// import { useSelector } from 'react-redux'

// Store & Styles
import styles from '../../styles/poDirectory.module.scss'
import { useReactiveVar } from '@apollo/client';
import mwoApollo from '../../lib/apollo_client/mwoApollo';

// Components
import MWO_Form from '../../components/MWO/MWO_Form'
import MWOentry from '../../components/MWO/MWOentry'
import Layout from '../../components/Layout/Layout';
import { checkDataType, deepClone } from '../../helpers/reusable';
import ModalButton from '../../components/UI/ModalButton';
import SearchInput from '../../components/UI/SearchInput';

export default function MWOPageComp(pProps) {

  const [filterState, setFilterState] = useState(false)

  // Fetching all the MWO List data
  let filteredMWOlist = useReactiveVar(mwoApollo);

  if (filterState) {
    // Filtering Projects w.r.t search ID (Case Insensitive)
    filteredMWOlist = filteredMWOlist.filter((curMWO) => {
      return curMWO.mwoId.toLocaleLowerCase().includes(filterState.toLocaleLowerCase())
    });
  }


  return (
    <Layout pageClasses={[styles.container]} >

      <section className={`pageHeader`}>
        <h1 className={`pageTitle`} > Mfg Work Orders</h1>
        <SearchInput stateVariables={[filterState, setFilterState]} />
        <ModalButton caption='Add MWO' ModalComponent={MWO_Form} />
      </section>

      <section className={`pageBody`} >
        <MWOentry
          header={true}
        />
        {
          filteredMWOlist && checkDataType(filteredMWOlist) === 'array' && filteredMWOlist.length > 0 &&
          filteredMWOlist.map((poData, idx) => {
            return <MWOentry
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


