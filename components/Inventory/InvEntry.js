// Dependency
import Image from 'next/image'
import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'

// Store & Styles

// Components
import DataRow from '../UI/DataRow/DataRow'
import DataRowItem from '../UI/DataRow/DataRowItem'
import ModalButton from '../UI/ModalButton'
import Button from '../UI/Button'
import InvalidModal from '../UI/Invalid'
// import { deleteTxnHandler } from '../../lib/apollo_client/transactionApollo';


export default function InvEntry({
  header = false,
  txnData = {
    // type: 'status'
    index: 'Sr',
    nomenclature: 'Nomenclature',
    // aliasList: ['Alias'], // match the alias list if nomenclature is not matched
    id: 'Product ID',
    qty: 'Qty', // a NET total of all batches of the product
    application: 'Application', // ['P-App-1', 'P-App-2']
    batches: 'Batches', // [{ type: 'po', id: 'po-1', qty: '100' }, { type: 'po', id: 'po-2', qty: '200' }] // list of produces batches
  }
}) {
  return <DataRow header={header} >
    {/* <DataRowItem content={txnData.type === 'deposit' ? '+' : '-'} flex={0.5} /> */}
    <DataRowItem
      flex={0.5}
      content={`${typeof (txnData.index) === 'number' ? (txnData.index + 1) : txnData.index}.`}
    />
    <DataRowItem
      flex={2}
      content={txnData.nomenclature}
    />
    <DataRowItem
      flex={2}
      content={txnData.id}
    />
    <DataRowItem
      flex={1}
      content={txnData.qty || txnData.partIds?.length || 0}
    />
    <DataRowItem
      flex={2}
      content={txnData.application}
    />
    <DataRowItem
      flex={2.5}
      content={txnData.batches}
    />
    <DataRowItem
      flex={0.75}
      outerClasses={[]}
      content={<>
        {/* <ModalButton
                caption='Summary'
                ModalComponent={PO_Summary}
                poData={poData}
                itemList={refinedItemList}
              /> */}
        <Button
          caption='Delete'
        // click={() => deleteTxnHandler(txnData._id)}
        />

      </>}
    />

  </DataRow>
}