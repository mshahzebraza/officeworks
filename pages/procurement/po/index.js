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
import ModalButton from '../../../components/UI/ModalButton';
import SearchInput from '../../../components/UI/SearchInput';


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


  return (
    <Layout pageClasses={[styles.container]} >

      <section className={`pageHeader`}>
        <h1 className={`pageTitle`} > Purchase Orders</h1>
        <SearchInput stateVariables={[filterState, setFilterState]} />
        <ModalButton caption='Add PO' ModalComponent={PO_Form} />
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
