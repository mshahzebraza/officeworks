

// const dispatch = useDispatch()
// This is the transactions dependent on already received POs & MWOs (assuming that its already delivered)
const transactionsDb =
/* {
  system: */ [
    /*
    {
      date: "receivingDate",
      id: "NRS BF 220x2 1502",
      intent: "PO_CST20210414",
      initiator: "system",
      party: "Wuhan Beta",
      product: "Ball Lead Screw",
      qty: 200,
      remarks: "",
      tid: "0_CST20210414_129992",
      type: "deposit",
    },
    {
      date: "receivingDate",
      id: "NRS BF 200x4 1002",
      intent: "PO_CST20210414",
      initiator: "system",
      party: "Wuhan Beta",
      product: "Ball Lead Screw",
      qty: 100,
      remarks: "",
      tid: "1_CST20210414_129993",
      type: "deposit",
    },
    {
      date: "receivingDate",
      id: "J48ZWX01",
      intent: "PO_CST20210414",
      initiator: "system",
      party: "Wuhan Beta",
      product: "Motor",
      qty: 100,
      remarks: "",
      tid: "2_CST20210414_129993",
      type: "deposit",
    },
    {
      date: "receivingDate",
      id: "M 5 * 15",
      intent: "PO_CST20210414",
      initiator: "system",
      party: "Wuhan Beta",
      product: "Screw",
      qty: 100,
      remarks: "",
      tid: "3_CST20210414_129993",
      type: "deposit",
    },
    {
      date: "receivingDate",
      id: "M 5 * 15",
      intent: "PO_CST20210414",
      initiator: "system",
      party: "Wuhan Beta",
      product: "Screw",
      qty: 100,
      remarks: "",
      tid: "4_CST20210414_129993",
      type: "deposit",
    },
    {
      date: "receivingDate",
      id: "M 5 * 15",
      intent: "PO_CST20210414",
      initiator: "system",
      party: "Wuhan Beta",
      product: "Screw",
      qty: 100,
      remarks: "",
      tid: "5_CST20210414_129993",
      type: "deposit",
    },
    {
      date: "receivingDate",
      id: "M 5 * 15",
      intent: "PO_CST20210414",
      initiator: "system",
      party: "Wuhan Beta",
      product: "Screw",
      qty: 100,
      remarks: "",
      tid: "6_CST20210414_129993",
      type: "deposit",
    },
    {
      date: "receivingDate",
      id: "M 5 * 15",
      intent: "PO_269-IE-FP-9-21",
      initiator: "system",
      party: "E-Tech",
      product: "Screw",
      qty: 200,
      remarks: "",
      tid: "0_269-IE-FP-9-21_129993",
      type: "deposit",
    },
    {
      date: "receivingDate",
      id: "M 5 * 25",
      intent: "PO_269-IE-FP-9-21",
      initiator: "system",
      party: "E-Tech",
      product: "Screw",
      qty: 200,
      remarks: "",
      tid: "1_269-IE-FP-9-21_129993",
      type: "deposit",
    },
    {
      date: "receivingDate",
      id: "PEMA-L3K-BD-0200-01",
      intent: "MWO_20211212",
      initiator: "system",
      party: "PPC",
      product: "Sliding Bearing",
      qty: 20,
      remarks: "PCMB, Meeting discussion concluded that an IHD is to be conducted in presence of Representatives from Metallurgical, Q&A  and SETUPSX. IHD will be focussed on the benefits of the said increase in cavity of the module. The decision will be formulated after the return of MD-SETUPX from COUNTRY AMINO."
    },
    {
    tid: "0_20211212_129994",
    type: "deposit",
      date: "receivingDate"
      id: "LAB-20200103",
      party: "PPC",
    }
      product: "Testing Fixture R380",
      qty: 2,
    tid: "1,_20200103_129994",
    type: "deposit",
    intent: "MWO_20200103",
    initiator: "system",
     */
  ]/* ,
  user: [

  ]
} */

export default transactionsDb;



/* 
// PARTS are NOT the same as PRODUCTS in inventory. Part is the specific product procured and employed in assembly.
newBalance
const transaction = {
  transactionType, // +ve: PO/MWO/Disassembly/Lab Return/Debris || -ve: R&D, Relifing,

  // transactions have a structure as
  lastBalance,
}
  // 'BATCHES', should be replaced by transactions. but this will cause the repetition of partIds assigned to individual inventory items. This means duplicates will exist in the same part model. 
  // We'll have to ensure that the duplicate part Ids exist only in the same part model (bcz the same parts can be taken out for experiments, test etc. and then submitted to inventory with the same part numbers causing duplicates) and not in other part models.
  transactionPolarity, // +ve, -ve
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
 */