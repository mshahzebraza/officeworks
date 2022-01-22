
import { v4 as uuidv4 } from 'uuid';


export function POtransactionMap(data = {}, idx, refId, supplier) {
  const subLength = 6;

  // return 'transaction' object
  return {
    // tid: `${idx}_${refId}_${Date.now().toString().substring(13 - subLength, 13)}`, // auto-generated transaction id
    tid: uuidv4(), // auto-generated transaction id
    type: 'deposit', // bcz of PO
    product: data.name,
    id: data.id,
    qty: data.qty,
    intent: refId && `PO_${refId}` || 'poId', // reason of transaction
    party: supplier && supplier.split(' ').slice(0, 2).join(' ') || 'supplier', // 'NDC PD', 'NESCOM PD'
    date: 'receivingDate', //receivingDate
    remarks: data.remarks,
  };
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




//generates random id;
export function guid() {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

