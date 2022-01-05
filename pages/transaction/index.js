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

export default function TransactionDirectory(pProps) {

  let data;
  const poList = useSelector(state => state.poList)
  const mwoList = useSelector(state => state.mwoList)


  // data = {
  //   poInv: filterPOtransaction(poList),
  //   mwoInv: filterMWOtransaction(mwoList)
  // }
  data = [
    ...filterPOtransaction(poList),
    ...filterMWOtransaction(mwoList)
  ]

  data.forEach(txn => {
    // tid
    console.log(txn.tid);
    // type
    console.log(txn.type);
    // product
    console.log(txn.product);
    // id
    console.log(txn.id);
    // qty
    console.log(txn.qty);
    // intent
    console.log(txn.intent);
    // party
    console.log(txn.party);
    // date
    console.log(txn.date);
    // remarks
    console.log(txn.remarks);
    console.log('---------------------------------');
  });

  const [filterState, setFilterState] = useState(false)
  return (
    <Layout pageClasses={[styles.container]}>
      <section className={concatStrings([`pageHeader`, styles.header])}>

        <h1 className={`pageTitle`} > Transaction</h1>
        <SearchInput stateVariables={[filterState, setFilterState]} />
        {/* <ModalButton caption='Add Project' ModalComponent={ProjectSummary_Form} /> */}

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
  // return 'transaction' object
  return {
    tid: `${idx}_${data.mwoId}_${Date.now().toString().substring(13 - subLength, 13)}`, // auto-generated transaction id
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

