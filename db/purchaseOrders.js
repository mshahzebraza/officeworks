const purchaseOrdersDb = [
  {
    // There can be a field of available References and RefId can be chosen to be from one of them. In the order of PO > DeliveryNote > Bill# > Quotation#
    refType: 'CST', // Bill, Delivery Note (DN), , Comparative Statement of Tender (CST), Purchase Order (PO)
    refId: 'CST20210414', // typeOfRef-YYYYMMDD
    category: 'Single Quotation',
    fulfillmentSource: 'Foreign',
    currency: 'USD',
    totalCost: 32500,
    supplier: 'Wuhan Beta Tech Company',
    status: 'Active', // Active,Delivered,Closed
    // Remark / Update
    remarks: '',
    //   [ // it is planned to convert the remarks into an array of different remarks
    //   // { dateId, title, remark } // date id is automatically generated for each remark
    // ],
    items: [ // 05 items in the PO
      {
        // Trim the input strings before saving from inputs
        name: 'Ball Lead Screw',
        type: 'Special',
        id: 'NRS BF 220x2 1502',
        qty: 200,
        unitPrice: 450,
        remarks: '',
        specification:
        {
          pitch: '0.02 mm',
          threadedLength: '220 mm',
          backlash: '0.001 %',
          details: 'Other details ',
        }
        // [
        // ['pitch', '0.02 mm'],
        // ['threadedLength', '220 mm'],
        // ['backlash', '0.001 %'],
        // ['details', 'Other details'],
        // ]
      },
      {
        name: 'Ball Lead Screw',
        type: 'Special',
        id: 'NRS BF 200x4 1002',
        qty: 100,
        unitPrice: 500,
        remarks: '',
        specification: {
          pitch: '0.04 mm',
          threadedLength: '200 mm',
          backlash: '0.001 %',
          details: 'All of the long long lorem ipsum goes in here if it is felt that the content does not fall in any other category',
        }
      },
      {
        name: 'Motor',
        type: 'Special',
        id: 'J48ZWX01',
        qty: 100,
        unitPrice: 500,
        remarks: '',
        specification: {
          type: 'Brush-less DC',
          voltage: '20 V',
          ratedCurrent: '70 A',
          details: 'All of the long long lorem ipsum goes in here if it is felt that the content does not fall in any other category',
        }
      },
      {
        name: 'Screw',
        type: 'Standard',
        id: 'M 5*15',
        qty: 100,
        unitPrice: 100,
        remarks: '',
        specification: {
          headType: 'Slot Head',
          // screwValues: 'M2 x 10',
          orderCode: 'RS 0152253',
          material: 'SS A4',
        }
      },
      {
        name: 'Screw',
        type: 'Standard',
        id: 'M 5*15',
        qty: 100,
        unitPrice: 100,
        remarks: '',
        specification: {
          headType: 'Slot Head',
          screwValues: 'M2 x 10',
          material: 'SS A4',
        }
      },
      {
        name: 'Screw',
        type: 'Standard',
        id: 'M 5*15',
        qty: 100,
        unitPrice: 100,
        remarks: '',
        specification: {
          headType: 'Slot Head',
          screwValues: 'M2 x 10',
          material: 'SS A4',
        }
      },
      {
        name: 'Screw',
        type: 'Standard',
        id: 'M 5*15',
        qty: 100,
        unitPrice: 100,
        remarks: '',
        specification: {
          // headType: 'Slot Head',
          // screwValues: 'M2 x 10',
          // material: 'SS A4',
        }
      },
    ]
  },
  {
    refType: 'PO',
    refId: 'NDC-LP-MN-65',
    category: 'Repeat Order',
    fulfillmentSource: 'Foreign',
    currency: 'RMB',
    totalCost: 2500,
    supplier: 'Wuhan Beta Tech Company',
    status: 'Closed',
  },
  {
    refType: 'Bill',
    refId: '269-IE-FP-9-21',
    category: 'Spot Purchase',
    fulfillmentSource: 'Local',
    currency: 'PKR',
    totalCost: 500,
    supplier: 'E-Tech',
    status: 'Delivered',
    items: [ // 02 items in the PO
      {
        name: 'Fasteners',
        type: 'Standard',
        id: 'M5*15 SS A4',
        qty: 200,
        unitPrice: 45,
        remarks: '',
        specification: {},
      },
      {
        name: 'Fasteners',
        type: 'Standard',
        id: 'M5*25 SS A4',
        qty: 200,
        unitPrice: 45,
        remarks: '',
      },
    ]
  },
]

export default purchaseOrdersDb;