

// PARTS are NOT the same as PRODUCTS in inventory. Part is the specific product procured and employed in assembly.
// 'BATCHES' should be replaced by transactions. but this will cause the repetition of partIds assigned to individual inventory items. This means duplicates will exist in the same part model. 
// We'll have to ensure that the duplicate part Ids exist only in the same part model (bcz the same parts can be taken out for experiments, test etc. and then submitted to inventory with the same part numbers causing duplicates) and not in other part models.
// transactions have a structure as
const transaction = {
  lastBalance,
  transactionPolarity, // +ve, -ve
  transactionType, // +ve: PO/MWO/Disassembly/Lab Return/Debris || -ve: R&D, Relifing,
  newBalance
}

// batch entry types 
// +ve: PO/MWO/Disassembly/Lab Return/Debris || -ve: R&D, Relifing,
const add_PO_WO = {
  entryType, qty, entryId,
  parts, // this can be filled empty but should be assigned part ids ASAP or after metrology reports etc.
}
const add_debris = {
  entryType, qty,
  // the id should match the new addition if the debris is from a previously manufactured model. otherwise the part should be given another id based on debris receiving date.
  entryId: 'debris-20210101', // the date at which the debris was received in store
  parts: []
}
const add_disassembly = {
  entryType, qty,
  parts: []
}
const add_lab_return = {
  entryType, qty,
  parts: []
}

const subtract_RnD = {}
const subtract_relifing = {}
const subtract_assembly = {}


