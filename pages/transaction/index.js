// Dependency & Helpers
import React, { useState } from 'react'
import { concatStrings, transformArray } from '../../helpers/reusable'
import { useSelector } from 'react-redux'
// Store
// Styles
import styles from '../../styles/inventoryDirectory.module.scss'

// Components
import Layout from '../../components/Layout/Layout'
import SearchInput from '../../components/UI/SearchInput'
import ModalButton from '../../components/UI/ModalButton'
import DataRow from '../../components/UI/DataRow/DataRow'
import DataRowItem from '../../components/UI/DataRow/DataRowItem'

export default function TransactionDirectory(pProps) {

  let data;
  const state = useSelector(state => state)

  data = [
    ...filterPOtransaction(state.poList),
    ...filterMWOtransaction(state.mwoList)
  ]

  // data.forEach((txn, idx) => {
  //   console.log(idx + 1);
  //   // tid
  //   console.log(txn.tid);
  //   // type
  //   console.log(txn.type);
  //   // product
  //   console.log(txn.product);
  //   // id
  //   console.log(txn.id);
  //   // qty
  //   console.log(txn.qty);
  //   // intent
  //   console.log(txn.intent);
  //   // party
  //   console.log(txn.party);
  //   // date
  //   console.log(txn.date);
  //   // remarks
  //   console.log(txn.remarks);
  //   console.log('---------------------------------');
  // });

  const [filterState, setFilterState] = useState(false)
  return (
    <Layout pageClasses={[styles.container]}>
      <section className={concatStrings([`pageHeader`, styles.header])}>

        <h1 className={`pageTitle`} > Transaction</h1>
        <SearchInput stateVariables={[filterState, setFilterState]} />
        {/* <ModalButton caption='Add Project' ModalComponent={ProjectSummary_Form} /> */}

      </section>

      <section className='pageBody'>
        {
          data.map((txn, idx) => {

            // const [tid, type, product, id, qty, intent, party, date, remarks] = txn;

            return <DataRow key={idx}>
              {/* <DataRowItem content={txn.tid} flex={2} /> */}
              <DataRowItem content={txn.type === 'deposit' ? '+' : '-'} flex={0.5} />
              <DataRowItem content={txn.product} flex={2} />
              <DataRowItem content={txn.id} flex={2} />
              <DataRowItem content={txn.qty} flex={1} />
              <DataRowItem content={txn.intent} flex={2} />
              <DataRowItem content={txn.party} flex={2.5} />
              {/* <DataRowItem content={txn.date} flex={2} /> */}
              {/* <DataRowItem content={txn.remarks} flex={1} /> */}
              {/* 
              tid
              type
              product
              id
              qty
              intent
              party
              date
              remarks
               */}
            </DataRow>
          })
        }

      </section>


    </Layout>
  )
}
// End Page Component



export function POtransactionMap(data = {}, idx, refId, supplier) {
  const subLength = 6;
  // return 'transaction' object
  return {
    tid: `${idx}_${refId}_${Date.now().toString().substring(13 - subLength, 13)}`, // auto-generated transaction id
    type: 'deposit', // bcz of PO
    product: data.name,
    id: data.id,
    qty: data.qty,
    intent: refId && `PO_${refId}` || 'poId', // reason of transaction
    party: supplier || 'supplier', // 'NDC PD', 'NESCOM PD'
    date: 'receivingDate', //receivingDate
    remarks: data.remarks,
  };
}


export function filterPOtransaction(poList) {
  // list of transactions
  let result;


  result = poList.reduce((acc, cur, arr) => {

    if (!cur.items) return acc;

    const transformedTransactionsPO = cur.items.map((poItem, idx) => {
      return POtransactionMap(poItem, idx, cur.refId, cur.supplier)
    })

    return acc.concat(transformedTransactionsPO);

  }, []);

  return result;
}

export function MWOtransactionMap(data = {}, idx) {
  const subLength = 6;
  const dateSegment = Date.now().toString().substring(13 - subLength, 13);
  // return 'transaction' object
  return {
    tid: `${idx}_${data.mwoId}_${dateSegment}`, // auto-generated transaction id
    type: 'deposit', // bcz of PO
    product: data.itemName,
    id: data.itemId,
    qty: data.qty,
    intent: data.mwoId && `MWO_${data.mwoId}` || 'poId', // reason of transaction
    party: 'PPC', // 'NDC PD', 'NESCOM PD'
    date: 'receivingDate', //receivingDate
    remarks: data.remarks,
  };
}

export function filterMWOtransaction(mwoList) {

  let transformedTransactionsMWO;

  transformedTransactionsMWO = mwoList.map((mwo, idx) => {
    return MWOtransactionMap(mwo, idx)
  })

  return transformedTransactionsMWO;
}

