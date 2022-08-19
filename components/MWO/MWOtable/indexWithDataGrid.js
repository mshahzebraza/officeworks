import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from './data';
import { Grid } from '@mui/material';
import { useState } from 'react';

export default function POtable() {
    const [pageSize, setPageSize] = useState(2)
    return (
        <Grid >
            <DataGrid
                autoHeight
                density='comfortable'
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[2, 5]}
            // checkboxSelection
            />
        </Grid>
    );
}
