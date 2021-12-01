import React from 'react';
import purchaseOrders from '../../db/purchaseOrders';
import MultiForm from '../../components/MultiForm';


export default function PO(pProps) {
  console.log(purchaseOrders);
  return (
    <div>
      POs here
      <MultiForm
        defaultFields={[
          'refType', 'refId', 'category', 'fulfillmentSource', 'currency', 'price', 'supplier', 'status', 'remarks'
        ]}
        subLevels={['specifications']}
      />
    </div>
  )
}
