import Layout from '../client/components/Layout';
import { ButtonLink } from '../client/components/customMUI';
import { Paper } from '@mui/material';
import type { NextPage } from 'next';

const paperStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridAutoRows: '1fr',
    gap: 5,
    padding: 10,
}

const Home: NextPage = () => {

    return (
        <Layout>
            <Paper sx={paperStyles}>
                <ButtonLink href='/po'>Purchase Orders</ButtonLink>
                <ButtonLink href='/mwo'>Mfg. Work Orders</ButtonLink>
                <ButtonLink href='/transaction'>Transactions</ButtonLink>
                <ButtonLink href='/project'>Projects</ButtonLink>
                <ButtonLink href='/inventory'>Inventory</ButtonLink>
            </Paper>
        </Layout>
    )
}

export default Home 