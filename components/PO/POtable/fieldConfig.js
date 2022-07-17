import { Chip, Box, Grid, Button, Avatar, Typography, Tooltip } from '@mui/material';
import CellAvatar from '../../customMUI/tableComponents/CellAvatar';


const statusLookup = {
    0: 'Rejected',
    1: 'Draft',
    2: 'Initiated',
    3: 'ERP Approved',
    4: 'Supplier Evaluated',
    5: 'Concurrence Approved',
    6: 'PO Approved',
    7: 'LC Opened',
    8: 'Delivery Confirmed',
    9: 'Closed',
}


const defaultPhotoPath = '/images/avatar.png';
const initiatorData = {
    7320: {
        name: 'Shahzeb',
        photoPath: defaultPhotoPath
    },
    7321: {
        name: 'Jane Doe',
    },
    7322: {
        name: 'Jack Doe',
    },
    7323: {
        name: 'Jill Doe',
    },
    7324: {
        name: 'Joe Doe',
    },
    7325: {
        name: 'Juan Doe',
    },
    7326: {
        name: 'Julie Doe',
    },
    7327: {
        name: 'Jenny Doe',
    },
    7328: {
        name: 'John Doe',
    },

}




export const columns = [
    {
        field: 'id',
        title: 'Sr.',
        // ?this field now is not editable in the table... must be added dynamically
        // editable: false,
        tooltip: 'Serial Number',
        grouping: false,
        // width: 100,
        // flex: 1,
    },
    {
        field: 'refType',
        title: 'Source',
        tooltip: 'Source of Data',
        hidden: true,

        // flex: 1,
    },
    {
        field: 'refId',
        title: 'Source ID',
        tooltip: 'ID of Data Source',
        grouping: false,
        hidden: true,
        default: '-',
        // flex: 1,
    },
    {
        field: 'ID',
        title: 'Reference ID',
        tooltip: 'Type & ID of Data Source',
        grouping: false,
        render: (rowData) => `${rowData.refType} ${rowData.refId}`,
        // flex: 1,
    },
    {
        field: 'category',
        title: 'Category',
        tooltip: 'Category of Purchase',
        grouping: false,
        // flex: 1,
    },
    {
        field: 'linkedModules', // inv.total
        title: 'Items',
        tooltip: 'What type of items were procured',
        sortable: false,
        grouping: false,
        //? Custom Components | Formatters
        render: (rowData) => <Grid container gap={1}>
            {rowData.linkedModules.map(
                (module, index) => <Grid item key={index}>
                    <Chip label={module.name || 'Null'} />
                </Grid>
            )}
        </Grid>,
        // flex: 1,
        //? To render a custom input component when editing the row data: 
        // editComponent: props => (
        //     <input
        //         type="text"
        //         value={props.value}
        //         onChange={e => props.onChange(e.target.value)}
        //     />
        // )

    },
    {
        field: 'status',
        title: 'Status',
        tooltip: 'Current Status of PO',
        lookup: statusLookup, // ? Lookups
        // defaultGroupOrder: 0, // ? group by default
        // defaultGroupSort: 'desc',
        // flex: 1,
    },
    {
        field: 'initiatorID',
        title: 'Initiator',
        grouping: false,
        tooltip: 'Initiator of Purchase Case',
        render: (rowData) => { // ? images can be added with this method
            const initiatorID = rowData.initiator;
            const initiator = initiatorData[initiatorID];
            let fallback = false;
            if (!initiator) {
                fallback = initiatorID;
            }

            return <CellAvatar
                data={initiator}
                fallback={fallback}
                text={initiator?.name ?? initiatorID ?? 'NULL'}
            />
        }
    },

];
