


export const columns = [
    {
        field: 'id',
        headerName: 'Sr.',
        width: 70
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 130
    },
    {
        field: 'Id',
        headerName: 'Module ID',
        width: 130
    },
    {
        field: 'invTotal', // inv.total
        headerName: 'Total Inv.',
        description: 'Total Inventory available in store.',
        type: 'number',
        width: 90,
    },
    {
        field: 'invQualified',
        headerName: 'Qual. Inv.',
        description: 'The number of inventory qualified as per qualification criteria.',
        sortable: false,
        width: 160,
        valueGetter: (params) => (`${params.row.firstName || ''} ${params.row.lastName || ''}`)
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
    { id: 1, name: 'Snow', Id: 'Jon', invTotal: 35, invQualified: 30 },
    { id: 2, name: 'Lannister', Id: 'Cersei', invTotal: 42, invQualified: 40 },
    { id: 3, name: 'Lannister', Id: 'Jaime', invTotal: 45, invQualified: 40 },
    { id: 4, name: 'Stark', Id: 'Arya', invTotal: 16, invQualified: 10 },
    { id: 5, name: 'Targaryen', Id: 'Daenerys', invTotal: null, invQualified: null },
    { id: 6, name: 'Melisandre', Id: null, invTotal: 150, invQualified: 150 },
    { id: 7, name: 'Clifford', Id: 'Ferrara', invTotal: 44, invQualified: 40 },
    { id: 8, name: 'Frances', Id: 'Rossini', invTotal: 36, invQualified: 30 },
    { id: 9, name: 'Roxie', Id: 'Harvey', invTotal: 65, invQualified: 60 },
];
