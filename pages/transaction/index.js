// Dependency & Helpers
import React, { useState, useEffect } from 'react'
import { concatStrings, transformArray } from '../../helpers/reusable'
import { useDispatch, useSelector } from 'react-redux'
// Store
// Styles
import styles from '../../styles/inventoryDirectory.module.scss'

// Components
import Layout from '../../components/Layout/Layout'
import SearchInput from '../../components/UI/SearchInput'
import ModalButton from '../../components/UI/ModalButton'
import DataRow from '../../components/UI/DataRow/DataRow'
import DataRowItem from '../../components/UI/DataRow/DataRowItem'
import { isEmptyArray } from 'formik'
import { fetchTransactions_Thunk } from '../../store/transaction/transaction-slice'
import Transaction_Form from '../../components/Transaction/Transaction_Form'

export default function TransactionDirectory(pProps) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions_Thunk()) // resets the PO & MWO transactions
  }, [dispatch]);


  const transactionList = useSelector(state => state.transactionList)

  const [filterState, setFilterState] = useState(false)
  return (
    <Layout pageClasses={[styles.container]}>
      <section className={concatStrings([`pageHeader`, styles.header])}>

        <h1 className={`pageTitle`} > Transaction</h1>
        <SearchInput stateVariables={[filterState, setFilterState]} />
        <ModalButton caption='Add Transaction' ModalComponent={Transaction_Form} />

      </section>

      <section className='pageBody'>
        {
          transactionList.map((txn, idx) => {

            // const [tid, type, product, id, qty, intent, party, date, remarks] = txn;

            return <DataRow key={idx}>
              {/* <DataRowItem content={txn.tid} flex={2} /> */}
              {/* <DataRowItem content={txn.type === 'deposit' ? '+' : '-'} flex={0.5} /> */}
              <DataRowItem content={idx + 1} flex={0.5} />
              <DataRowItem content={txn.product} flex={2} />
              <DataRowItem content={txn.id} flex={2} />
              <DataRowItem content={txn.qty} flex={1} />
              <DataRowItem content={txn.intent} flex={2} />
              <DataRowItem content={txn.party} flex={2.5} />
              {/* <DataRowItem content={txn.date} flex={2} /> */}
              {/* <DataRowItem content={txn.remarks} flex={1} /> */}

            </DataRow>
          })
        }

      </section>


    </Layout>
  )
}
// End Page Component
