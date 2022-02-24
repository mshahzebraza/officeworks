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
import TxnEntry from './TxnEntry'


export default function TransactionPageComp(pProps) {

  // const dispatch = useDispatch();
  const [filterState, setFilterState] = useState(false)

  const filteredTxnList = useReactiveVar(transactionApollo)

  if (filterState) {
    // Filtering Projects w.r.t search ID (Case Insensitive)
    filteredTxnList = filteredTxnList.filter((curTxn) => curTxn.product.toLocaleLowerCase().includes(filterState.toLocaleLowerCase()));
  }

  // useEffect(() => {
  // dispatch(fetchTransactions_Thunk()) // resets the PO & MWO transactions
  // }, [dispatch]);




  return (
    <Layout pageClasses={[styles.container]}>
      <section className={concatStrings([`pageHeader`, styles.header])}>

        <h1 className={`pageTitle`} > Transaction</h1>
        <SearchInput placeholder='Search by product' stateVariables={[filterState, setFilterState]} />
        <ModalButton caption='Add Transaction' ModalComponent={Transaction_Form} />

      </section>

      <section className='pageBody'>
        <TxnEntry
          header={true}
        />
        {
          filteredTxnList?.map((txn, idx) => {
            return <TxnEntry
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
