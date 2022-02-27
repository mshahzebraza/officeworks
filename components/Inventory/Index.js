// Dependency & Helpers
import React, { useState } from 'react'
import { concatStrings } from '../../helpers/reusable'
import { useReactiveVar } from '@apollo/client'


// Store

// Styles
import styles from '../../styles/inventoryDirectory.module.scss'

// Components
import Layout from '../Layout/Layout'
import SearchInput from '../UI/SearchInput'
import ModalButton from '../UI/ModalButton'
import transactionApollo from '../../lib/apollo_client/transactionApollo';
import projectApollo from '../../lib/apollo_client/projectApollo'
import InvEntry from './InvEntry'


export default function InventoryPageComp() {
  // Fetching all the Projects data
  // const projectList = useSelector(state => state.projectList)

  const [filterState, setFilterState] = useState(false)

  const txnList = useReactiveVar(transactionApollo);
  const projectList = useReactiveVar(projectApollo);
  // TODO: only the required fields (Parts Nomenclature for each project) should be fetched

  const filteredProjectList = projectList.map((project) => {

    // Filtering Parts to return the target, id & name only
    let partList = project.parts.map((part) => {
      let idList = [part.id];
      // Check if the aliasList exists for the project-part and append it to part's nameList
      part.aliasList && nameList.push(...part.aliasList);

      return {
        ids: idList,
        name: part.nomenclature,
        assyQty: part.qty,
      }
    });


    return {
      name: project.summary.nomenclature,
      parts: partList,
      target: project.summary.target,
    }
  })


  // ! This should be saved as a new collection in the database - updated at every transaction
  // Shortening the txnList to create a list of unique products with their respective 'Net' quantities 
  const storeItemList = txnList.reduce((acc, cur, arr) => {
    const targetIndex = acc.findIndex(item => item.id === cur.productId)
    const targetExists = targetIndex !== -1;

    if (targetExists) { // if the product already exists in the list then add the quantity to the existing product
      acc[targetIndex].qty += cur.partIDs.length;
    } else {
      acc.push({ // if the product does not exist in the list then add it to the list as a new product
        id: cur.productId,
        nomenclature: cur.productNomenclature,
        qty: cur.partIDs.length,
        application: [],
        req: 0
      })
    }

    return acc;
  }, []);


  // *Calculate Inventory
  /*
  1. Against each store item, Loop through the projectList.
  2. For each project, loop through the project's parts.
  3. For each part, check if the part's 'ids' include the current store items's 'id'.
  4. If Yes, 
      a. set the store item's application to the project's 'name'
      b. calculate the required quantity for the part by multiplying the part's 'assyQty with project's 'target' (parent).
      c. set the store item's 'req' equal to the required quantity.
      // d. set the 'status' of the part to 'In Stock' if the required quantity is less than or equal to the 'qty' of the part.
   */
  storeItemList.forEach((storeItem) => {
    filteredProjectList.forEach((project) => {
      project.parts.forEach((part) => {
        if (part.ids.includes(storeItem.id)) {
          storeItem.application.push(project.name);
          storeItem.req += isNaN(part.assyQty * project.target) ? 0 : part.assyQty * project.target;
          // sometimes target is zero and hence the calculation results infinity
          // storeItem.status = storeItem.qty <= storeItem.req ? 'In Stock' : 'Out of Stock';
        }
      })
    })
  })



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
        <InvEntry header />
        {/* Create a list of InvEntry against each of filtered store items */}
        {
          storeItemList.map((item, idx) => {
            return <InvEntry
              key={idx}
              invData={{ index: idx, ...item }}
            />
          })
        }

      </section>

    </Layout >
  )
}
