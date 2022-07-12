import dynamic from 'next/dynamic'

import { data } from './tableData';
import { columns } from './fieldConfig';

import { Grid } from '@mui/material';
import { tableIcons } from '../../../constants/tableIcons';
import { tableConfig } from './tableConfig';
import MaterialTable from 'material-table';
import { useEffect } from 'react';


export default function POtable({
    title,
    data,
    columns,
    options,
    ...rest
}) {
    return (
        <>
            <MaterialTable
                icons={tableIcons}
                {...tableConfig}
                {...rest}
            />
        </>

    );
}

