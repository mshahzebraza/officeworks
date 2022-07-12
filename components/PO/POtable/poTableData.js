
export const columns = [
    {
        field: 'id',
        title: 'Sr.',
        // flex: 1,
    },
    {
        field: 'refType',
        title: 'Source',
        description: 'Source of Data',
        // flex: 1,
    },
    {
        field: 'refId',
        title: 'Source ID',
        description: 'ID of Data Source',
        // flex: 1,
    },
    {
        field: 'ID',
        title: 'Reference',
        description: 'Type & ID of Data Source',
        valueGetter: (params) => (`${params.row.refType || ''}# ${params.row.refId || ''}`),
        // flex: 1,
    },
    {
        field: 'linkedModules', // inv.total
        title: 'Items',
        description: 'What type of items were procured',
        sortable: false,
        // flex: 1,
    },
    {
        field: 'status',
        title: 'Status',
        description: 'Current Status of PO',
        // flex: 1,
    },
    {
        field: 'controls',
        title: 'Actions',
        description: 'Options to view or edit the details',
        sortable: false,
        // flex: 1,
    },
];





/* 
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
} */

export const rows = [
    {
        id: 1,
        refType: 'PO',
        // refId: '024',
        linkedModules: ['35', 'sd'],
        status: 'Closed',
    },
    {
        id: 2,
        refType: 'PO',
        refId: '3325',
        linkedModules: ['42', 'sd'],
        status: 'Closed'
    },
    {
        id: 3,
        refType: 'PO',
        refId: '553',
        linkedModules: ['45', 'sd'],
        status: 'Closed'
    },
    {
        id: 4,
        refType: 'PO',
        refId: '2235',
        linkedModules: ['16', 'sd'],
        status: 'Open'
    },
    {
        id: 5,
        refType: 'PO',
        refId: '870',
        linkedModules: ['null', 'sd'],
        status: 'Closed'
    },
    {
        id: 6,
        refType: 'PO',
        refId: "192",
        linkedModules: ['150', 'sd'],
        status: 'Closed'
    },
    {
        id: 7,
        refType: 'PO',
        refId: '136',
        linkedModules: ['44', 'sd'],
        status: 'Closed'
    },
    {
        id: 8,
        refType: 'PO',
        refId: '634',
        linkedModules: ['36', 'sd'],
        status: 'Closed'
    },
    {
        id: 9,
        refType: 'PO',
        refId: '614',
        linkedModules: ['65', 'sd'],
        status: 'Closed'
    },
];