// Each part should have the array of transactions and the sum transaction quantities must amount to the total inventory. 
// A user can not directly access the total inventory. However, he may input a transaction which may be approved or rejected before any change/update is made to the inventory parts
const transactionsDb = {
  moduleLevelInv: {
    // Type of part
    special: [ // 01 special Product
      {
        product: 'Lead Screw',
        productModels: [ // 02 Models of Lead Screw
          {
            productModel: 'NRS BF 220x2 0040',
            applications: ['PEMA-L3K-BD'], // 'Lab Use', 'R&D'
            // contains the part IDs currently available parts in store. The tracking of transactional parts will be made through the batches/transactions object.
            availableQty: 10,
            availableParts: ['partId001', 'partId002', '...'], // length of array can be different from the available Qty but not greater. Also, it lets us know that some of the available parts are not yet assigned part IDs.
            // 01 batch can procure items of special and manufactured category at the same time which means the batchId will be repeated in some product models. e.g on PO orders BearingA, ScrewA, PotB, and HousingA. This means the same batchId will be found 1x in Special Module, 1x in manufactured module (housing can be a manufactured or a special module based on was it sourced.We take it as a mfg one assuming it was manufactured internally.) and 2x in the standard module array
            batches: [ // 02 batches of this Lead Screw Model
              {
                batchId: '239-IE-FP-09-21', // WO# / External WO#
                batchQty: 5, // this tells us how many parts are in a batch and is useful if the partsArray (below) is not populated bcz this will check if the quantity matches the array length and let us know how many of the batch entries are still not assigned any id
                // shelfLifeExpiry: '01-06-2035', // date at which it will expiry
                // part entries' relative/absolute Ids
                // Check the ids of the previous batches to ensure no duplicate part id is created. OR include the batchId in the partId
                parts: [ // should contain items equal to batch Qty. More is not allowed. Less is a notification to update Ids
                  '00101', // NRS BF 220x2 0040 - 00101
                  '00102', // NRS BF 220x2 0040 - 00102
                  '00103', // NRS BF 220x2 0040 - 00103
                  '00104', // NRS BF 220x2 0040 - 00104
                  '00105', // NRS BF 220x2 0040 - 00105
                ]
              },
              {
                batchId: '165-IE-FP-05-15', // WO# / External WO#
                batchQty: 5,
                // part entries' relative/absolute Ids
                parts: [
                  '00511', // NRS BF 220x2 0040 - 00511
                  '00512', // NRS BF 220x2 0040 - 00512
                  '00513', // NRS BF 220x2 0040 - 00513
                  '00514', // NRS BF 220x2 0040 - 00514
                  '00515', // NRS BF 220x2 0040 - 00515
                ]
              },
            ],
          },
          {
            productModel: 'NRS BF 175x4 0040',
            applications: ['R&D'],
            availableQty: 205,
            availableParts: ['partId001', 'partId002', '...'],
            batches: [ // 01 batch of this Lead Screw Model
              {
                batchId: 'NDC-LP-MN-165', // WO# / External WO#
                batchQty: 5,
                parts: [
                  '10181', // NRS BF 175x4 0040 - 10181
                  '10182', // NRS BF 175x4 0040 - 10182
                  '10183', // NRS BF 175x4 0040 - 10183
                  '10184', // NRS BF 175x4 0040 - 10184
                  '10185', // NRS BF 175x4 0040 - 10185
                ]
              },
            ],
          },
        ]
      }
    ],
    manufactured: [ // 01 manufactured Product
      {
        product: 'Housing Case',
        productModels: [
          {
            productModel: 'PEMA-L3K-BD-0100-01',
            applications: ['PEMA-L3K-BD'],
            availableQty: 205,
            availableParts: ['partId001', 'partId002', '...'],
            batches: [ // 01 batch of this Lead Screw Model
              {
                batchId: '239-IE-FP-09-21', // WO# / External WO#
                batchQty: 5,
                // part entries' relative/absolute Ids
                // Check the ids of the previous batches to ensure no duplicate part id is created. OR include the batchId in the partId
                parts: [
                  '00101', // NRS BF 220x2 0040 - 00101
                  '00102', // NRS BF 220x2 0040 - 00102
                  '00103', // NRS BF 220x2 0040 - 00103
                  '00104', // NRS BF 220x2 0040 - 00104
                  '00105', // NRS BF 220x2 0040 - 00105
                ]
              },
            ],
          }
        ]
      }
    ],
    standard: [
      {
        product: 'Screw',
        productModels: [
          {
            productModel: 'Slot Head - M5x12 mm - DIN 7 ', // product specs can be structure in cascades like below but for now i'll use it as a list
            // productSpecs: {
            //   // headType: 'Slot Head',
            //   headSize: 'M5',
            //   length: '12',
            //   unit: 'mm', //in
            // },

            // the application list will be automatically populated as soon as it detects that a certain project uses the fastener items
            applications: ['PEMA-L3K-BD', 'PEMA-L1.8K-BD', 'PEMA-L9.5K-BD', 'PEMA-R380-BL01'], // 'Lab Use', 'R&D' 
            availableQty: 205,
            availableParts: ['partId001', 'partId002', '...'],
            batches: [ // 02 batches of this Lead Screw Model
              {
                batchId: 'DN-20210414', // WO# / External WO#
                batchQty: 75, // the quantity of standard items will be subjected to partId assignment.
              },
              {
                batchId: '165-IE-FP-05-15', // WO# / External WO#
                batchQty: 5,
              },
            ],
          },
          {
            productModel: 'Plain Head - M3x6 mm - DIN 7 ',
            applications: ['PEMA-L9.5K-BD', 'PEMA-R380-BL01'],
            availableQty: 205,
            availableParts: ['partId001', 'partId002', '...'],
            batches: [ // 02 batches of this Lead Screw Model
              {
                batchId: 'CST-20210414', // WO# / External WO#
                batchQty: 3000, // the quantity of standard items will be subjected to partId assignment.
              },
              {
                batchId: '174-IE-FP-05-15', // WO# / External WO#
                batchQty: 250,
              },
            ],
          },
        ],
      },
      {
        product: 'Bearings',
        productModels: [ // 01 type
          {
            productModel: '7201 AC',
            applications: ['PEMA-L3K-BD', 'PEMA-L1.8K-BD', 'PEMA-L9.5K-BD', 'PEMA-R380-BL01'],
            availableQty: 205,
            availableParts: ['partId001', 'partId002', '...'],
            batches: [ // 02 batches of this Lead Screw Model
              {
                batchId: 'CST-20210414', // WO# / External WO#
                batchQty: 75, // the quantity of standard items will be subjected to partId assignment.
              },
              {
                batchId: '165-IE-FP-05-15', // WO# / External WO#
                batchQty: 5,
              },
            ],
          },
        ],
      },
    ]
  },
  actuatorLevelInv: {}
}