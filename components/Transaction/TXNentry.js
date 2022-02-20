// Dependency
import Image from 'next/image'
import React, { useState } from 'react'
import { checkDataType, removeDuplicate } from '../../helpers/reusable'
// import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// Store & Styles
import styles from './POentry.module.scss';
import { poActions } from '../../store/po/po-slice'

// Components
import PO_Summary from './PO_Summary'
import PO_Form from './PO_Form'
import DataRow from '../UI/DataRow/DataRow'
import DataRowItem from '../UI/DataRow/DataRowItem'
import ModalButton from '../UI/ModalButton'
import Button from '../UI/Button'
import InvalidModal from '../UI/Invalid'

import { deletePOHandler } from '../../lib/apollo_client/poApollo';

export default function POentry({
  txnData = {
    refType: 'Ref Type',
    refId: 'Ref ID',
    items: 'Items',
    status: 'Status',
  },
  txnIndex = 'Sr',
  header = false
}) {

  const router = useRouter()


  return (
    <DataRow key={idx}>
      <DataRowItem content={idx + 1} flex={0.5} />
      <DataRowItem content={txn.productNomenclature} flex={2} />
      <DataRowItem content={txn.productId} flex={2} />
      <DataRowItem content={txn.qty || txn.partIds?.length || 0} flex={1} />
      <DataRowItem content={txn.intent} flex={2} />
      <DataRowItem content={txn.party} flex={2.5} />
      <DataRowItem
        flex={0.75}
        outerClasses={[styles.entryControls]}
        content={<>
          {/* <ModalButton
                  // caption='Edit'
                  // tooltip='Edit'
                  // ModalComponent = { PO_Form }
                  // invalidReason={'Closed PO cannot be edited'}
                  // oldPOdata={poData}
                  // disabled={poData.status === 'Closed'}
                  /> */}

          {/* <ModalButton
                    caption='Summary'
                    ModalComponent={PO_Summary}
                    poData={poData}
                    itemList={refinedItemList}
                  /> */}
          {/* <Button
                    caption='Detail'
                    click={() => router.push(`po/${poIndex}`)}
                  /> */}
          {/* <Button caption='Delete' click={() => dispatch(poActions.deletePO(poData.refId))} /> */}
          <Button
            caption='Delete'
            click={() => deleteTxnHandler(txn._id)}
          />

        </>}
      />

    </DataRow>


  )
}


function formatString(inputString) {
  // 'Format This String' -> 'formatThisString'
  if (inputString === undefined) return inputString; // if false value
  return inputString.trim().toLowerCase().replace(/\s+/g, '')
}



export function EntryItemName(props) {
  return (
    <span className={`${styles.entryItem} ${props.isEmpty && styles.entryItemEmpty}`}>
      {props.isEmpty ? 'No Item Found' : props.content}
    </span>
  )
}
