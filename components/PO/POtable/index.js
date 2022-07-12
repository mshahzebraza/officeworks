import { Grid } from '@mui/material';

import { columns, rows } from './poTableData';
import { tableIcons } from '../../../constants/tableIcons';
import MaterialTable from 'material-table'
import { tableOptions } from './tableConfig';


export default function POtable() {
    return (
        <>
            <MaterialTable
                icons={tableIcons}
                title='PO Table'
                data={rows}
                columns={columns}

            />
        </>

    );
}

