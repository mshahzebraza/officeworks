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
  invData = {
    // type: 'status'
    index: 'Sr',
    nomenclature: 'Nomenclature',
    // aliasList: ['Alias'], // match the alias list if nomenclature is not matched
    id: 'Product ID',
    qty: 'Qty', // a NET total of all batches of the product
    application: 'Application', // ['P-App-1', 'P-App-2']
    status: 'Status',  // percentage of target requirement// 'Double than required': 200%, 'Half than required': 50%, 'If not required (target=0)': Infinity  
    batches: 'Batches', // [{ type: 'po', id: 'po-1', qty: '100' }, { type: 'po', id: 'po-2', qty: '200' }] // list of produces batches
  }
}) {
  return <DataRow header={header} >
    {/* <DataRowItem content={invData.type === 'deposit' ? '+' : '-'} flex={0.5} /> */}
    <DataRowItem
      flex={0.5}
      content={`${typeof (invData.index) === 'number' ? (invData.index + 1) : invData.index}.`}
    />
    <DataRowItem
      flex={2}
      content={invData.nomenclature}
    />
    <DataRowItem
      flex={2}
      content={invData.id}
    />
    <DataRowItem
      flex={0.75}
      content={invData.qty || invData.partIds?.length || 0}
    />
    <DataRowItem
      flex={1.25}
      content={invData.application}
    />
    {/* <DataRowItem
      flex={0.75}
      content={invData.batches}
    /> */}

    <DataRowItem
      flex={0.75}
      content={invData.status}
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
          caption='Batch List' // *this should be a modal with a list of batches just like inventory itself
        // click={() => deleteTxnHandler(invData._id)}
        />

      </>}
    />

  </DataRow>
}