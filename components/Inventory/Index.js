// Dependency & Helpers
import React, { useState } from 'react'
import { concatStrings } from '../../helpers/reusable'
import { useReactiveVar } from '@apollo/client'


// Store

// Styles
import styles from '../../styles/projectDirectory.module.scss'

// Components
import Layout from '../../components/Layout/Layout'
import SearchInput from '../UI/SearchInput'
import ModalButton from '../UI/ModalButton'
import transactionApollo from '../../lib/apollo_client/transactionApollo'


export default function InventoryPageComp() {
  // Fetching all the Projects data
  // const projectList = useSelector(state => state.projectList)

  const [filterState, setFilterState] = useState(false)

  const filteredTxnList = useReactiveVar(transactionApollo)

  // console.log('filteredTxnList', filteredTxnList);
  const names = filteredTxnList.map(txn => {
    return `${txn.productNomenclature}, ${txn.productId}, ${txn.partIDs.length}`;
  })

  const filtered = filteredTxnList.reduce((acc, cur, arr) => {
    const targetIndex = acc.findIndex(item => item.id === cur.productId)
    const targetExists = targetIndex !== -1;

    if (targetExists) {
      acc[targetIndex].qty += cur.partIDs.length;
    } else {
      acc.push({
        id: cur.productId,
        nomenclature: cur.productNomenclature,
        qty: cur.partIDs.length
      })
    }
    cur.productId

    return acc;
  }, []);
  console.log('filtered', filtered);



  const [activeProjectIndex, setActiveProjectIndex] = useState(false)


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

    </Layout >
  )
}
