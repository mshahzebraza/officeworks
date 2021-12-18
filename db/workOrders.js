const workOrdersDb = [
  {
    mwoId: '20211212',
    // Dropdown can be populated with all the options
    application: 'PEMA-L3K-BD', // {projectNames} OR 'Lab Use' OR 'R&D' OR 'MISC'

    // The prefix will be decided based on the 'application' of the part. Other than project applications will result in the automatic Id of the part using the syntax {Application}-{MOWid}
    itemId: 'PEMA-L3K-BD-0200-01', // OR LU-20211212 OR R&D-20211212 (called product model in inventory)
    itemName: 'Sliding Bearing',
    qty: 20,
    title: 'Widening of pulley shaft cavity with a tolerance of  +0.01 mm using CNC Milling Machine.',
    status: 'Active', // Not Started, Active, Delivered, Milling, Turning, STUCK
    // Remark / Update
    remarks:
      'PCMB Meeting discussion concluded that an IHD is to be conducted in presence of Representatives from Metallurgical, Q&A  and SETUPSX. IHD will be focussed on the benefits of the said increase in cavity of the module. The decision will be formulated after the return of MD-SETUPX from COUNTRY AMINO.'
  },
  {
    mwoId: '20200103',
    itemName: 'Testing Fixture R380',
    qty: 2,
    itemId: 'LAB-20200103',
    application: 'LAB',
    status: 'Not Started',
    title: 'Testing fixture for R380 Load Test',
    // remarks: '',
    // Project,
    // type,
  }
]

export default workOrdersDb;