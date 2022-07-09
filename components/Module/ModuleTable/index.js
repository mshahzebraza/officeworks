import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from './data';


export default function DataTable() {
    return (
        <div style={{ height: 500, width: '60%', fontSize: '16px !important' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[7]}
                checkboxSelection
            />
        </div>
    );
}
