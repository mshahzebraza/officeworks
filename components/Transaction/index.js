// Dependency & Helpers
import React, { useState, useEffect } from 'react'
import { concatStrings, transformArray } from '../../helpers/reusable'
// import { useDispatch, useSelector } from 'react-redux'
// Store
// Styles
import styles from '../../styles/inventoryDirectory.module.scss'

// Components
import Layout from '../Layout/Layout'
import SearchInput from '../UI/SearchInput'
import ModalButton from '../UI/ModalButton'
import DataRow from '../UI/DataRow/DataRow'
import DataRowItem from '../UI/DataRow/DataRowItem'
import { isEmptyArray } from 'formik'
import { fetchTransactions_Thunk } from '../../store/transaction/transaction-slice'
import Transaction_Form from './Transaction_Form'
import { useReactiveVar } from '@apollo/client'
import transactionApollo from '../../lib/apollo_client/transactionApollo'
// import delete txn handler from apollo client
import Button from '../UI/Button';
import TXNentry from './TXNentry'
import Loader from '../Loader'


export default function TransactionPageComp(pProps) {



     // Section: Component States
     // initialize component state
     const [searchInput, setSearchInput] = useState(false)
     const [transactionList, setTransactionList] = useState(null)
     const [loading, setLoading] = useState(true);
     const TransactionState = useReactiveVar(transactionApollo)


     // Section: State Transforms
     useEffect(() => {
          // TODO: handle the case when loading state remains true for a long time. re-route to 404 page if stuck in loading state for a long time
          // const loadingTimeout = setTimeout(() => console.error('Loading failed'), 3000)
          if (TransactionState.fetched) {
               // clearTimeout(loadingTimeout);
               setLoading(false);
               setTransactionList(TransactionState.list)

               //? Apply search filter to Limit the Transaction list to search results
               if (searchInput) {
                    // Filtering Projects w.r.t search ID (Case Insensitive)
                    setTransactionList((prevTransactionList) =>
                         prevTransactionList.filter(txn =>
                              txn.product
                                   .toLowerCase()
                                   .includes(
                                        searchInput.toLowerCase()
                                   )
                         )
                    )
               }
          }
     }, [TransactionState, searchInput])


     // Section: Fallback Rendering
     if (loading) return <Loader />


     console.assert(!!transactionList, 'No POlist. Must never happen.') // ?should never happen


     return (
          <Layout pageClasses={[styles.container]}>
               <section className={concatStrings([`pageHeader`, styles.header])}>

                    <h1 className={`pageTitle`} > Transaction</h1>
                    <SearchInput placeholder='Search by product' stateVariables={[searchInput, setSearchInput]} />
                    <ModalButton caption='Add Transaction' ModalComponent={Transaction_Form} />

               </section>

               <section className='pageBody'>
                    <TXNentry
                         header={true}
                    />
                    {
                         transactionList?.map((txn, idx) => {
                              return <TXNentry
                                   key={idx}
                                   txnIndex={idx}
                                   txnData={txn}
                              />
                         })
                    }

               </section>


          </Layout>
     )


}
// End Page Component
