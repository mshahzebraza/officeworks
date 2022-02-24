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
import { deleteTxnHandler } from '../../lib/apollo_client/transactionApollo';


export default function TxnEntry({
  header = false,
  txnIndex = 'Sr',
  txnData = {
    // type: 'status'
    productNomenclature: 'Nomenclature',
    productId: 'Product ID',
    qty: 'Qty',
    intent: 'Intent',
    party: 'Handler',
  }
}) {
  return <DataRow header={header} >
    {/* <DataRowItem content={txnData.type === 'deposit' ? '+' : '-'} flex={0.5} /> */}
    <DataRowItem
      flex={0.5}
      content={typeof (txnIndex) === 'number' ? (txnIndex + 1) : txnIndex}
    />
    <DataRowItem
      flex={2}
      content={txnData.productNomenclature}
    />
    <DataRowItem
      flex={2}
      content={txnData.productId}
    />
    <DataRowItem
      flex={1}
      content={txnData.qty || txnData.partIds?.length || 0}
    />
    <DataRowItem
      flex={2}
      content={txnData.intent}
    />
    <DataRowItem
      flex={2.5}
      content={txnData.party}
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
          click={() => deleteTxnHandler(txnData._id)}
        />

      </>}
    />

  </DataRow>
}