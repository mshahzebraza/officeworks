// Dependency
import Image from 'next/image'
import React, { useState } from 'react'
import { checkDataType } from '../../helpers/reusable'
// import { useDispatch } from 'react-redux'

// Store & Styles


// Components
import DataRow from '../UI/DataRow/DataRow'
import DataRowItem from '../UI/DataRow/DataRowItem'
import ModalButton from '../UI/ModalButton'
import Button from '../UI/Button'


export default function ModuleEntry({
     header = false,
     moduleData = {
          // type: 'status'
          index: 'Sr',
          name: 'Name',
          // aliasList: ['Alias'], // match the alias list if name is not matched
          id: 'Module ID',
          inv: {
               total: 'Inv-T',
               qualified: 'Inv-Q',
          }, // a NET total of all transaction of the product
          application: 'Application', // ['P-App-1', 'P-App-2']
          status: 'Status',  // 'In-Stock', 'Out-of-Stock', 'Soon-Out-of-Stock', 'Enough-for-Order'  
          req: 'Inv-R',  // percentage of target requirement// 'Double than required': 200%, 'Half than required': 50%, 'If not required (target=0)': Infinity  
          batches: 'Batches', // [{ type: 'po', id: 'po-1', qty: '100' }, { type: 'po', id: 'po-2', qty: '200' }] 
          // list of produces batches (batches: incoming, transactions: incoming+outgoing)
     }
}) {


     moduleData.application = formatApplicationArray(moduleData.application)


     return <DataRow header={header} >
          {/* <DataRowItem content={moduleData.type === 'deposit' ? '+' : '-'} flex={0.5} /> */}
          <DataRowItem
               flex={0.5}
               content={`${typeof (moduleData.index) === 'number' ? (moduleData.index + 1) : moduleData.index}.`}
          />
          <DataRowItem
               flex={1.5}
               content={moduleData.name}
          />
          <DataRowItem
               flex={1.25}
               content={moduleData.id}
          />
          <DataRowItem
               flex={1}
               content={moduleData.application}
          />
          <DataRowItem
               flex={0.75}
               content={moduleData.inv.total}
          />
          <DataRowItem
               flex={0.75}
               content={moduleData.inv.qualified}
          />
          {/* <DataRowItem
      flex={0.75}
      content={moduleData.batches}
    /> */}

          {/* <DataRowItem
      flex={0.75}
      content={moduleData.status}
    /> */}
          <DataRowItem
               flex={0.75}
               content={moduleData.req}
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
                         caption='Edit'
                    // click={() => deleteTxnHandler(moduleData._id)}
                    />
                    <Button
                         caption='Delete'
                    // click={() => deleteTxnHandler(moduleData._id)}
                    />
                    <Button
                         // *this should be a modal with a list of batches just like inventory itself
                         // *Clicking this may load the transaction page with the filters : type: incoming & nomenclature: moduleData.nomenclature
                         caption='Batch List / Detail'
                    // click={() => deleteTxnHandler(moduleData._id)}
                    />

               </>}
          />

     </DataRow>
}


function formatApplicationArray(applicationArray) {
     // ['P-App-1', 'P-App-2'] -> "P-App-1, P-App-2"
     // ['P-App-1'] -> "P-App-1"
     // [] -> ""
     if (
          checkDataType(applicationArray) !== 'string'
          && applicationArray?.length > 0
     ) {
          applicationArray = applicationArray.join(', ');
     } else if (
          checkDataType(applicationArray) !== 'string'
     ) {
          applicationArray = '-';
     }
     return applicationArray;
}