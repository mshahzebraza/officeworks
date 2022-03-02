// Dependency
import React, { useState } from 'react';
// import { useSelector } from 'react-redux'

// Store & Styles

import styles from '../../styles/poDirectory.module.scss'
// import styles from '../../../styles/poDirectory.module.scss'

// Components
import PO_Form from './PO_Form'
import POentry from './POentry'
import Layout from '../Layout/Layout';
// import { deepClone } from '../../helpers/reusable';
import ModalButton from '../UI/ModalButton';
import SearchInput from '../UI/SearchInput';
import DataRow from '../UI/DataRow/DataRow';
import DataRowItem from '../UI/DataRow/DataRowItem';


import { useReactiveVar } from "@apollo/client";
import poApollo from '../../lib/apollo_client/poApollo';




export default function POpageComp(pProps) {

  const [filterState, setFilterState] = useState(false)

  // Fetching all the Projects data
  const filteredPOlist = useReactiveVar(poApollo)

  if (filterState) {
    // Filtering Projects w.r.t search ID (Case Insensitive)
    filteredPOlist = filteredPOlist.filter((curPO) => curPO.refId.toLocaleLowerCase().includes(filterState.toLocaleLowerCase()));
  }


  return (
    <Layout pageClasses={[styles.container]} >

      <section className={`pageHeader`}>
        <h1 className={`pageTitle`} > Purchase Orders</h1>
        <SearchInput stateVariables={[filterState, setFilterState]} />
        <ModalButton caption='Add PO' ModalComponent={PO_Form} />
      </section>

      <section className={`pageBody`} >
        <POentry
          header={true}
        />
        {
          filteredPOlist?.map((poData, idx) => {
            return <POentry
              key={idx}
              poData={{ index: idx, ...poData }}
            />

          })
        }
      </section>
    </Layout>
  )
}
